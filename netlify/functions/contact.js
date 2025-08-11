const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting - simple in-memory store (for production, use Redis or similar)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 submissions per 15 minutes per IP

// Helper function for rate limiting
function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }
  
  const requests = rateLimitMap.get(ip);
  // Clean old requests
  const validRequests = requests.filter(time => time > windowStart);
  rateLimitMap.set(ip, validRequests);
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  
  // Add current request
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  return false;
}

// Input validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeString(str) {
  return str.replace(/<[^>]*>?/gm, '').trim();
}

function validateForm(data) {
  const errors = [];
  
  if (!data.firstName || data.firstName.trim().length < 1) {
    errors.push('First name is required');
  }
  
  if (!data.lastName || data.lastName.trim().length < 1) {
    errors.push('Last name is required');
  }
  
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid professional email is required');
  }
  
  if (!data.firm || data.firm.trim().length < 2) {
    errors.push('Law firm/organization is required');
  }
  
  if (!data.interest) {
    errors.push('Area of interest is required');
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  
  if (data.message && data.message.length > 5000) {
    errors.push('Message must be less than 5000 characters');
  }
  
  if (!data.emailConsent) {
    errors.push('Email consent is required');
  }
  
  return errors;
}

// Email templates
function generateClientEmail(data) {
  return {
    subject: 'Inquiry Received - Dex Intelligence',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); color: white; padding: 40px 30px; text-align: center;">
          <!-- Logo -->
          <img src="https://dexintelligence.ai/logo.png" alt="Dex Intelligence" style="height: 60px; width: auto; margin: 0 auto 20px; display: block; border-radius: 8px;">
          
          <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
            <span style="color: white;">Dex</span> <span style="color: #ee9e46;">Intelligence</span>
          </h1>
          <p style="margin: 8px 0 0 0; color: #a0a0a0; font-size: 16px; font-weight: 300;">
            AI-Enhanced Quantitative Analysis • Competition Law
          </p>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 40px 30px; background: white;">
          <h2 style="color: #1a1a1a; margin: 0 0 24px 0; font-size: 24px; font-weight: 600;">
            Thank you for your secure inquiry
          </h2>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Dear <strong>${sanitizeString(data.firstName)}</strong>,
          </p>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 24px;">
            Thank you for reaching out regarding <strong style="color: #ee9e46;">${data.interest}</strong>. 
            Your inquiry has been received and will be reviewed with the confidentiality and discretion 
            that competition law matters require.
          </p>
          
          <!-- Next Steps Card -->
          <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-left: 4px solid #ee9e46; border-radius: 8px; padding: 24px; margin: 32px 0;">
            <h3 style="margin: 0 0 16px 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">
              What happens next:
            </h3>
            <ul style="margin: 0; padding-left: 20px; color: #4b5563; line-height: 1.6;">
              <li style="margin-bottom: 8px;">We will review your inquiry within 24 hours</li>
              <li style="margin-bottom: 8px;">If appropriate, we will schedule a confidential consultation</li>
              <li style="margin-bottom: 0;">All discussions will be conducted under strict confidentiality protocols</li>
            </ul>
          </div>
          
          <!-- Contact Info -->
          <div style="background: #1a1a1a; color: white; border-radius: 8px; padding: 20px; margin: 32px 0;">
            <p style="margin: 0 0 8px 0; color: #a0a0a0; font-size: 14px;">For urgent matters:</p>
            <p style="margin: 0;">
              <a href="mailto:justin@dexintelligence.ca" style="color: #ee9e46; text-decoration: none; font-weight: 500;">
                justin@dexintelligence.ca
              </a>
            </p>
          </div>
          
          <!-- Signature -->
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #374151; line-height: 1.5;">
              Best regards,<br>
              <strong style="color: #1a1a1a;">Justin Mayne</strong><br>
              <span style="color: #6b7280;">Dex Intelligence Inc.</span><br>
              <span style="color: #6b7280;">Toronto, ON</span>
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #1a1a1a; color: #9ca3af; padding: 24px 30px; text-align: center;">
          <p style="margin: 0; font-size: 12px; line-height: 1.4;">
            This email contains confidential information intended only for the addressee. 
            If you received this in error, please delete it immediately and notify the sender.
          </p>
          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #374151;">
            <p style="margin: 0; font-size: 11px; color: #6b7280;">
              © ${new Date().getFullYear()} Dex Intelligence Inc. • Toronto, ON
            </p>
          </div>
        </div>
      </div>
    `,
    text: `
Thank you for your inquiry - Dex Intelligence

Dear ${sanitizeString(data.firstName)},

Thank you for reaching out to Dex Intelligence regarding ${data.interest}. We have received your inquiry and will review it with the confidentiality and discretion that legal matters require.

What happens next:
- We will review your inquiry within 24 hours
- If appropriate, we will schedule a confidential consultation  
- All discussions will be conducted under strict confidentiality protocols

For urgent matters, please contact us directly at justin@dexintelligence.ca.

Best regards,
Justin Mayne
Dex Intelligence Inc.
Toronto, ON

This email contains confidential information. If you received this in error, please delete it immediately.
    `
  };
}

function generateInternalEmail(data, clientIP) {
  return {
    subject: `New Secure Inquiry - ${sanitizeString(data.firm)} (${data.interest})`,
    html: `
      <div style="font-family: 'Arial', sans-serif; max-width: 700px; margin: 0 auto;">
        <div style="background: #000; color: white; padding: 20px;">
          <h1 style="margin: 0; color: #ee9e46;">New Secure Inquiry</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.8;">Received ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })} EST</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <div style="background: white; border: 1px solid #ddd; padding: 25px; margin-bottom: 20px;">
            <h2 style="margin-top: 0; color: #000; border-bottom: 2px solid #ee9e46; padding-bottom: 10px;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 150px;">Name:</td><td>${sanitizeString(data.firstName)} ${sanitizeString(data.lastName)}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${data.email}" style="color: #ee9e46;">${data.email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Firm:</td><td>${sanitizeString(data.firm)}</td></tr>
              ${data.role ? `<tr><td style="padding: 8px 0; font-weight: bold;">Role:</td><td>${sanitizeString(data.role)}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; font-weight: bold;">Interest:</td><td><span style="background: #ee9e46; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${data.interest.toUpperCase()}</span></td></tr>
            </table>
          </div>
          
          <div style="background: white; border: 1px solid #ddd; padding: 25px;">
            <h3 style="margin-top: 0; color: #000; border-bottom: 2px solid #ee9e46; padding-bottom: 10px;">Message</h3>
            <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #ee9e46; white-space: pre-wrap; line-height: 1.6;">${sanitizeString(data.message)}</div>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border: 1px solid #b8daff; border-radius: 4px;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              <strong>Technical Details:</strong> IP: ${clientIP} | User-Agent: ${data.userAgent || 'Not provided'}
            </p>
          </div>
        </div>
      </div>
    `,
    text: `
New Secure Inquiry - ${sanitizeString(data.firm)}
Received: ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })} EST

CONTACT INFORMATION:
Name: ${sanitizeString(data.firstName)} ${sanitizeString(data.lastName)}
Email: ${data.email}
Firm: ${sanitizeString(data.firm)}
${data.role ? `Role: ${sanitizeString(data.role)}` : ''}
Interest: ${data.interest}

MESSAGE:
${sanitizeString(data.message)}

Technical Details: IP: ${clientIP}
    `
  };
}

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' 
      ? 'http://localhost:5173' 
      : 'https://dexintelligence.ai'
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Get client IP for rate limiting
    const clientIP = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';
    
    if (isRateLimited(clientIP)) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ 
          error: 'Too many requests. Please wait 15 minutes before submitting another inquiry.' 
        }),
      };
    }

    // Parse request body
    const data = JSON.parse(event.body);
    
    // Add user agent for logging
    data.userAgent = event.headers['user-agent'];

    // Validate form data
    const validationErrors = validateForm(data);
    if (validationErrors.length > 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Validation failed', 
          details: validationErrors 
        }),
      };
    }

    // Sanitize all input data
    const sanitizedData = {
      firstName: sanitizeString(data.firstName),
      lastName: sanitizeString(data.lastName),
      email: data.email.toLowerCase().trim(),
      firm: sanitizeString(data.firm),
      role: data.role ? sanitizeString(data.role) : '',
      interest: data.interest,
      message: sanitizeString(data.message),
      userAgent: data.userAgent
    };

    // Generate email content
    const clientEmail = generateClientEmail(sanitizedData);
    const internalEmail = generateInternalEmail(sanitizedData, clientIP);


    // Send emails
    const emailPromises = [
      // Send confirmation to client
      resend.emails.send({
        from: 'Dex Intelligence <noreply@dexintelligence.ai>',
        to: [sanitizedData.email],
        subject: clientEmail.subject,
        html: clientEmail.html,
        text: clientEmail.text,
      }),
      
      // Send notification to internal team
      resend.emails.send({
        from: 'Contact Form <noreply@dexintelligence.ai>',
        to: [process.env.CONTACT_EMAIL || 'justin@dexintelligence.ca'],
        subject: internalEmail.subject,
        html: internalEmail.html,
        text: internalEmail.text,
      }),
    ];

    const emailResults = await Promise.all(emailPromises);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Your inquiry has been submitted successfully. You should receive a confirmation email shortly.' 
      }),
    };

  } catch (error) {
    console.error('Contact form error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'An error occurred while processing your request. Please try again or contact us directly at justin@dexintelligence.ca.' 
      }),
    };
  }
};