import { createClient } from '@supabase/supabase-js';

// Rate limiting storage
const rateLimit = new Map();
const WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS = 30; // Allow frequent fetching for dashboard updates

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimit.get(ip) || [];
  const recentRequests = userRequests.filter(t => now - t < WINDOW_MS);

  if (recentRequests.length >= MAX_REQUESTS) {
    return false; // Rate limited
  }

  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  return true; // Allowed
}

// Clean up old rate limit records periodically
function cleanupRateLimits() {
  const now = Date.now();
  for (const [ip, requests] of rateLimit.entries()) {
    const recentRequests = requests.filter(t => now - t < WINDOW_MS);
    if (recentRequests.length === 0) {
      rateLimit.delete(ip);
    } else {
      rateLimit.set(ip, recentRequests);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupRateLimits, 300000);

const headers = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : 'https://dexintelligence.ai',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
};

export const handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Get client IP for rate limiting
  const clientIP = event.headers['x-forwarded-for'] ||
                   event.headers['X-Forwarded-For'] ||
                   event.headers['x-real-ip'] ||
                   'unknown';

  // Check rate limit
  if (!checkRateLimit(clientIP)) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({
        error: 'Too many requests. Please try again later.'
      }),
    };
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase configuration missing');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Database configuration error' }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch active recent updates, ordered by date (newest first)
    const { data: updates, error } = await supabase
      .from('recent_updates')
      .select('id, title, description, date')
      .eq('is_active', true)
      .order('date', { ascending: false })
      .limit(5); // Limit to 5 most recent updates

    if (error) {
      console.error('get-recent-updates: Database query error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to fetch recent updates' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        updates: updates || [],
        count: updates?.length || 0
      }),
    };

  } catch (error) {
    console.error('Get recent updates error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch recent updates' }),
    };
  }
};
