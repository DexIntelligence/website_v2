import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, ExternalLink, BarChart3, FileText, Settings, Loader2, Files } from 'lucide-react';
import { authService } from '../../utils/auth';

// MOCK SYSTEM - Remove these 2 lines to disable mock functionality
import mockSystem from '../../mock/mockSystem';
import MockIndicator from '../../mock/MockIndicator';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [launchingId, setLaunchingId] = useState(null);
  const [fileSharingId, setFileSharingId] = useState(null);
  const [deployments, setDeployments] = useState([]);
  const [deploymentsLoading, setDeploymentsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await authService.getUser();
      setUser(currentUser);
      if (currentUser) {
        await loadUserDeployments();
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserDeployments = async () => {
    try {
      // MOCK MODE CHECK - Remove this block to disable mock
      if (mockSystem && mockSystem.isMockMode()) {
        const mockData = await mockSystem.mockLoadDeployments();
        setDeployments(mockData.deployments || []);
        console.log(`MOCK: Loaded ${mockData.deployments?.length || 0} fake deployments`);
        setDeploymentsLoading(false);
        return;
      }
      // END MOCK MODE CHECK

      const session = await authService.getSession();
      if (!session) {
        throw new Error('No active session');
      }

      const response = await fetch('/.netlify/functions/get-user-deployments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || 'Failed to fetch deployments');
      }

      const data = await response.json();
      setDeployments(data.deployments || []);
      console.log(`Loaded ${data.deployments?.length || 0} deployments for user`);

    } catch (error) {
      console.error('Failed to load deployments:', error);
      setDeployments([]);
    } finally {
      setDeploymentsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/client/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Cookie-based authentication (ONLY working method in production)
  const launchMarketMapper = async (deployment) => {
    const deploymentId = deployment?.id;
    if (!deploymentId) {
      console.error('Cannot launch Market Mapper: deployment ID is missing.');
      return;
    }

    if (launchingId !== null && launchingId !== deploymentId) {
      console.warn('Another deployment launch is already in progress.');
      return;
    }

    if (fileSharingId !== null) {
      console.warn('Cannot launch while a file sharing request is in progress.');
      return;
    }

    setLaunchingId(deploymentId);
    try {
      // Get current user from auth service
      const currentUser = await authService.getUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      // Get session for secure token generation
      const session = await authService.getSession();
      if (!session) {
        throw new Error('No active session. Please log in again.');
      }

      // Generate secure JWT token via Netlify function
      const response = await fetch('/.netlify/functions/generate-market-mapper-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          deploymentId
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || 'Failed to generate token');
      }

      const { token } = await response.json();
      
      if (!token) {
        throw new Error('No token received from server');
      }

      // Set cookie with proper domain for cross-subdomain access
      // This is the ONLY authentication method that works in production
      const cookieString = `market_mapper_token=${token}; ` +
                          `domain=.dexintelligence.ai; ` +  // Leading dot for subdomains
                          `path=/; ` +
                          `secure; ` +                       // HTTPS only
                          `samesite=lax; ` +                 // Allow cross-subdomain
                          `max-age=3600`;                    // 1 hour
      
      console.log('Setting cookie:', cookieString);
      document.cookie = cookieString;
      
      // Verify cookie was set
      console.log('All cookies after setting:', document.cookie);
      console.log(`Redirecting to: ${deployment.cloudRunUrl} (no token in URL)`);

      // Redirect to Market Mapper app (NO token in URL)
      window.location.href = deployment.cloudRunUrl;
      
    } catch (error) {
      console.error('Failed to launch Market Mapper:', error);
      
      let errorMessage = 'Failed to launch Market Mapper. ';
      if (error.message.includes('session')) {
        errorMessage += 'Please log in again.';
      } else if (error.message.includes('Too many requests')) {
        errorMessage += 'Please wait a moment and try again.';
      } else {
        errorMessage += 'Please try again or contact support.';
      }
      
      alert(errorMessage);
    } finally {
      setLaunchingId(null);
    }
  };


  // Access shared data bucket for team collaboration
  const accessDataSharing = async (deployment) => {
    const deploymentId = deployment?.id;
    if (!deploymentId) {
      console.error('Cannot access shared files: deployment ID is missing.');
      return;
    }

    if (fileSharingId !== null && fileSharingId !== deploymentId) {
      console.warn('Another file sharing request is already in progress.');
      return;
    }

    if (launchingId !== null) {
      console.warn('Cannot access shared files while a deployment is launching.');
      return;
    }

    setFileSharingId(deploymentId);
    try {
      // MOCK MODE CHECK - Remove this block to disable mock
      if (mockSystem.isMockMode()) {
        await mockSystem.mockAccessFileSharing(deployment);
        return;
      }
      // END MOCK MODE CHECK
      // Get current user from auth service
      const currentUser = await authService.getUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      // Get session for secure token generation
      const session = await authService.getSession();
      if (!session) {
        throw new Error('No active session. Please log in again.');
      }

      // Generate secure shared bucket access URL via Netlify function
      const response = await fetch('/.netlify/functions/generate-shared-bucket-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          deploymentId
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || 'Failed to generate shared bucket access URL');
      }

      const { url } = await response.json();
      
      if (!url) {
        throw new Error('No access URL received from server');
      }

      console.log('Opening shared bucket access:', url);

      // Open GCS Console for shared bucket in new tab
      window.open(url, '_blank', 'noopener,noreferrer');
      
    } catch (error) {
      console.error('Failed to access data sharing:', error);
      
      let errorMessage = 'Failed to access data sharing. ';
      if (error.message.includes('session')) {
        errorMessage += 'Please log in again.';
      } else if (error.message.includes('Too many requests')) {
        errorMessage += 'Please wait a moment and try again.';
      } else {
        errorMessage += 'Please try again or contact support.';
      }
      
      alert(errorMessage);
    } finally {
      setFileSharingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-brand animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-40 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Client Dashboard</h1>
            <p className="mt-2 text-gray-400">Welcome back, {user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white border border-gray-600 hover:border-brand rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-6">
          <div className="space-y-6">
            <div className="bg-neutral-800/30 border border-gray-700 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">Deployments</h2>
                {!deploymentsLoading && (
                  <span className="text-sm text-gray-400">{deployments.length} active</span>
                )}
              </div>

              <div>
                {deploymentsLoading && (
                  <div className="flex items-center justify-center gap-3 px-6 py-10">
                    <Loader2 className="h-6 w-6 text-brand animate-spin" />
                    <span className="text-gray-300">Loading deployments...</span>
                  </div>
                )}

                {!deploymentsLoading && deployments.length === 0 && (
                  <div className="px-6 py-10 text-center space-y-2">
                    <h3 className="text-lg font-semibold text-white">No Deployments Available</h3>
                    <p className="text-sm text-gray-400">
                      Contact your administrator to get access to Market Mapper deployments.
                    </p>
                  </div>
                )}

                {!deploymentsLoading && deployments.length > 0 && (
                  <div className="p-4 space-y-4">
                    {deployments.map((deployment) => (
                      <div
                        key={deployment.id}
                        className="rounded-lg border border-brand/40 bg-gradient-to-br from-brand/15 via-brand/5 to-transparent p-4 shadow-sm"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-brand/20 rounded-md">
                              <BarChart3 className="h-5 w-5 text-brand" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-white">{deployment.name}</h3>
                              <p className="text-sm text-gray-400">
                                {deployment.description || 'Market Mapper deployment'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <p className="mt-3 text-sm text-gray-300">
                          Access market analysis, competitive intelligence, and data-driven insights tailored to your team.
                        </p>

                        <div className="mt-4 flex flex-wrap justify-end gap-3">
                          <button
                            onClick={() => launchMarketMapper(deployment)}
                            disabled={launchingId === deployment.id || fileSharingId !== null}
                            className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d68c3f] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {launchingId === deployment.id ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Launching App...
                              </>
                            ) : (
                              <>
                                <BarChart3 className="h-4 w-4" />
                                Launch
                                <ExternalLink className="h-3.5 w-3.5" />
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => accessDataSharing(deployment)}
                            disabled={fileSharingId === deployment.id || launchingId !== null}
                            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {fileSharingId === deployment.id ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Accessing Files...
                              </>
                            ) : (
                              <>
                                <Files className="h-4 w-4" />
                                Shared Files
                                <ExternalLink className="h-3.5 w-3.5" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links Card */}
          <div className="space-y-6 lg:sticky lg:top-40">
            <div className="bg-neutral-800/50 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link
                  to="/contact"
                  className="flex items-center gap-3 p-3 hover:bg-black/30 rounded-lg transition-colors group"
                >
                  <FileText className="h-5 w-5 text-gray-400 group-hover:text-brand" />
                  <span className="text-gray-300 group-hover:text-white">Request Support</span>
                </Link>
                <a
                  href="/insights"
                  className="flex items-center gap-3 p-3 hover:bg-black/30 rounded-lg transition-colors group"
                >
                  <FileText className="h-5 w-5 text-gray-400 group-hover:text-brand" />
                  <span className="text-gray-300 group-hover:text-white">View Insights</span>
                </a>
                <Link
                  to="/client/account"
                  className="flex items-center gap-3 p-3 hover:bg-black/30 rounded-lg transition-colors group w-full text-left"
                >
                  <Settings className="h-5 w-5 text-gray-400 group-hover:text-brand" />
                  <span className="text-gray-400 group-hover:text-brand">Account Settings</span>
                </Link>
              </div>
            </div>
          </div>
        </div>


        {/* Additional Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-800/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Recent Activity</h3>
            <p className="text-gray-400 text-sm">No recent activity to display</p>
          </div>
          
          <div className="bg-neutral-800/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-brand transition-colors">
                  Market Mapper User Guide (Coming Soon)
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand transition-colors">
                  API Documentation (Coming Soon)
                </a>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-brand transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* MOCK INDICATOR - Remove this line to disable mock UI */}
      <MockIndicator />
    </main>
  );
}