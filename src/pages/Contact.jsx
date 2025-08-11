export default function Contact() {
    return (
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-32">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-8">Contact <span className="text-brand">Dex</span></h1>
        
        <p className="mt-8 text-2xl font-light text-gray-200 max-w-4xl border-l-4 border-brand pl-5 italic leading-snug mb-16">
          Ready to transform your quantitative analysis workflow? Let's discuss how Dex can serve your practice.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
                  Email: <a href="mailto:justin@dexintelligence.ca" className="text-brand hover:text-white transition-colors">justin@dexintelligence.ca</a>
                </p>
                <p className="text-gray-400 leading-relaxed mt-2">
                  LinkedIn: <a href="https://ca.linkedin.com/in/justin-dd-mayne" target="_blank" rel="noopener noreferrer" className="text-brand hover:text-white transition-colors">Justin Mayne</a>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black/80 border border-brand p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Explore an Engagement</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 bg-neutral-900 border border-white/20 text-white placeholder-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 bg-neutral-900 border border-white/20 text-white placeholder-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors"
                    placeholder="Enter your last name"
                  />
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
                  required
                  className="w-full px-4 py-3 bg-neutral-900 border border-white/20 text-white placeholder-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors"
                  placeholder="Enter your professional email"
                />
              </div>

              <div>
                <label htmlFor="firm" className="block text-sm font-medium text-white mb-2">
                  Law Firm / Organization *
                </label>
                <input
                  type="text"
                  id="firm"
                  name="firm"
                  required
                  className="w-full px-4 py-3 bg-neutral-900 border border-white/20 text-white placeholder-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors"
                  placeholder="Enter your firm or organization"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
                  Role / Title
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
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
                  required
                  className="w-full px-4 py-3 bg-neutral-900 border border-white/20 text-white focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors"
                >
                  <option value="">Select your primary interest</option>
                  <option value="local-market-analysis">Local Market Analysis</option>
                  <option value="merger-review">Merger Review Support</option>
                  <option value="competitive-assessment">Competitive Assessment</option>
                  <option value="market-definition">Market Definition Studies</option>
                  <option value="damages-analysis">Damages Analysis</option>
                  <option value="other">Other Economic Analysis</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="w-full px-4 py-3 bg-neutral-900 border border-white/20 text-white placeholder-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors resize-vertical"
                  placeholder="Please describe your analytical challenge and timeline..."
                ></textarea>
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
                className="w-full bg-brand text-white font-medium py-3 px-6 hover:bg-[#d68c3f] transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-black"
              >
                Submit Secure Inquiry
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }
  