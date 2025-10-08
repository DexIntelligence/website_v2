import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
    Map,
    ArrowRight,
    Target,
    Zap,
    FileText,
    DollarSign,
    Calendar,
    Sparkles,
    Database,
    Users,
    ChevronDown,
    Play
} from 'lucide-react';

export default function MarketMapper() {
    const [showDemoMenu, setShowDemoMenu] = useState(false);
    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-24 space-y-16">
            <section className="space-y-8">
                <div className="flex items-center gap-3 text-brand/80 pt-8">
                    <Map className="h-6 w-6" />
                    <span className="text-sm font-semibold uppercase tracking-widest">Market Mapper</span>
                </div>

                <div className="space-y-6">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                        Local area analysis <span className="text-brand">available today</span>
                    </h1>
                    <div className="border-l-4 border-brand pl-6">
                        <p className="text-lg sm:text-xl text-gray-200 leading-relaxed italic">
                            Interactive, map-driven local competition analysis for merger review teams, complete with export-ready evidence packs.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-semibold text-black transition hover:bg-[#d68c3f]"
                    >
                        Request access
                    </Link>
                    <div className="relative">
                        <button
                            onClick={() => setShowDemoMenu(!showDemoMenu)}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/60 px-6 py-3 text-base font-semibold text-white transition hover:border-brand w-full sm:w-auto"
                        >
                            <Play className="h-4 w-4" />
                            Watch demos
                            <ChevronDown className={`h-4 w-4 transition-transform ${showDemoMenu ? 'rotate-180' : ''}`} />
                        </button>
                        {showDemoMenu && (
                            <div className="absolute top-full mt-2 left-0 right-0 sm:left-0 sm:right-auto sm:min-w-[320px] rounded-2xl border border-brand/30 bg-black/95 backdrop-blur-sm shadow-xl z-10 overflow-hidden">
                                <Link
                                    to="/demos/census-boundary"
                                    className="block px-6 py-4 text-white hover:bg-brand/10 transition border-b border-white/10"
                                    onClick={() => setShowDemoMenu(false)}
                                >
                                    <div className="font-semibold text-sm mb-1">Census Boundary Analysis</div>
                                    <div className="text-xs text-gray-400">Quickly get maps of any census boundary with overlap</div>
                                </Link>
                                <Link
                                    to="/demos/market-xray"
                                    className="block px-6 py-4 text-white hover:bg-brand/10 transition border-b border-white/10"
                                    onClick={() => setShowDemoMenu(false)}
                                >
                                    <div className="font-semibold text-sm mb-1">Market X-Ray Analysis</div>
                                    <div className="text-xs text-gray-400">Generate x-ray heatmap of antitrust risk</div>
                                </Link>
                                <Link
                                    to="/demo"
                                    className="block px-6 py-4 text-white hover:bg-brand/10 transition"
                                    onClick={() => setShowDemoMenu(false)}
                                >
                                    <div className="font-semibold text-sm mb-1">Full Product Walkthrough</div>
                                    <div className="text-xs text-gray-400">Complete overview of Market Mapper</div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Market Mapper - Live Now */}
            <section className="space-y-8">
                <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-center">
                    {/* Hero Screenshot - Now inline on left */}
                    <div className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 via-transparent to-black/20 p-3 overflow-hidden max-w-md">
                        <img
                            src="/market-mapper-hero.png"
                            alt="Market Mapper interactive map interface showing competitive overlap analysis"
                            className="w-full h-auto rounded-lg shadow-xl"
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="text-left">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                                <span className="text-white">Comprehensive </span>
                                <span className="text-brand">
                                    geographic competition
                                </span>
                                <span className="text-white"> analysis</span>
                            </h2>
                        </div>
                        <div className="flex items-start justify-between gap-6">
                            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed flex-1">
                                Market Mapper delivers instant, regulator-ready analysis of merger impact on market shares and concentration across all plausible geographic market definitions.
                            </p>
                            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/40 px-4 py-2 flex-shrink-0">
                                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">Live Now</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                        <Target className="h-8 w-8 text-brand mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-3">Flexible Market Definitions</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Comprehensive overview of merger impact using distance-based, drive-time, and census boundary market definitions. Instantly flag regulatory concerns across all plausible approaches.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                        <Zap className="h-8 w-8 text-brand mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-3">Advanced Market Analysis</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Analyze sophisticated market definitions including combined catchments to accommodate complex dynamics like commuter traffic patterns across multiple drive-time catchments.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                        <Map className="h-8 w-8 text-brand mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-3">Optimal Divestiture Analysis</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Identify mathematically optimal divestiture remedies required to meet merger thresholds, even in complex geographic markets like out-of-home advertising.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                        <FileText className="h-8 w-8 text-brand mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-3">Polished Reports</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Platform generates polished, regulator-ready reports with all results backed by thorough technical appendices and transparent methodology documentation.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                        <DollarSign className="h-8 w-8 text-brand mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-3">Flexible Pricing</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Choose between subscription-based access for ongoing needs or matter-based pricing for individual cases. Contact us to discuss the best option for your practice.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                        <Users className="h-8 w-8 text-brand mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-3">Economist Support</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Expert review of all automated analysis by experienced economists ensures accuracy and helps navigate complex edge cases with confidence.
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        to="/demo"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-lg font-semibold text-black transition hover:bg-[#d68c3f]"
                    >
                        Watch Market Mapper Demo
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </section>

            {/* Market Mapper Pro - In Development */}
            <section className="space-y-8">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 border border-sky-400/40 px-4 py-2">
                        <Calendar className="h-4 w-4 text-sky-300" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-sky-300">Q4 2026 — On Track</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">
                        Market Mapper Pro
                    </h2>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Extends Market Mapper with collaborative project management and advanced analytics tools for sophisticated geographic competition analysis.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Project Management */}
                    <div className="rounded-3xl border border-sky-400/30 bg-gradient-to-br from-sky-500/10 via-transparent to-black/20 p-8">
                        <Database className="h-10 w-10 text-sky-300 mb-4" />
                        <h3 className="text-2xl font-semibold text-white mb-4">Collaborative Project Management</h3>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Persistent file management and versioned case files keep your team aligned throughout the matter lifecycle.
                        </p>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-sky-300 mt-1">•</span>
                                <span>Shared workspaces for merger review teams</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-sky-300 mt-1">•</span>
                                <span>Version control for case files and analysis snapshots</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-sky-300 mt-1">•</span>
                                <span>Data continuity across matter stages</span>
                            </li>
                        </ul>
                    </div>

                    {/* Advanced Analytics */}
                    <div className="rounded-3xl border border-sky-400/30 bg-gradient-to-br from-sky-500/10 via-transparent to-black/20 p-8">
                        <Sparkles className="h-10 w-10 text-sky-300 mb-4" />
                        <h3 className="text-2xl font-semibold text-white mb-4">Advanced Competition Analytics</h3>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Model consumer behaviour and location using client data for precise, defensible market definition.
                        </p>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-sky-300 mt-1">•</span>
                                <span>CMA 80% catchments based on customer location analysis</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-sky-300 mt-1">•</span>
                                <span>Gravity models for sophisticated competitive effects modeling</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-sky-300 mt-1">•</span>
                                <span>Advanced catchment customization and scenario planning</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-sky-300 mt-1">•</span>
                                <span>Client data integration for behaviour-based market analysis</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="rounded-3xl border border-brand/40 bg-gradient-to-br from-brand/20 via-transparent to-black/60 p-8 text-center">
                <h2 className="text-3xl font-semibold text-white">Ready to get started?</h2>
                <p className="mt-3 text-lg text-gray-300">
                    Contact us to secure your access to Market Mapper
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-base font-semibold text-black transition hover:bg-[#d68c3f]"
                    >
                        Contact us
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                        to="/products"
                        className="inline-flex items-center justify-center rounded-full border border-brand/60 px-6 py-3 text-base font-semibold text-white transition hover:border-brand"
                    >
                        View all products
                    </Link>
                </div>
            </section>
        </main>
    );
}
