import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { authService } from '../../utils/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.resetPasswordForEmail(email);
      setSuccess(true);
    } catch (error) {
      setError(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Check Your Email</h2>
          </div>

          <div className="bg-neutral-800/50 backdrop-blur border border-brand/30 rounded-lg p-8">
            <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-green-300 font-medium">Password reset email sent!</p>
                <p className="text-sm text-gray-300">
                  We've sent a password reset link to <strong>{email}</strong>.
                  Please check your email and click the link to reset your password.
                </p>
                <p className="text-sm text-gray-400">
                  The link will expire in 1 hour. If you don't see the email, please check your spam folder.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => navigate('/client/login')}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-brand text-white font-medium rounded-lg hover:bg-[#d68c3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Sign In
              </button>

              <button
                onClick={() => {
                  setSuccess(false);
                  setEmail('');
                }}
                className="w-full py-3 px-4 bg-neutral-700 text-white font-medium rounded-lg hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition-colors"
              >
                Request Another Email
              </button>
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
          <h2 className="text-3xl font-bold text-white">Reset Your Password</h2>
          <p className="mt-2 text-gray-400">
            Enter your email address and we'll send you a link to reset your password.
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder="you@lawfirm.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 bg-brand text-white font-medium rounded-lg hover:bg-[#d68c3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Sending...' : 'Send Reset Email'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Remember your password?{' '}
              <Link to="/client/login" className="text-brand hover:underline">
                Back to Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}