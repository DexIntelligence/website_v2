const { createClient } = require('@supabase/supabase-js');

// Get deployment-specific environment variables by deployment ID
async function getDeploymentConfig(deploymentId) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase configuration missing');
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  const { data: deployment, error } = await supabase
    .from('deployments')
    .select('env_config, name, gcs_bucket, project_id')
    .eq('id', deploymentId)
    .eq('is_active', true)
    .single();
    
  if (error) {
    console.error('Failed to fetch deployment config:', error);
    throw new Error('Deployment configuration not found');
  }
  
  if (!deployment) {
    throw new Error('Deployment not found or inactive');
  }
  
  return {
    name: deployment.name,
    gcsBucket: deployment.gcs_bucket,
    projectId: deployment.project_id,
    envConfig: deployment.env_config
  };
}

// Get deployment config by user access (for functions that need deployment-specific vars)
async function getDeploymentConfigByUser(userEmail) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase configuration missing');
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  // Get deployments user has access to
  const { data: deployments, error } = await supabase
    .from('deployments')
    .select('id, name, env_config, gcs_bucket, project_id')
    .eq('is_active', true)
    .contains('authorized_emails', [userEmail]);
    
  if (error) {
    console.error('Failed to fetch user deployments:', error);
    throw new Error('Failed to fetch user deployment configurations');
  }
  
  if (!deployments || deployments.length === 0) {
    throw new Error('No deployments found for user');
  }
  
  // Return all deployment configs user has access to
  return deployments.map(deployment => ({
    id: deployment.id,
    name: deployment.name,
    gcsBucket: deployment.gcs_bucket,
    projectId: deployment.project_id,
    envConfig: deployment.env_config
  }));
}

// Get specific environment variable from deployment config
function getEnvVar(envConfig, varName, fallback = null) {
  if (!envConfig || typeof envConfig !== 'object') {
    return fallback;
  }
  
  return envConfig[varName] || fallback;
}

module.exports = {
  getDeploymentConfig,
  getDeploymentConfigByUser,
  getEnvVar
};