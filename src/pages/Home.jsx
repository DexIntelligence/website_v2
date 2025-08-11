export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-24">
      {/* Hero */}
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
        Transforming <span className="text-brand">quantitative analysis</span> from a bottleneck into a strategic advantage
      </h1>

      {/* Subtitle */}
      <p className="mt-8 text-2xl font-light text-gray-200 max-w-4xl border-l-4 border-brand pl-5 italic leading-snug">
        Building the future of quantitative evidence in competition law.
      </p>

      {/* Quick Links (place ABOVE the principles section) */}
      <section className="mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* About Us */}
          <a
            href="/about"
            className="group rounded-2xl bg-black/80 border border-white/10 px-6 py-10 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-brand hover:shadow-lg hover:-translate-y-1"
          >
            <span className="text-2xl font-semibold text-white group-hover:text-brand">About Us</span>
            <span className="mt-2 text-sm text-gray-400">Learn about our mission and team.</span>
          </a>

          {/* Explore Products */}
          <a
            href="/products"
            className="group rounded-2xl bg-black/80 border border-white/10 px-6 py-10 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-brand hover:shadow-lg hover:-translate-y-1"
          >
            <span className="text-2xl font-semibold text-white group-hover:text-brand">Explore Products</span>
            <span className="mt-2 text-sm text-gray-400">Discover our tools and solutions.</span>
          </a>

          {/* Explore Insights */}
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
      <section className="mt-12 rounded-3xl bg-gray-800/40 border border-white/10 p-8">
        <h2 className="text-xl font-semibold text-white mb-6">Foundational principles:</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Card 1 */}
          <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-brand/70 via-white/10 to-transparent">
            <div className="rounded-2xl h-full bg-black/80 backdrop-blur border border-white/10 p-6 flex flex-col items-center text-center transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg">
              <img src="/AI-safety.png" alt="AI Safety" className="h-20 w-20 object-contain" />
              <h3 className="mt-4 text-lg font-semibold text-white">AI Safety</h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-brand/70 via-white/10 to-transparent">
            <div className="rounded-2xl h-full bg-black/80 backdrop-blur border border-white/10 p-6 flex flex-col items-center text-center transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg">
              <img src="/data-security.png" alt="Data Security" className="h-20 w-20 object-contain" />
              <h3 className="mt-4 text-lg font-semibold text-white">Data Security</h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-brand/70 via-white/10 to-transparent">
            <div className="rounded-2xl h-full bg-black/80 backdrop-blur border border-white/10 p-6 flex flex-col items-center text-center transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg">
              <img src="/transparency.png" alt="Transparency & Defensibility" className="h-20 w-20 object-contain" />
              <h3 className="mt-4 text-lg font-semibold text-white">Transparency &amp; Defensibility</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
