const { createClient } = require('@supabase/supabase-js');

// Rate limiting map (in-memory, resets on function cold start)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 feedback submissions per 15 minutes

function isRateLimited(identifier) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(identifier) || [];

  // Filter out old requests outside the time window
  const recentRequests = userRequests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  // Add current request
  recentRequests.push(now);
  rateLimitMap.set(identifier, recentRequests);

  return false;
}

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development'
      ? 'http://localhost:5173'
      : 'https://dexintelligence.ai',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Verify authentication
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Authentication required' }),
      };
    }

    const token = authHeader.replace('Bearer ', '');

    // Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase configuration');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify user token and get user info
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error('Authentication failed:', authError);
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid or expired token' }),
      };
    }

    // Rate limiting by user ID
    if (isRateLimited(user.id)) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          error: 'Too many feedback submissions. Please wait 15 minutes before submitting again.'
        }),
      };
    }

    // Parse request body
    const body = JSON.parse(event.body);
    const { feedbackType, subject, description, deploymentId, sourceUrl, userAgent } = body;

    // Validate required fields
    if (!feedbackType || !subject || !description) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: feedbackType, subject, description' }),
      };
    }

    // Validate feedback type
    const validTypes = ['bug', 'feature', 'general'];
    if (!validTypes.includes(feedbackType)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid feedback type. Must be: bug, feature, or general' }),
      };
    }

    // Validate field lengths
    if (subject.length > 200) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Subject must be 200 characters or less' }),
      };
    }

    if (description.length > 2000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Description must be 2000 characters or less' }),
      };
    }

    // Get deployment name if deployment ID provided
    let deploymentName = null;
    if (deploymentId) {
      const { data: deployment, error: deploymentError } = await supabase
        .from('deployments')
        .select('name')
        .eq('id', deploymentId)
        .single();

      if (!deploymentError && deployment) {
        deploymentName = deployment.name;
      }
    }

    // Insert feedback into database
    const { data: feedback, error: insertError } = await supabase
      .from('feedback')
      .insert([
        {
          user_id: user.id,
          user_email: user.email,
          feedback_type: feedbackType,
          subject: subject.trim(),
          description: description.trim(),
          deployment_id: deploymentId || null,
          deployment_name: deploymentName,
          status: 'new',
          priority: 'medium',
          source_url: sourceUrl || null,
          user_agent: userAgent || null,
        }
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Failed to insert feedback:', insertError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to submit feedback' }),
      };
    }

    console.log(`Feedback submitted: ${feedbackType} from ${user.email} - "${subject}"`);

    // Return success
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        feedbackId: feedback.id,
        message: 'Thank you for your feedback!'
      }),
    };

  } catch (error) {
    console.error('Error processing feedback submission:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'An error occurred while submitting your feedback. Please try again.'
      }),
    };
  }
};
