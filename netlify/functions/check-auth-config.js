exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Check which environment variables are set
  const config = {
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL ? 'SET' : 'NOT SET',
    VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY ? 'SET (hidden)' : 'NOT SET',
    SUPABASE_URL: process.env.SUPABASE_URL ? 'SET' : 'NOT SET',
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ? 'SET (hidden)' : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV || 'NOT SET',
    // Check if URL values match expected format
    url_format_check: process.env.VITE_SUPABASE_URL ? 
      (process.env.VITE_SUPABASE_URL.includes('supabase.co') ? 'Valid Supabase URL' : 'Invalid URL format') : 
      'No URL to check'
  };

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config, null, 2)
  };
};