export default function About() {
    return (
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-32">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-8">About <span className="text-brand">Us</span></h1>
        <p className="mt-8 text-2xl font-light text-gray-200 max-w-4xl border-l-4 border-brand pl-5 italic leading-snug mb-12">
          Dex Intelligence helps competition lawyers turn complex quantitative analysis into a strategic advantage. We combine legal practicality with economic rigor and secure, purpose-built AI workflows to deliver analysis that is fast, transparent, and defensible.
        </p>
        
        <div className="bg-black/80 border border-brand px-6 py-10 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 underline decoration-brand decoration-2 underline-offset-4">Initial Focus: Local Market Analysis</h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            We are launching with a founder-led service focused on the most pressing client need: <span className="text-brand font-medium">local market analysis</span> for merger review and remedy matters. Insights from this work, powered by our internal '<span className="text-white font-medium">Market Mapper</span>' tool, will directly inform the development of our future real-time platform.
          </p>
        </div>

        {/* Why Lawyers Trust Dex */}
        <section className="mt-8">
          <h2 className="text-3xl font-bold text-white mb-4 hover:bg-brand hover:text-black transition-all duration-300 px-2 py-1 cursor-pointer inline-block">Why Lawyers Trust Dex</h2>
          <div className="max-w-4xl space-y-6">
            <div className="border-l-4 border-brand pl-6 py-3 bg-neutral-800/50 inline-block pr-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Canadian data residency on SOC 2 Type II and ISO 27001 certified infrastructure
              </p>
            </div>
            <div className="border-l-4 border-brand pl-6 py-3 bg-neutral-800/50 inline-block pr-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Data encrypted in transit and at rest; no public AI systems touch client data
              </p>
            </div>
            <div className="border-l-4 border-brand pl-6 py-3 bg-neutral-800/50 inline-block pr-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Transparent, reproducible methods designed for regulator and courtroom scrutiny
              </p>
            </div>
            <div className="border-l-4 border-brand pl-6 py-3 bg-neutral-800/50 inline-block pr-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Provable, documented data deletion on request
              </p>
            </div>
          </div>
        </section>

        {/* About the Founder */}
        <section className="mt-16">
          <div className="w-24 h-px bg-white/20 mb-8"></div>
          <h2 className="text-3xl font-bold text-white mb-4 hover:bg-brand hover:text-black transition-all duration-300 px-2 py-1 cursor-pointer inline-block">About the Founder</h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            <a href="https://ca.linkedin.com/in/justin-dd-mayne" target="_blank" rel="noopener noreferrer" className="text-gray-300 decoration-transparent hover:decoration-brand underline decoration-2 underline-offset-4 transition-all duration-200">Justin Mayne</a> is uniquely positioned at the intersection of law, economics, and technology. He practiced in a top-tier competition law group, has PhD-level training in empirical economics focused on quantitative market analysis, and builds proprietary, secure AI tools tailored to Canadian competition practice. This rare combination ensures that Dex delivers work that is not only fast and accessible — but also defensible and regulator-ready.
          </p>
        </section>

      </main>
    );
  }
  