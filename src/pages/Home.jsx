import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-40">
      {/* Hero */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
        Transforming <span className="text-brand">quantitative analysis</span> from a bottleneck into a strategic advantage.
      </h1>

      {/* Subtitle */}
      <p className="mt-6 sm:mt-8 text-lg sm:text-xl lg:text-2xl font-light text-gray-200 max-w-4xl border-l-4 border-brand pl-4 sm:pl-5 italic leading-snug">
        Building the AI-driven future of quantitative evidence in competition law.
      </p>

      {/* Quick Links */}
      <section className="mt-8 sm:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <Link
            to="/about"
            className="group bg-black/80 border border-brand px-6 py-10 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-brand hover:shadow-lg hover:-translate-y-1"
          >
            <span className="text-2xl font-semibold text-white group-hover:text-brand">About Us</span>
            <span className="mt-2 text-sm text-gray-400">Learn about our mission and team.</span>
          </Link>
          <Link
            to="/products"
            className="group bg-black/80 border border-brand px-6 py-10 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-brand hover:shadow-lg hover:-translate-y-1"
          >
            <span className="text-2xl font-semibold text-white group-hover:text-brand">Explore Products</span>
            <span className="mt-2 text-sm text-gray-400">Discover our tools and solutions.</span>
          </Link>
          <Link
            to="/insights"
            className="group bg-black/80 border border-brand px-6 py-10 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-brand hover:shadow-lg hover:-translate-y-1"
          >
            <span className="text-2xl font-semibold text-white group-hover:text-brand">Explore Insights</span>
            <span className="mt-2 text-sm text-gray-400">Read our latest research and analysis.</span>
          </Link>
        </div>
      </section>

      {/* Foundational Principles */}
      <section className="mt-8">
        <div className="w-24 h-px bg-white/20 mb-8"></div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 hover:bg-brand hover:text-black transition-all duration-300 px-2 py-1 cursor-pointer inline-block">Foundational Principles:</h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl">
          Built by lawyers to meet the high standards of the legal industry.
        </p>
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 w-full max-w-5xl">
          {/* AI Safety */}
          <div className="flex flex-col items-center">
            <img src="/AI-safety.png" alt="AI Safety" className="h-24 w-24 sm:h-32 sm:w-32 object-contain mb-4 sm:mb-6" />
            <h3 className="text-xl font-semibold text-white mb-5 underline decoration-brand decoration-2 underline-offset-4">AI Safety</h3>
            <ul className="text-base text-gray-400 text-left space-y-2">
              <li className="flex items-start">
                <span className="text-brand mr-2 mt-0.5">•</span>
                <span>Proprietary workflows ensure client data never enters public AI systems.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand mr-2 mt-0.5">•</span>
                <span>Targeted AI use is applied only where safe and beneficial, with every output independently validated to eliminate hallucinations and preserve the highest level of analytical accuracy.</span>
              </li>
            </ul>
          </div>
          {/* Data Security */}
          <div className="flex flex-col items-center">
            <img src="/data-security.png" alt="Data Security" className="h-24 w-24 sm:h-32 sm:w-32 object-contain mb-4 sm:mb-6" />
            <h3 className="text-xl font-semibold text-white mb-5 underline decoration-brand decoration-2 underline-offset-4">Data Security</h3>
            <ul className="text-base text-gray-400 text-left space-y-2">
              <li className="flex items-start">
                <span className="text-brand mr-2 mt-0.5">•</span>
                <span>Cloud deployments run in Canada-resident Google Cloud environments with SOC 2 Type II and ISO 27001 certified infrastructure.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand mr-2 mt-0.5">•</span>
                <span>Data is encrypted in transit and at rest, never leaves Canada, and is protected by multi-factor authentication.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand mr-2 mt-0.5">•</span>
                <span>Secure upload workflows include virus scanning and enable provable, documented deletion on request.</span>
              </li>
            </ul>
          </div>
          {/* Transparency & Defensibility */}
          <div className="flex flex-col items-center">
            <img src="/transparency.png" alt="Transparency & Defensibility" className="h-24 w-24 sm:h-32 sm:w-32 object-contain mb-4 sm:mb-6" />
            <h3 className="text-xl font-semibold text-white mb-5 underline decoration-brand decoration-2 underline-offset-4">Transparency &amp; Defensibility</h3>
            <ul className="text-base text-gray-400 text-left space-y-2">
              <li className="flex items-start">
                <span className="text-brand mr-2 mt-0.5">•</span>
                <span>Analytical methods are fully transparent, reproducible, and designed to exceed industry standards for defensibility.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand mr-2 mt-0.5">•</span>
                <span>There are no "black box" shortcuts — every result is verifiable, documented, and ready to stand up to regulatory or courtroom scrutiny.</span>
              </li>
            </ul>
          </div>
          </div>
        </div>
      </section>

      {/* Design Partners Section */}
      <section className="mt-16 bg-neutral-800 p-8 text-center">
        <p className="text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
          We're selectively engaging early design partners for our <Link to="/products" className="text-gray-300 decoration-transparent hover:decoration-brand underline decoration-2 underline-offset-4 transition-all duration-200">local market analysis service</Link>.
        </p>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          For inquiries about foundational design partnerships, please contact us.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 text-lg font-medium hover:bg-[#d68c3f] transition-colors"
        >
          Contact Us
        </Link>
      </section>
    </main>
  );
}
