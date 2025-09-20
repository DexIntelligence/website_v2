import { Link } from 'react-router-dom';
import { Shield, Lock, FileCheck, Brain, Play } from 'lucide-react';
import { TeamSection } from './Team.jsx';

export default function About() {
    return (
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-40">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6 sm:mb-8">About <span className="text-brand">Us</span></h1>
        <p className="mt-6 sm:mt-8 text-lg sm:text-xl lg:text-2xl font-light text-gray-200 max-w-5xl mx-auto border-l-4 border-brand pl-4 sm:pl-5 italic leading-snug mb-8 sm:mb-12">
          Dex Intelligence helps competition lawyers turn complex quantitative analysis into a strategic advantage. We combine legal practicality with economic rigor and secure, purpose-built AI workflows to deliver analysis that is fast, transparent, and defensible.
        </p>
        
        <div className="bg-black/80 border border-brand px-4 sm:px-6 py-6 sm:py-10 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 underline decoration-brand decoration-2 underline-offset-4">Initial Focus: Local Market Analysis</h2>
          <p className="text-lg text-gray-400 leading-relaxed mb-8">
            We are launching with a founder-led service focused on the most pressing client need: <span className="text-brand font-medium">local market analysis</span> for merger review and remedy matters. Insights from this work, powered by our internal '<span className="text-white font-medium">Market Mapper</span>' tool, will directly inform the development of our future real-time platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full border border-brand/60 px-6 py-3 text-base font-semibold text-brand transition hover:bg-brand hover:text-black"
            >
              Explore the Dex Platform
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/60 px-6 py-3 text-base font-semibold text-brand transition hover:bg-brand hover:text-black"
            >
              <Play className="h-4 w-4" />
              Watch the demo
            </Link>
          </div>
        </div>

        {/* Why Lawyers Trust Dex */}
        <section className="mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 hover:bg-brand hover:text-black transition-all duration-300 px-2 py-1 cursor-pointer inline-block">Why Lawyers Trust Dex</h2>
          <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-6 backdrop-blur-sm transition hover:border-blue-400/60 hover:-translate-y-1">
              <Shield className="mb-4 h-8 w-8 text-blue-400" />
              <h3 className="text-lg font-semibold text-white mb-2">Certified Infrastructure</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Canadian data residency on SOC 2 Type II and ISO 27001 certified infrastructure
              </p>
            </div>
            <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-green-600/5 p-6 backdrop-blur-sm transition hover:border-green-400/60 hover:-translate-y-1">
              <Lock className="mb-4 h-8 w-8 text-green-400" />
              <h3 className="text-lg font-semibold text-white mb-2">Data Security</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Data encrypted in transit and at rest; no public AI systems touch client data
              </p>
            </div>
            <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-6 backdrop-blur-sm transition hover:border-purple-400/60 hover:-translate-y-1">
              <FileCheck className="mb-4 h-8 w-8 text-purple-400" />
              <h3 className="text-lg font-semibold text-white mb-2">Transparent Methods</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Transparent, reproducible methods designed for regulator and courtroom scrutiny
              </p>
            </div>
            <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-orange-600/5 p-6 backdrop-blur-sm transition hover:border-orange-400/60 hover:-translate-y-1">
              <Brain className="mb-4 h-8 w-8 text-orange-400" />
              <h3 className="text-lg font-semibold text-white mb-2">AI Safety</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Proprietary workflows ensure client data never enters public AI systems
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mt-16">
          <div className="w-24 h-px bg-white/20 mb-8"></div>
          <TeamSection showHeader={true} />
        </section>

      </main>
    );
  }
  