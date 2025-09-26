// MOCK SYSTEM - FOR LOCAL DEVELOPMENT ONLY
// This entire mock folder can be deleted when no longer needed

// Check if mock mode is enabled
export const isMockMode = () => {
  if (!import.meta.env.DEV) return false; // Never use mock in production
  return localStorage.getItem('MOCK_MODE') === 'enabled' ||
         window.location.search.includes('mock=true');
};

// Mock deployments data
const mockDeployments = [
  {
    id: 'mock-deploy-1',
    name: 'Smith & Associates - Production',
    description: 'Production deployment for Smith & Associates law firm',
    cloudRunUrl: 'https://mock-app-smith.run.app',
    gcsBucket: 'smith-associates-mock-shared',
    projectId: 'mock-smith-prod',
    region: 'us-central1',
    authorizedEmails: ['john@smithlaw.com', 'test@example.com', 'justin@dexintelligence.ai']
  },
  {
    id: 'mock-deploy-2',
    name: 'Johnson Legal - Production',
    description: 'Main deployment for Johnson Legal Group',
    cloudRunUrl: 'https://mock-app-johnson.run.app',
    gcsBucket: 'johnson-legal-mock-shared',
    projectId: 'mock-johnson-prod',
    region: 'us-east1',
    authorizedEmails: ['admin@johnsonlegal.com', 'test@example.com']
  },
  {
    id: 'mock-deploy-3',
    name: 'Demo Environment',
    description: 'Demo deployment for client presentations',
    cloudRunUrl: 'https://mock-app-demo.run.app',
    gcsBucket: 'mock-demo-shared',
    projectId: 'mock-demo',
    region: 'us-central1',
    authorizedEmails: ['demo@dexintelligence.ai', 'test@example.com', 'justin@dexintelligence.ai']
  }
];

// Mock user data
const mockUser = {
  id: 'mock-user-001',
  email: 'test@mocklaw.com',
  user_metadata: {
    full_name: 'Mock Test User',
    firm: 'Mock Law Firm LLP'
  },
  created_at: '2024-01-15T10:00:00Z',
  last_sign_in_at: new Date().toISOString()
};

// Simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API for deployments
export const mockLoadDeployments = async () => {
  console.log('🎭 MOCK: Loading fake deployments...');
  await delay(500);
  return {
    deployments: mockDeployments,
    count: mockDeployments.length,
    user: { id: mockUser.id, email: mockUser.email }
  };
};

// Mock launching Market Mapper
export const mockLaunchMarketMapper = async (deployment) => {
  console.log('🎭 MOCK: Launching Market Mapper for:', deployment.name);
  await delay(1000);

  // Just open a new tab to Google as a placeholder
  window.open('https://www.google.com/search?q=mock+market+mapper+' + deployment.id, '_blank');

  return { success: true, token: 'mock-token-' + Date.now() };
};

// Mock accessing file sharing
export const mockAccessFileSharing = async (deployment) => {
  console.log('🎭 MOCK: Accessing file sharing for:', deployment.name);
  await delay(800);

  // Open Google Drive as a placeholder
  window.open('https://drive.google.com/?mock=' + deployment.gcsBucket, '_blank');

  return { success: true, url: 'https://console.cloud.google.com/storage/mock' };
};

// Mock user for auth
export const getMockUser = () => mockUser;

// Toggle mock mode
export const toggleMockMode = () => {
  const current = localStorage.getItem('MOCK_MODE');
  if (current === 'enabled') {
    localStorage.removeItem('MOCK_MODE');
    console.log('📡 Mock mode disabled - Switching to real API');
  } else {
    localStorage.setItem('MOCK_MODE', 'enabled');
    console.log('🎭 Mock mode enabled - Using fake data');
  }
  window.location.reload();
};

// Export all mock functions as a single object for easy removal
export default {
  isMockMode,
  mockLoadDeployments,
  mockLaunchMarketMapper,
  mockAccessFileSharing,
  getMockUser,
  toggleMockMode
};