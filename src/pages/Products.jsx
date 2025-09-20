import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Lock, ExternalLink } from 'lucide-react';
import { authService } from '../utils/auth';

export default function Products() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const currentUser = await authService.getUser();
            setUser(currentUser);
        };
        checkAuth();
    }, []);
    return (
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-40">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6 sm:mb-8">Products and <span className="text-brand">Services</span></h1>
        <p className="mt-6 sm:mt-8 text-lg sm:text-xl lg:text-2xl font-light text-gray-200 max-w-4xl border-l-4 border-brand pl-4 sm:pl-5 italic leading-snug mb-8 sm:mb-12">
          Two ways to break the quantitative bottleneck:
        </p>

        {/* Products Section */}
        <section className="mt-8">
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 w-full max-w-4xl">
              {/* AI-Powered Services */}
              <div className="flex flex-col items-center">
                <div className="h-48 sm:h-64 flex items-center justify-center mb-2">
                  <img src="/AI-powered-services.png" alt="AI-Powered Services" className="h-32 w-32 sm:h-40 sm:w-40 object-contain" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2.5 underline decoration-brand decoration-2 underline-offset-4">AI-Powered Services</h3>
                <p className="text-xl text-gray-400 text-center leading-relaxed">
                  For complex matters, we act as your agile analytics team.
                </p>
              </div>
              {/* Real-Time Platform */}
              <div className="flex flex-col items-center">
                <div className="h-48 sm:h-64 flex items-center justify-center mb-2">
                  <img src="/real-time-platform.png" alt="Real-Time Platform" className="h-48 w-48 sm:h-64 sm:w-64 object-contain" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2.5 underline decoration-brand decoration-2 underline-offset-4">Real-Time Platform</h3>
                <p className="text-xl text-gray-400 text-center leading-relaxed mb-4">
                  For instant analysis, empowering lawyers directly.
                </p>
                {user && (
                  <Link
                    to="/client/dashboard"
                    className="inline-flex items-center gap-2 bg-brand text-white px-4 py-2 text-sm font-medium hover:bg-[#d68c3f] transition-colors rounded-lg"
                  >
                    <Lock className="h-4 w-4" />
                    Access Platform
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Market Mapper v1 Section */}
        <section className="mt-12 relative">
          <div className="flex justify-center">
            <div className="max-w-2xl w-full relative">
              {/* Round gradient burst behind box */}
              <div className="absolute -inset-3 rounded-full opacity-90 blur-lg" style={{
                background: 'radial-gradient(circle, rgba(238, 158, 70, 0.8) 0%, rgba(238, 158, 70, 0.4) 50%, rgba(238, 158, 70, 0.1) 80%, transparent 100%)'
              }}></div>
              
              <div className="bg-black/90 border border-brand p-8 text-center hover:border-brand hover:shadow-lg hover:shadow-brand/20 transition-all duration-200 relative backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-3 underline decoration-brand decoration-2 underline-offset-4">Market Mapper v1 - Live Beta</h3>
                <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                  Comprehensive local competition analysis for mergers in real time. Interactive market definitions, automated regulatory assessments, and professional reporting.
                </p>
                <a
                  href="/Dex - Market Mapper v1 One Pager.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 text-lg font-medium hover:bg-[#d68c3f] transition-colors rounded-lg"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Demo Overview
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* What we offer */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8">What We Offer:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Link
              to="/contact"
              className="group bg-black/80 border border-brand px-6 py-10 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-brand hover:shadow-lg hover:-translate-y-1"
            >
              <span className="text-2xl font-semibold text-white group-hover:text-brand">Local Market Analysis</span>
              <span className="mt-2 text-sm text-gray-400">Comprehensive analysis of competition in local geographic markets. Provide high-quality preliminary assessment of retail competition even before gaining access to client data.</span>
            </Link>
            <Link
              to="/contact"
              className="group bg-black/80 border border-brand px-6 py-10 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-brand hover:shadow-lg hover:-translate-y-1"
            >
              <span className="text-2xl font-semibold text-white group-hover:text-brand">Optimal Merger Remedies</span>
              <span className="mt-2 text-sm text-gray-400">Meet the Bureau's new standard for merger remedies by identifying the mathematically optimal divestiture package, accounting for crown jewels.</span>
            </Link>
            <Link
              to="/contact"
              className="group bg-black/80 border border-brand px-6 py-10 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-brand hover:shadow-lg hover:-translate-y-1"
            >
              <span className="text-2xl font-semibold text-white group-hover:text-brand">Retail Data Collection</span>
              <span className="mt-2 text-sm text-gray-400">Proprietary workflows automatically scrape and verify retail data from public sources, including store locators, for comprehensive market coverage.</span>
            </Link>
            <Link
              to="/contact"
              className="group bg-black/80 border border-brand px-6 py-10 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-brand hover:shadow-lg hover:-translate-y-1"
            >
              <span className="text-2xl font-semibold text-white group-hover:text-brand">Bespoke Analysis</span>
              <span className="mt-2 text-sm text-gray-400">Advanced analytical tools built for your needs. Cut through the noise and uncover the evidence that supports your best case.</span>
            </Link>
          </div>
        </section>

        {/* Full Economics Toolkit */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-4 hover:bg-brand hover:text-black transition-all duration-300 px-2 py-1 cursor-pointer inline-block">The Full Economics Toolkit, Reimagined</h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Starting with local market analysis, expanding to everything. Antitrust economics covers vast terrain—market definition, competitive dynamics, consumer welfare analysis, econometric modeling. Dex brings <span className="text-brand font-medium">AI-powered precision</span> to any economic challenge your practice encounters.
          </p>
        </section>

        {/* Design Partners Section */}
        <section className="mt-16 bg-neutral-800 p-8 text-center">
          <p className="text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            We're selectively engaging early design partners for our <a href="/products" className="text-gray-300 decoration-transparent hover:decoration-brand underline decoration-2 underline-offset-4 transition-all duration-200">local market analysis service</a>.
          </p>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            For inquiries about foundational design partnerships, please contact us.
            {user && (
              <span className="block mt-2 text-brand">
                Existing clients can access the platform through the Client Portal.
              </span>
            )}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 text-lg font-medium hover:bg-[#d68c3f] transition-colors"
            >
              Contact Us
            </a>
            {user && (
              <Link
                to="/client/dashboard"
                className="inline-flex items-center gap-2 bg-neutral-700 text-white px-6 py-3 text-lg font-medium hover:bg-neutral-600 transition-colors"
              >
                <Lock className="h-5 w-5" />
                Client Portal
              </Link>
            )}
          </div>
        </section>
      </main>
    );
  }
  