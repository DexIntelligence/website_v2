exports.handler = async (event, context) => {
  // Simple test to verify environment variables are loading correctly
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_KEY,
      hasNodeEnv: !!process.env.NODE_ENV,
      urlLength: process.env.SUPABASE_URL?.length || 0,
      keyLength: process.env.SUPABASE_SERVICE_KEY?.length || 0,
      nodeEnv: process.env.NODE_ENV,
      urlPreview: process.env.SUPABASE_URL ? 
        process.env.SUPABASE_URL.substring(0, 25) + '...' : 'missing',
      keyPreview: process.env.SUPABASE_SERVICE_KEY ? 
        process.env.SUPABASE_SERVICE_KEY.substring(0, 10) + '...' : 'missing',
      timestamp: new Date().toISOString()
    })
  };
};