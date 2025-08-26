import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/auth';

export default function AuthDebug() {
  const [debugInfo, setDebugInfo] = useState({});
  const [backendConfig, setBackendConfig] = useState(null);

  useEffect(() => {
    // Check frontend environment variables
    const info = {
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'NOT SET',
      supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 
        import.meta.env.VITE_SUPABASE_ANON_KEY.substring(0, 20) + '...' : 'NOT SET',
      appDomain: import.meta.env.VITE_APP_DOMAIN || 'NOT SET',
      supabaseClient: supabase ? 'Initialized' : 'NULL - Not initialized',
      nodeEnv: import.meta.env.MODE,
      allEnvKeys: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'))
    };
    setDebugInfo(info);

    // Check backend configuration
    fetch('/.netlify/functions/check-auth-config')
      .then(res => res.json())
      .then(data => setBackendConfig(data))
      .catch(err => setBackendConfig({ error: err.message }));
  }, []);

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Authentication Debug Info</h1>
        
        <div className="bg-neutral-800/50 backdrop-blur border border-brand/30 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-brand mb-4">Frontend Environment Variables</h2>
          <pre className="text-sm text-gray-300 overflow-auto">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>

        {backendConfig && (
          <div className="bg-neutral-800/50 backdrop-blur border border-brand/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-brand mb-4">Backend Environment Variables</h2>
            <pre className="text-sm text-gray-300 overflow-auto">
              {JSON.stringify(backendConfig, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-400">
          <p>This debug page shows what environment variables are available.</p>
          <p>The Supabase client is: <span className="text-brand font-semibold">
            {supabase ? 'INITIALIZED' : 'NOT INITIALIZED (this is the problem)'}
          </span></p>
        </div>
      </div>
    </main>
  );
}