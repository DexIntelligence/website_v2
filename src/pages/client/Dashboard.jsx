import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, ExternalLink, BarChart3, FileText, Settings, Loader2, Files, MessageSquare } from 'lucide-react';
import { authService } from '../../utils/auth';
import FeedbackModal from '../../components/FeedbackModal';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [launchingId, setLaunchingId] = useState(null);
  const [fileSharingId, setFileSharingId] = useState(null);
  const [deployments, setDeployments] = useState([]);
  const [deploymentsLoading, setDeploymentsLoading] = useState(true);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
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
      const hostname = window.location.hostname;
      let cookieDomain = '';

      // Only set domain for production - for localhost/staging, let browser handle it
      if (hostname.includes('dexintelligence.ai')) {
        cookieDomain = `domain=.dexintelligence.ai; `; // Leading dot for subdomains
      }

      const cookieString = `market_mapper_token=${token}; ` +
                          cookieDomain +
                          `path=/; ` +
                          (hostname === 'localhost' ? '' : 'secure; ') + // No secure flag on localhost
                          `samesite=lax; ` +                              // Allow cross-subdomain
                          `max-age=3600`;                                 // 1 hour

      document.cookie = cookieString;
      // Open Market Mapper app in new tab (NO token in URL)
      window.open(deployment.cloudRunUrl, '_blank', 'noopener,noreferrer');
      
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
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">Client Dashboard</h1>
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
            <div className="bg-black/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="text-lg font-semibold text-gray-100">Deployments</h2>
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
                    <h3 className="text-lg font-semibold text-gray-100">No Deployments Available</h3>
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
                        className="rounded-lg border border-brand/30 bg-brand/5 p-4 shadow-sm backdrop-blur-sm hover:border-brand/40 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-brand/20 rounded-md">
                              <BarChart3 className="h-5 w-5 text-brand" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-gray-100">{deployment.name}</h3>
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
            {/* Feedback Button - Highlighted */}
            <button
              onClick={() => setFeedbackModalOpen(true)}
              className="w-full bg-gradient-to-r from-brand to-[#d68c3f] hover:from-[#d68c3f] hover:to-brand text-white font-medium py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-brand/50 flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Send Feedback
            </button>

            <div className="bg-black/80 border border-brand/20 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link
                  to="/client/account"
                  className="flex items-center gap-3 p-3 hover:bg-black/30 rounded-lg transition-colors group w-full text-left"
                >
                  <Settings className="h-5 w-5 text-gray-400 group-hover:text-brand" />
                  <span className="text-gray-300 group-hover:text-gray-100">Account Settings</span>
                </Link>
                <Link
                  to="/client/user-guide"
                  className="flex items-center gap-3 p-3 hover:bg-black/30 rounded-lg transition-colors group"
                >
                  <FileText className="h-5 w-5 text-gray-400 group-hover:text-brand" />
                  <span className="text-gray-300 group-hover:text-gray-100">Market Mapper User Guide</span>
                </Link>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 hover:bg-black/30 rounded-lg transition-colors group"
                >
                  <FileText className="h-5 w-5 text-gray-400 group-hover:text-brand" />
                  <span className="text-gray-300 group-hover:text-gray-100">API Documentation (Coming Soon)</span>
                </a>
                <Link
                  to="/privacy"
                  className="flex items-center gap-3 p-3 hover:bg-black/30 rounded-lg transition-colors group"
                >
                  <FileText className="h-5 w-5 text-gray-400 group-hover:text-brand" />
                  <span className="text-gray-300 group-hover:text-gray-100">Privacy Policy</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        deployments={deployments}
      />
    </main>
  );
}