export default function Products() {
    return (
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-32">
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
                <p className="text-xl text-gray-400 text-center leading-relaxed">
                  For instant analysis, empowering lawyers directly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Full Economics Toolkit */}
        <section className="mt-16">
          <div className="w-24 h-px bg-white/20 mb-8"></div>
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
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 text-lg font-medium hover:bg-[#d68c3f] transition-colors"
          >
            Contact Us
          </a>
        </section>
      </main>
    );
  }
  