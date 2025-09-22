import { Link } from 'react-router-dom';
import { Shield, Lock, FileCheck, Brain, Play, ShieldCheck } from 'lucide-react';
import { TeamSection } from './Team.jsx';
import { economistSupport, roadmap } from '../utils/content.js';

export default function About() {
    return (
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-40">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6 sm:mb-8">About <span className="text-brand">Us</span></h1>
        <p className="mt-6 sm:mt-8 text-lg sm:text-xl lg:text-2xl font-light text-gray-200 max-w-5xl mx-auto border-l-4 border-brand pl-4 sm:pl-5 italic leading-snug mb-8 sm:mb-12">
          Dex Intelligence helps competition lawyers turn complex quantitative analysis into a strategic advantage. We combine legal practicality with economic rigour and secure, purpose-built AI workflows to deliver analysis that is fast, transparent, and defensible.
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
          <h2 className="text-3xl font-semibold text-white relative mb-6">
            Why Lawyers Trust Dex
            <div className="absolute -bottom-2 left-0 w-16 sm:w-24 h-1 bg-brand"></div>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6 backdrop-blur-sm transition hover:border-brand/60 hover:-translate-y-1">
              <Shield className="mb-4 h-8 w-8 text-brand" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Certified Infrastructure
              </h3>
              <p className="text-base text-gray-300 leading-relaxed">
                Canadian data residency on SOC 2 Type II and ISO 27001 certified infrastructure
              </p>
            </div>
            <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6 backdrop-blur-sm transition hover:border-brand/60 hover:-translate-y-1">
              <Lock className="mb-4 h-8 w-8 text-brand" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Data Security
              </h3>
              <p className="text-base text-gray-300 leading-relaxed">
                Data encrypted in transit and at rest; no public AI systems touch client data
              </p>
            </div>
            <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6 backdrop-blur-sm transition hover:border-brand/60 hover:-translate-y-1">
              <FileCheck className="mb-4 h-8 w-8 text-brand" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Transparent Methods
              </h3>
              <p className="text-base text-gray-300 leading-relaxed">
                Transparent, reproducible methods designed for regulator and courtroom scrutiny
              </p>
            </div>
            <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6 backdrop-blur-sm transition hover:border-brand/60 hover:-translate-y-1">
              <Brain className="mb-4 h-8 w-8 text-brand" />
              <h3 className="text-xl font-semibold text-white mb-3">
                AI Safety
              </h3>
              <p className="text-base text-gray-300 leading-relaxed">
                Proprietary workflows ensure client data never enters public AI systems
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-8 sm:px-8 sm:py-10 backdrop-blur-sm">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-white relative mb-6">
                Your economist partners
                <div className="absolute -bottom-2 left-0 w-16 sm:w-24 h-1 bg-brand"></div>
              </h2>
              <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed">
                Dex is founder-led by economists who stay embedded with every engagement. The team pairs real-world merger review
                experience with rapid, platform-backed analysis so your strategy is grounded in trusted evidence.
              </p>
            </div>
            <ul className="space-y-4">
              {economistSupport.map((item) => (
                <li key={item} className="flex gap-3 text-sm sm:text-base text-gray-200 leading-relaxed">
                  <ShieldCheck className="h-5 w-5 flex-shrink-0 text-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Team Section */}
        <section className="mt-16">
          <div className="w-24 h-px bg-white/20 mb-8"></div>
          <TeamSection showHeader={true} />
        </section>

        <section className="mt-12">
          <div className="rounded-2xl border border-slate-500/20 bg-black px-6 py-8 sm:px-8 sm:py-10 backdrop-blur-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white">Roadmap at a glance</h2>
              <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed">
                We are shipping quickly alongside design partners. Here's how the Dex Platform evolves over the next phases.
              </p>
            </div>
            <div className="relative pl-8">
              <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-brand/60 via-white/10 to-transparent" aria-hidden="true"></span>
              <div className="space-y-6">
                {roadmap.map((item) => (
                  <div key={item.phase} className="relative pl-8">
                    <span className="absolute left-[-37px] top-1 h-3 w-3 rounded-full border border-brand bg-black"></span>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand/80">{item.phase}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
    );
  }
  