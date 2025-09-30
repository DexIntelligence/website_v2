import React, { useState } from 'react';
import { X, Send, MessageSquare, Bug, Lightbulb, Loader2 } from 'lucide-react';
import { authService } from '../utils/auth';

export default function FeedbackModal({ isOpen, onClose, deployments = [] }) {
  const [formData, setFormData] = useState({
    type: 'general',
    subject: '',
    description: '',
    deploymentId: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  const feedbackTypes = [
    { value: 'bug', label: 'Report a Bug', icon: Bug, description: 'Something isn\'t working correctly' },
    { value: 'feature', label: 'Request a Feature', icon: Lightbulb, description: 'Suggest a new feature or improvement' },
    { value: 'general', label: 'General Feedback', icon: MessageSquare, description: 'Share your thoughts or ask questions' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const session = await authService.getSession();
      if (!session) {
        throw new Error('Please log in to submit feedback');
      }

      const response = await fetch('/.netlify/functions/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          feedbackType: formData.type,
          subject: formData.subject,
          description: formData.description,
          deploymentId: formData.deploymentId || null,
          sourceUrl: window.location.href,
          userAgent: navigator.userAgent
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || 'Failed to submit feedback');
      }

      setSubmitStatus('success');

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ type: 'general', subject: '', description: '', deploymentId: '' });
        setSubmitStatus(null);
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Failed to submit feedback:', error);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSubmitStatus(null); // Clear status when user types
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-brand/30 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-gray-100">Share Your Feedback</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Feedback Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              What type of feedback do you have?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {feedbackTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = formData.type === type.value;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleChange('type', type.value)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isSelected
                        ? 'border-brand bg-brand/10'
                        : 'border-white/10 bg-black/30 hover:border-white/20'
                    }`}
                  >
                    <Icon className={`h-5 w-5 mb-2 ${isSelected ? 'text-brand' : 'text-gray-400'}`} />
                    <div className="text-sm font-medium text-gray-100">{type.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{type.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deployment Selection (Optional) */}
          {deployments.length > 0 && (
            <div>
              <label htmlFor="deployment" className="block text-sm font-medium text-gray-300 mb-2">
                Related to a specific deployment? (Optional)
              </label>
              <select
                id="deployment"
                value={formData.deploymentId}
                onChange={(e) => handleChange('deploymentId', e.target.value)}
                className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              >
                <option value="">None / General</option>
                {deployments.map((deployment) => (
                  <option key={deployment.id} value={deployment.id}>
                    {deployment.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
              Subject <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder="Brief summary of your feedback"
              required
              maxLength={200}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder={
                formData.type === 'bug'
                  ? 'Describe what happened, what you expected, and steps to reproduce...'
                  : formData.type === 'feature'
                  ? 'Describe the feature you\'d like to see and how it would help you...'
                  : 'Share your thoughts, questions, or suggestions...'
              }
              required
              rows={6}
              maxLength={2000}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
            />
            <div className="mt-1 text-xs text-gray-500 text-right">
              {formData.description.length} / 2000
            </div>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-sm text-green-400">
                Thank you! Your feedback has been submitted successfully.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-400">
                Failed to submit feedback. Please try again or contact support.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-6 py-2 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !formData.subject.trim() || !formData.description.trim()}
              className="inline-flex items-center gap-2 px-6 py-2 bg-brand hover:bg-[#d68c3f] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Feedback
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
