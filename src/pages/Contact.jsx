import { useState } from 'react';
import { Link } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    firm: '',
    role: '',
    interest: '',
    message: '',
    emailConsent: false
  });
  
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.firm.trim() || formData.firm.trim().length < 2) {
      errors.firm = 'Law firm/organization is required';
    }
    
    if (!formData.interest) {
      errors.interest = 'Area of interest is required';
    }
    
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    if (formData.message.length > 5000) {
      errors.message = 'Message must be less than 5000 characters';
    }
       
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setStatus('loading');
    setErrorMessage('');
    setValidationErrors({});
    
    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          firm: '',
          role: '',
          interest: '',
          message: '',
          emailConsent: false
        });
      } else {
        setStatus('error');
        if (data.details && Array.isArray(data.details)) {
          setErrorMessage(data.details.join(', '));
        } else {
          setErrorMessage(data.error || 'An error occurred while submitting your inquiry.');
        }
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-40">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6 sm:mb-8">Contact <span className="text-brand">Us</span></h1>
      
      <p className="mt-6 sm:mt-8 text-lg sm:text-xl lg:text-2xl font-light text-gray-200 max-w-4xl border-l-4 border-brand pl-4 sm:pl-5 italic leading-snug mb-8 sm:mb-16">
        Ready to transform your quantitative analysis workflow? Let's discuss how Dex can serve your practice.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure Consultations</h3>
              <p className="text-gray-400 leading-relaxed">
                All initial consultations are conducted under strict confidentiality protocols. 
                We understand the sensitive nature of competition law matters and maintain the highest standards of discretion.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Response Time</h3>
              <p className="text-gray-400 leading-relaxed">
                We typically respond to inquiries within 24 hours. For urgent matters, 
                please indicate the time-sensitive nature of your request.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Direct Contact</h3>
              <p className="text-gray-400 leading-relaxed">
                Email: <a href="mailto:justin@dexintelligence.ai" className="text-brand hover:text-white transition-colors">justin@dexintelligence.ai</a>
              </p>
              <p className="text-gray-400 leading-relaxed mt-2">
                LinkedIn: <a href="https://ca.linkedin.com/in/justin-dd-mayne" target="_blank" rel="noopener noreferrer" className="text-brand hover:text-white transition-colors">Justin Mayne</a>
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-black/80 border border-brand p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Explore an Engagement</h2>
          
          {status === 'success' && (
            <div className="bg-green-900/30 border border-green-500 p-4 mb-6">
              <h3 className="text-green-400 font-medium mb-2">Inquiry Submitted Successfully</h3>
              <p className="text-green-300 text-sm">
                Thank you for your inquiry. You should receive a confirmation email shortly, 
                and we will respond within 24 hours.
              </p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="bg-red-900/30 border border-red-500 p-4 mb-6">
              <h3 className="text-red-400 font-medium mb-2">Submission Error</h3>
              <p className="text-red-300 text-sm">{errorMessage}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6" data-netlify="false">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-neutral-900 border text-white placeholder-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors ${
                      validationErrors.firstName ? 'border-red-500' : 'border-white/20'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {validationErrors.firstName && (
                    <p className="text-red-400 text-sm mt-1">{validationErrors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-neutral-900 border text-white placeholder-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors ${
                      validationErrors.lastName ? 'border-red-500' : 'border-white/20'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {validationErrors.lastName && (
                    <p className="text-red-400 text-sm mt-1">{validationErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Professional Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-neutral-900 border text-white placeholder-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors ${
                    validationErrors.email ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Enter your professional email"
                />
                {validationErrors.email && (
                  <p className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="firm" className="block text-sm font-medium text-white mb-2">
                  Law Firm / Organization *
                </label>
                <input
                  type="text"
                  id="firm"
                  name="firm"
                  value={formData.firm}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-neutral-900 border text-white placeholder-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors ${
                    validationErrors.firm ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Enter your firm or organization"
                />
                {validationErrors.firm && (
                  <p className="text-red-400 text-sm mt-1">{validationErrors.firm}</p>
                )}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
                  Role / Title
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-neutral-900 border border-white/20 text-white placeholder-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors"
                  placeholder="Enter your role or title"
                />
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-white mb-2">
                  Area of Interest *
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-neutral-900 border text-white focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors ${
                    validationErrors.interest ? 'border-red-500' : 'border-white/20'
                  }`}
                >
                  <option value="">Select your primary interest</option>
                  <option value="local-market-analysis">Local Market Analysis</option>
                  <option value="merger-review">Merger Review Support</option>
                  <option value="competitive-assessment">Competitive Assessment</option>
                  <option value="market-definition">Market Definition Studies</option>
                  <option value="merger-remedies">Merger Remedies Analysis</option>
                  <option value="market-mapper-demo">Market Mapper Demo</option>
                  <option value="other">Other Economic Analysis</option>
                </select>
                {validationErrors.interest && (
                  <p className="text-red-400 text-sm mt-1">{validationErrors.interest}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-neutral-900 border text-white placeholder-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors resize-vertical ${
                    validationErrors.message ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Please describe your analytical challenge and timeline..."
                ></textarea>
                {validationErrors.message && (
                  <p className="text-red-400 text-sm mt-1">{validationErrors.message}</p>
                )}
              </div>

              <div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="emailConsent"
                    name="emailConsent"
                    checked={formData.emailConsent}
                    onChange={handleChange}
                    className={`mt-1 mr-3 h-4 w-4 text-brand border-2 focus:ring-brand focus:ring-2 bg-neutral-900 ${
                      validationErrors.emailConsent ? 'border-red-500' : 'border-white/20'
                    }`}
                  />
                  <label htmlFor="emailConsent" className="text-sm text-gray-300 leading-relaxed">
                    I agree to receive emails about Dex updates and legal insights (optional). I can unsubscribe at any time.
                  </label>
                </div>
                  <p className="text-xs text-gray-400 mt-2">
                    By submitting, you agree to our <Link to="/privacy" className="underline text-gray-300 hover:text-brand">Privacy Policy</Link>.
                  </p>
              </div>

              <div className="bg-neutral-800/50 p-4 border-l-4 border-brand">
                <p className="text-sm text-gray-300">
                  <strong>Confidentiality:</strong> All information submitted through this form is treated as confidential 
                  and is only used to assess potential engagement opportunities. We do not share or store 
                  personal information beyond what is necessary for professional consultation.
                </p>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full font-medium py-3 px-6 transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-black ${
                  status === 'loading' 
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                    : 'bg-brand text-white hover:bg-[#d68c3f]'
                }`}
              >
                {status === 'loading' ? 'Submitting...' : 'Submit Secure Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }
  