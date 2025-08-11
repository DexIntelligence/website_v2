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
            className="group rounded-2xl bg-black/80 border border-white/10 px-6 py-10 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-brand hover:shadow-lg hover:-translate-y-1"
          >
            <span className="text-2xl font-semibold text-white group-hover:text-brand">About Us</span>
            <span className="mt-2 text-sm text-gray-400">Learn about our mission and team.</span>
          </a>
          <a
            href="/products"
            className="group rounded-2xl bg-black/80 border border-white/10 px-6 py-10 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-brand hover:shadow-lg hover:-translate-y-1"
          >
            <span className="text-2xl font-semibold text-white group-hover:text-brand">Explore Products</span>
            <span className="mt-2 text-sm text-gray-400">Discover our tools and solutions.</span>
          </a>
          <a
            href="/insights"
            className="group rounded-2xl bg-black/80 border border-white/10 px-6 py-10 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-brand hover:shadow-lg hover:-translate-y-1"
          >
            <span className="text-2xl font-semibold text-white group-hover:text-brand">Explore Insights</span>
            <span className="mt-2 text-sm text-gray-400">Read our latest research and analysis.</span>
          </a>
        </div>
      </section>

      {/* Foundational Principles */}
      <section className="mt-12 rounded-3xl bg-black border border-white/10 p-8 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold text-white mb-8">Foundational Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          {/* Icon 1 */}
          <div className="flex flex-col items-center">
            <img src="/AI-safety.png" alt="AI Safety" className="h-20 w-20 object-contain" />
            <h3 className="mt-4 text-lg font-semibold text-white">AI Safety</h3>
          </div>
          {/* Icon 2 */}
          <div className="flex flex-col items-center">
            <img src="/data-security.png" alt="Data Security" className="h-20 w-20 object-contain" />
            <h3 className="mt-4 text-lg font-semibold text-white">Data Security</h3>
          </div>
          {/* Icon 3 */}
          <div className="flex flex-col items-center">
            <img src="/transparency.png" alt="Transparency & Defensibility" className="h-20 w-20 object-contain" />
            <h3 className="mt-4 text-lg font-semibold text-white">Transparency &amp; Defensibility</h3>
          </div>
        </div>
      </section>
    </main>
  );
}
