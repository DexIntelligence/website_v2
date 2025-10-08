import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';

export default function CensusBoundaryDemo() {
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
                    <MapPin className="h-6 w-6" />
                    <span className="text-sm font-semibold uppercase tracking-widest">Demo</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
                    Census Boundary Analysis
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                    Quickly generate maps of any census boundary with competitive overlap analysis
                </p>
            </div>

            {/* Demo Navigation */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="/demos/market-xray"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/60 px-6 py-3 text-base font-semibold text-white transition hover:border-brand"
                >
                    Market X-Ray Analysis
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
                        src="https://www.youtube.com/embed/tFYMkZDUuNo"
                        title="Census Boundary Analysis Demo"
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
                            <span>Select any census boundary (census tract, dissemination area, forward sortation area)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-brand mt-1">•</span>
                            <span>Instantly visualize competitive overlap across merging parties and competitors</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-brand mt-1">•</span>
                            <span>Generate market share and HHI calculations for census-based market definitions</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-brand mt-1">•</span>
                            <span>Export analysis-ready maps and data for regulatory submissions</span>
                        </li>
                    </ul>
                </div>

                <div className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/5 via-white/5 to-black/40 p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-semibold text-white mb-4">Use cases</h2>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="text-brand mt-1">•</span>
                            <span><strong className="text-white">Regulatory submissions:</strong> Align market definitions with regulator-preferred census boundaries</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-brand mt-1">•</span>
                            <span><strong className="text-white">Multi-jurisdiction analysis:</strong> Analyze markets across provincial or municipal boundaries</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-brand mt-1">•</span>
                            <span><strong className="text-white">Demographic context:</strong> Layer census data for income, population, or industry-specific analysis</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* CTA Section */}
            <div className="rounded-3xl border border-brand/40 bg-gradient-to-br from-brand/20 via-transparent to-black/60 p-8 text-center">
                <h2 className="text-3xl font-semibold text-white mb-4">Ready to try census boundary analysis?</h2>
                <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                    Request access to Market Mapper and start analyzing census-based markets in minutes
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
