import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { authService } from '../../utils/auth';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionError, setSessionError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const session = await authService.getSession();
      if (!session) {
        setSessionError(true);
      }
    } catch (error) {
      setSessionError(true);
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validatePassword()) {
      return;
    }

    setLoading(true);

    try {
      await authService.updatePassword(password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/client/dashboard');
      }, 3000);
    } catch (error) {
      setError(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sessionError) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Session Expired</h2>
          </div>

          <div className="bg-neutral-800/50 backdrop-blur border border-brand/30 rounded-lg p-8">
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-red-300 font-medium">Invalid or expired reset link</p>
                <p className="text-sm text-gray-300">
                  This password reset link has expired or is invalid.
                  Please request a new password reset link.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/client/forgot-password"
                className="w-full flex justify-center py-3 px-4 bg-brand text-white font-medium rounded-lg hover:bg-[#d68c3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-colors"
              >
                Request New Reset Link
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Password Reset Successful</h2>
          </div>

          <div className="bg-neutral-800/50 backdrop-blur border border-brand/30 rounded-lg p-8">
            <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-green-300 font-medium">Your password has been reset!</p>
                <p className="text-sm text-gray-300">
                  You'll be redirected to your dashboard in a moment...
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Create New Password</h2>
          <p className="mt-2 text-gray-400">
            Please enter your new password below.
          </p>
        </div>

        <div className="bg-neutral-800/50 backdrop-blur border border-brand/30 rounded-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-red-300">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                  name="confirmPassword"
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
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 bg-brand text-white font-medium rounded-lg hover:bg-[#d68c3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/client/login" className="text-sm text-gray-400 hover:text-brand">
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}