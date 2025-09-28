import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Shield, AlertCircle, CheckCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { authService } from '../../utils/auth';

export default function AccountSettings() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Email change state
  const [newEmail, setNewEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await authService.getUser();
      if (!currentUser) {
        navigate('/client/login');
        return;
      }
      setUser(currentUser);
      setNewEmail(currentUser.email || '');
    } catch (error) {
      console.error('Error loading user:', error);
      navigate('/client/login');
    }
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    setEmailError('');
    setEmailSuccess('');
    setLoading(true);

    try {
      await authService.updateEmail(newEmail);
      setEmailSuccess('A confirmation email has been sent to your new email address. Please check your inbox.');
    } catch (error) {
      setEmailError(error.message || 'Failed to update email');
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = () => {
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!validatePassword()) {
      return;
    }

    setLoading(true);

    try {
      await authService.updatePassword(newPassword);
      setPasswordSuccess('Your password has been updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setPasswordError(error.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen pt-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/client/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-brand transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-neutral-800/50 backdrop-blur border border-brand/30 rounded-lg overflow-hidden">
          <div className="bg-neutral-900/50 border-b border-gray-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Account Settings</h1>
          </div>

          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'text-brand border-b-2 border-brand'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </div>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'security'
                  ? 'text-brand border-b-2 border-brand'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </div>
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">Email Address</h2>
                  <form onSubmit={handleEmailUpdate} className="space-y-4">
                    {emailError && (
                      <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-red-300">{emailError}</span>
                      </div>
                    )}
                    {emailSuccess && (
                      <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3 flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-green-300">{emailSuccess}</span>
                      </div>
                    )}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <input
                          id="email"
                          type="email"
                          required
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          className="pl-10 w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-400">
                        Changing your email will require verification. A confirmation link will be sent to the new address.
                      </p>
                    </div>
                    <button
                      type="submit"
                      disabled={loading || newEmail === user.email}
                      className="px-6 py-2 bg-brand text-white font-medium rounded-lg hover:bg-[#d68c3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? 'Updating...' : 'Update Email'}
                    </button>
                  </form>
                </div>

                <div className="pt-6 border-t border-gray-700">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Account Information</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-300">
                      <span className="text-gray-500">User ID:</span> {user.id}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="text-gray-500">Created:</span> {new Date(user.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="text-gray-500">Last Sign In:</span> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">Change Password</h2>
                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    {passwordError && (
                      <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-red-300">{passwordError}</span>
                      </div>
                    )}
                    {passwordSuccess && (
                      <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3 flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-green-300">{passwordSuccess}</span>
                      </div>
                    )}

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <input
                          id="newPassword"
                          type={showNewPassword ? 'text' : 'password'}
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="pl-10 pr-10 w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-400">Must be at least 8 characters long</p>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 pr-10 w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !newPassword || !confirmPassword}
                      className="px-6 py-2 bg-brand text-white font-medium rounded-lg hover:bg-[#d68c3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? 'Updating...' : 'Update Password'}
                    </button>
                  </form>
                </div>

                <div className="pt-6 border-t border-gray-700">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Other Security Options</h3>
                  <div className="space-y-3">
                    <Link
                      to="/client/forgot-password"
                      className="inline-flex items-center gap-2 text-sm text-brand hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      Send password reset email
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}