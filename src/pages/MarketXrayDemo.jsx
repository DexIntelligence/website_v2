import { Link } from 'react-router-dom';
import { ArrowLeft, Activity } from 'lucide-react';

export default function MarketXrayDemo() {
    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-24 space-y-12">
            <div className="pt-16">
                <Link
                    to="/market-mapper"
                    className="inline-flex items-center gap-2 text-brand hover:text-white transition mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Market Mapper
                </Link>

                <div className="flex items-center gap-3 text-brand/80 mb-6">
                    <Activity className="h-6 w-6" />
                    <span className="text-sm font-semibold uppercase tracking-widest">Demo</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
                    Market X-Ray Analysis
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                    Generate instant heatmap visualization of antitrust risk across all locations
                </p>
            </div>

            {/* Demo Navigation */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="/demos/census-boundary"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/60 px-6 py-3 text-base font-semibold text-white transition hover:border-brand"
                >
                    Census Boundary Analysis
                </Link>
                <Link
                    to="/demo"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/60 px-6 py-3 text-base font-semibold text-white transition hover:border-brand"
                >
                    Full Product Walkthrough
                </Link>
            </div>

            {/* Video Section */}
            <div className="rounded-xl border border-brand/30 overflow-hidden shadow-2xl">
                <div className="aspect-video w-full">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/v0zq4JurWfg"
                        title="Market X-Ray Analysis Demo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            {/* Content Section */}
            <div className="grid gap-8 lg:grid-cols-2">
                <div className="rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/5 via-white/5 to-black/40 p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-semibold text-white mb-4">What you'll see</h2>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="text-brand mt-1">•</span>
                            <span>Instantly identify high-risk overlap locations with visual heatmap overlays</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-brand mt-1">•</span>
                            <span>See concentration levels color-coded by severity across entire geographic footprint</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-brand mt-1">•</span>
                            <span>Filter and prioritize locations by HHI thresholds or market share triggers</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-brand mt-1">•</span>
                            <span>Generate executive summaries highlighting problematic markets at a glance</span>
                        </li>
                    </ul>
                </div>

                <div className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/5 via-white/5 to-black/40 p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-semibold text-white mb-4">Use cases</h2>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="text-brand mt-1">•</span>
                            <span><strong className="text-white">Initial screenings:</strong> Rapidly assess merger viability across hundreds of locations</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-brand mt-1">•</span>
                            <span><strong className="text-white">Divestiture planning:</strong> Visually identify which locations require remedies</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-brand mt-1">•</span>
                            <span><strong className="text-white">Client presentations:</strong> Communicate complex competitive dynamics with intuitive visual evidence</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* From Screening to Detailed Analysis */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/5 p-8">
                <h2 className="text-3xl font-semibold text-white mb-4">From high-level screening to detailed analysis</h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    The Market X-Ray provides instant visibility into antitrust risk across your entire geographic footprint. Once problematic markets are identified, Market Mapper's comprehensive analysis tools help you assess competitive dynamics in detail and determine optimal remedies.
                </p>
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border border-brand/20 bg-black/40 p-6">
                        <h3 className="text-lg font-semibold text-white mb-3">1. Surface risks</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Use the X-Ray to quickly identify high-concentration markets requiring detailed review
                        </p>
                    </div>
                    <div className="rounded-2xl border border-brand/20 bg-black/40 p-6">
                        <h3 className="text-lg font-semibold text-white mb-3">2. Analyze in detail</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Deep-dive into flagged markets using multiple market definition approaches (drive-time, distance, census boundaries)
                        </p>
                    </div>
                    <div className="rounded-2xl border border-brand/20 bg-black/40 p-6">
                        <h3 className="text-lg font-semibold text-white mb-3">3. Optimize remedies</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Determine mathematically optimal divestitures across all market definitions assessed in the X-Ray
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="rounded-3xl border border-brand/40 bg-gradient-to-br from-brand/20 via-transparent to-black/60 p-8 text-center">
                <h2 className="text-3xl font-semibold text-white mb-4">Ready to x-ray your markets?</h2>
                <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                    Request access to Market Mapper and start visualizing antitrust risk instantly
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-4 text-lg font-semibold text-black transition hover:bg-[#d68c3f]"
                    >
                        Request access
                    </Link>
                    <Link
                        to="/market-mapper"
                        className="inline-flex items-center justify-center rounded-full border border-brand/60 px-8 py-4 text-lg font-semibold text-white transition hover:border-brand"
                    >
                        Learn more about Market Mapper
                    </Link>
                </div>
            </div>
        </main>
    );
}
