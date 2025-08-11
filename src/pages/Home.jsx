export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-24">
      {/* Hero */}
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
        Transforming <span className="text-brand">quantitative analysis</span> from a bottleneck into a strategic advantage
      </h1>

      {/* Subtitle */}
      <p className="mt-8 text-2xl font-light text-gray-200 max-w-4xl border-l-4 border-brand pl-5 italic leading-snug">
        Building the AI-driven future of quantitative evidence in competition law.
      </p>

      {/* Quick Links */}
      <section className="mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="/about"
            className="group bg-black/80 border border-brand px-6 py-10 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-brand hover:shadow-lg hover:-translate-y-1"
          >
            <span className="text-2xl font-semibold text-white group-hover:text-brand">About Us</span>
            <span className="mt-2 text-sm text-gray-400">Learn about our mission and team.</span>
          </a>
          <a
            href="/products"
            className="group bg-black/80 border border-brand px-6 py-10 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-brand hover:shadow-lg hover:-translate-y-1"
          >
            <span className="text-2xl font-semibold text-white group-hover:text-brand">Explore Products</span>
            <span className="mt-2 text-sm text-gray-400">Discover our tools and solutions.</span>
          </a>
          <a
            href="/insights"
            className="group bg-black/80 border border-brand px-6 py-10 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-brand hover:shadow-lg hover:-translate-y-1"
          >
            <span className="text-2xl font-semibold text-white group-hover:text-brand">Explore Insights</span>
            <span className="mt-2 text-sm text-gray-400">Read our latest research and analysis.</span>
          </a>
        </div>
      </section>

      {/* Foundational Principles */}
      <section className="mt-16 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Foundational Principles</h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl">
          Dex is built by lawyers to meet the high standards of the legal industry.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl">
          {/* AI Safety */}
          <div className="flex flex-col items-center">
            <img src="/AI-safety.png" alt="AI Safety" className="h-32 w-32 object-contain mb-6" />
            <h3 className="text-xl font-semibold text-white mb-3">AI Safety</h3>
            <p className="text-sm text-gray-400 text-center">
              Proprietary workflows ensure client data never enters public AI systems. Targeted AI use is applied only where safe and beneficial, with every output independently validated to eliminate hallucinations and preserve the highest level of analytical accuracy.
            </p>
          </div>
          {/* Data Security */}
          <div className="flex flex-col items-center">
            <img src="/data-security.png" alt="Data Security" className="h-32 w-32 object-contain mb-6" />
            <h3 className="text-xl font-semibold text-white mb-3">Data Security</h3>
            <p className="text-sm text-gray-400 text-center">
              Cloud deployments run in Canada-resident AWS environments with SOC 2 Type II and ISO 27001 certified infrastructure. Data is encrypted in transit and at rest, never leaves Canada, and is protected by multi-factor authentication. Secure upload workflows include virus scanning and enable provable, documented deletion on request.
            </p>
          </div>
          {/* Transparency & Defensibility */}
          <div className="flex flex-col items-center">
            <img src="/transparency.png" alt="Transparency & Defensibility" className="h-32 w-32 object-contain mb-6" />
            <h3 className="text-xl font-semibold text-white mb-3">Transparency &amp; Defensibility</h3>
            <p className="text-sm text-gray-400 text-center">
              Analytical methods are fully transparent, reproducible, and designed to exceed industry standards for defensibility. There are no “black box” shortcuts — every result is verifiable, documented, and ready to stand up to regulatory or courtroom scrutiny.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
