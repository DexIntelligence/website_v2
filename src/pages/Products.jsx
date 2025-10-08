import { Link } from 'react-router-dom';
import {
    ExternalLink,
    Map,
    Network,
    Sparkles,
    Users2,
    LineChart,
    ShieldCheck,
    BarChart3,
    Play,
    Download,
} from 'lucide-react';
import { economistSupport, roadmap } from '../utils/content.js';

export default function Products() {

    const platformPillars = [
        {
            title: 'Live competition data fabric',
            description:
                'Continuously harmonized retail location data, catchments, and regulatory thresholds ready for instant analysis.',
            icon: Network,
        },
        {
            title: 'Automated AI workflows',
            description:
                'Purpose-built automation runs screenings, surfaces risks, and drafts deliverables without exposing sensitive client data.',
            icon: Sparkles,
        },
        {
            title: 'Economist-in-the-loop assurance',
            description:
                'A team of economists pressure-tests every automated result, ready to intervene whenever a case needs bespoke judgment.',
            icon: Users2,
        },
    ];

    const platformModules = [
        {
            name: 'Market Mapper',
            status: 'Live',
            statusTone: 'text-emerald-300 bg-emerald-500/10 border border-emerald-400/40',
            tagline: 'Local area analysis available today.',
            description:
                'Interactive, map-driven local competition analysis for merger review teams, complete with export-ready evidence packs.',
            highlights: [
                'Define and compare overlap markets across drive-time, distance, and census boundaries.',
                'Identify optimal merger remedies accounting for crown jewel assets and competitive dynamics.',
                'Comprehensive market share and HHI risk assessment in minutes — backed up by regulator-ready methodology.',
            ],
            cta: {
                label: 'View Market Mapper Details',
                href: '/market-mapper',
                external: false,
            },
        },
        {
            name: 'Retail Data Collector',
            status: 'Live Beta',
            statusTone: 'text-amber-300 bg-amber-500/10 border border-amber-400/40',
            tagline: 'Automated sourcing for national and local competitor coverage.',
            description:
                'Rapid high-quality data collection for retail mergers, leveraging cutting-edge agentic AI tools.',
            highlights: [
                'Verified scraping of retailer location data from public websites with automated quality validation.',
                'Integrated datasets combining scraped retail locations with complementary public data sources.',
                'Rapid data assembly for cases where counsel lacks access to proprietary location databases.',
            ],
        },
        {

            name: 'Market Mapper Pro',
            status: 'In Active Development',
            statusTone: 'text-sky-300 bg-sky-500/10 border border-sky-400/40',
            tagline: 'Advanced project file management and competition analytics for geographic competition.',
            description:
                'Extends Market Mapper with collaborative workspaces with persistent file management and advanced data and competition analysis tools.',
            highlights: [
                'Integrated project management platform maintaining data continuity and case files throughout matter lifecycle.',
                'Machine learning tools harmonize diverse datasets, including customer location analysis for precise market definition.',
                'Advanced economic modeling with gravity models and sophisticated concentration analysis for complex markets.',
            ],
        },
        {
            name: 'Market Share & Concentration Analytics',
            status: 'Planned',
            statusTone: 'text-violet-300 bg-violet-500/10 border border-violet-400/40',
            tagline: 'Non-geographic market share and HHI analysis platform.',
            description:
                'General market share and concentration analysis for non-geographic markets, leveraging ML-based data harmonization to process diverse product and service datasets.',
            highlights: [
                'Automated data harmonization using machine learning to unify disparate product catalogs and service definitions.',
                'Flexible market definition tools for product-based and service-based competition analysis.',
                'HHI and market share calculations with transparent methodology and regulator-ready documentation.',
            ],
        },
        {
            name: 'Full Merger Review Toolkit',
            status: 'Planned',
            statusTone: 'text-violet-300 bg-violet-500/10 border border-violet-400/40',
            tagline: 'Comprehensive economic analysis platform for merger reviews.',
            description:
                'End-to-end merger review platform built on harmonized data foundations, covering the complete toolkit of economic analyses including merger simulations and competitive effects modeling.',
            highlights: [
                'Unified data infrastructure supporting all stages of merger review from initial screening to litigation support.',
                'Advanced merger simulation models including UPP, GUPPI, and full structural demand estimation.',
                'Integrated competitive effects analysis including vertical foreclosure, coordinated effects, and efficiency assessments.',
            ],
        },
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-24 space-y-16">
            <section className="space-y-8">
                <div className="space-y-6">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight pt-8">
                        Competition economics, delivered as a <span className="text-brand">platform</span>.
                    </h1>
                    <div className="border-l-4 border-brand pl-6">
                        <p className="text-lg sm:text-xl text-gray-200 leading-relaxed italic">
                            Dex unifies automated market intelligence with an economist team so competition lawyers can answer
                            local overlap questions instantly and handle the edge cases with confidence. Market Mapper is live today,
                            and the broader Dex Platform is rolling out module by module.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-semibold text-black transition hover:bg-[#d68c3f]"
                    >
                        Request a walkthrough
                    </Link>
                    <Link
                        to="/demo"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/60 px-6 py-3 text-base font-semibold text-white transition hover:border-brand"
                    >
                        <Play className="h-4 w-4" />
                        Watch demo
                    </Link>
                    <Link
                        to="/market-mapper"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/60 px-6 py-3 text-base font-semibold text-white transition hover:border-brand"
                    >
                        <ExternalLink className="h-4 w-4" />
                        View Market Mapper overview
                    </Link>
                    <a
                        href="/Dex - Market Mapper v1 Sample Pitch Report.pdf"
                        download
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-white transition hover:border-white/40"
                    >
                        <Download className="h-4 w-4" />
                        Download Sample Companion Report
                    </a>
                </div>

            </section>

            <section className="space-y-10">
                <div>
                    <h2 className="text-3xl font-semibold text-white relative">
                        How the Dex Platform is built
                        <div className="absolute -bottom-2 left-0 w-16 sm:w-24 h-1 bg-brand"></div>
                    </h2>
                    <p className="mt-4 text-lg text-gray-300">
                        Inspired by the best modern data platforms, Dex combines a trusted data foundation, secure automation, and
                        expert review. Every module snaps into this architecture so you can scale from local screenings to full
                        merger remedies without switching tools.
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-3">
                    {platformPillars.map((pillar) => {
                        const Icon = pillar.icon;
                        return (
                            <div
                                key={pillar.title}
                                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-brand/60 hover:-translate-y-1"
                            >
                                <Icon className="mb-4 h-8 w-8 text-brand" />
                                <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                                <p className="mt-3 text-base text-gray-300 leading-relaxed">{pillar.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="space-y-12">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold text-white">Platform modules</h2>
                        <p className="mt-3 text-lg text-gray-300">
                            Start with Market Mapper and grow into additional Dex modules as they launch. Each module shares the
                            same evidence base, so every answer stays consistent across your matter lifecycle.
                        </p>
                    </div>
                    <p className="rounded-full border border-brand/50 px-4 py-2 text-sm font-medium text-brand/90">
                        Market Mapper access available now — new modules ship through 2026.
                    </p>
                </div>
                <div className="grid gap-6">
                    {platformModules.map((module) => (
                        <div
                            key={module.name}
                            className={`rounded-3xl p-8 transition ${
                                module.status === 'Planned'
                                    ? 'border-2 border-dashed border-violet-400/30 bg-gradient-to-br from-violet-500/5 via-transparent to-black/20 hover:border-violet-400/50'
                                    : 'border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/5 hover:border-brand/60'
                            }`}
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-semibold text-white">{module.name}</h3>
                                    <p className="text-base font-medium text-brand/90">
                                        {module.tagline}
                                        {module.name === 'Market Mapper' && (
                                            <>
                                                {' '}
                                                <Link
                                                    to="/market-mapper"
                                                    className="text-brand hover:text-white transition underline"
                                                >
                                                    See Details
                                                </Link>
                                            </>
                                        )}
                                    </p>
                                </div>
                                <span className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest ${module.statusTone}`}>
                                    {module.status}
                                </span>
                            </div>
                            <p className="mt-4 text-lg text-gray-300 leading-relaxed">{module.description}</p>
                            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                                {module.highlights.map((item) => (
                                    <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                                        <ShieldCheck className="h-5 w-5 flex-shrink-0 text-brand" />
                                        <span className="text-sm text-gray-200 leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            {module.cta ? (
                                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                    {module.name === 'Market Mapper' && (
                                        <Link
                                            to="/demo"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-white"
                                        >
                                            <Play className="h-4 w-4" />
                                            Watch demo
                                        </Link>
                                    )}
                                    {module.cta.external ? (
                                        <a
                                            href={module.cta.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-white"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            {module.cta.label}
                                        </a>
                                    ) : (
                                        <Link
                                            to={module.cta.href}
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-white"
                                        >
                                            {module.cta.label}
                                        </Link>
                                    )}
                                    {module.name === 'Market Mapper' && (
                                        <a
                                            href="/Dex - Market Mapper v1 Sample Pitch Report.pdf"
                                            download
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-white"
                                        >
                                            <Download className="h-4 w-4" />
                                            Download Sample Companion Report
                                        </a>
                                    )}
                                </div>
                            ) : (
                                <p className="mt-6 text-sm text-gray-400">
                                    Interested in early access? <Link to="/contact" className="text-brand hover:text-white">Talk to the team.</Link>
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
                <div className="rounded-3xl border border-brand/40 bg-gradient-to-br from-brand/20 via-transparent to-black/60 p-8">
                    <div className="flex items-center gap-3">
                        <Map className="h-6 w-6 text-brand" />
                        <span className="text-sm font-semibold uppercase tracking-widest text-brand/90">Local area analysis</span>
                    </div>
                    <h2 className="mt-4 text-3xl font-semibold text-white">Precision local evidence, on demand</h2>
                    <p className="mt-4 text-lg text-gray-200 leading-relaxed">
                        Whether you need a quick overlap screen or a defensible submission, Market Mapper produces polished local
                        market exhibits in minutes. Our economists partner with you to tailor catchments, assumptions, and
                        reporting so every claim stands up to regulator scrutiny.
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                            <LineChart className="mb-3 h-6 w-6 text-brand" />
                            <h3 className="text-lg font-semibold text-white">Quantitative rigour</h3>
                            <p className="mt-2 text-sm text-gray-300">
                                Built-in methodologies for distance, drive-time, and custom catchments with transparent assumptions.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                            <BarChart3 className="mb-3 h-6 w-6 text-brand" />
                            <h3 className="text-lg font-semibold text-white">Submission-quality outputs</h3>
                            <p className="mt-2 text-sm text-gray-300">
                                Produce detailed market analysis reports, supporting data, and methodology documentation formatted for legal proceedings.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                    <h3 className="text-2xl font-semibold text-white">Your economist partners</h3>
                    <p className="mt-4 text-base text-gray-300 leading-relaxed">
                        Dex is founder-led by economists who have supported merger reviews, remedies, and litigation. We stay
                        engaged throughout the engagement to:
                    </p>
                    <ul className="mt-6 space-y-4">
                        {economistSupport.map((item) => (
                            <li key={item} className="flex gap-3 text-sm text-gray-200 leading-relaxed">
                                <ShieldCheck className="h-5 w-5 flex-shrink-0 text-brand" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <Link
                        to="/team"
                        className="mt-8 inline-flex items-center justify-center rounded-full border border-brand/60 px-5 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-black"
                    >
                        Meet the team
                    </Link>
                </div>
            </section>

            <section className="space-y-10">
                <div>
                    <h2 className="text-3xl font-semibold text-white">Roadmap to the full Dex Platform</h2>
                    <p className="mt-3 text-lg text-gray-300">
                        We are shipping quickly with a transparent roadmap. Join as a design partner to influence the modules that
                        matter most to your practice.
                    </p>
                </div>
                <div className="relative border-l border-white/10 pl-6">
                    <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-brand/60 via-white/10 to-transparent" aria-hidden="true" />
                    <div className="space-y-10">
                        {roadmap.map((item) => (
                            <div key={item.phase} className="relative pl-8">
                                <span className="absolute left-[-31px] top-1 h-3 w-3 rounded-full border border-brand bg-black" />
                                <p className="text-sm font-semibold uppercase tracking-widest text-brand/80">{item.phase}</p>
                                <h3 className="mt-2 text-2xl font-semibold text-white">{item.title}</h3>
                                <p className="mt-2 text-base text-gray-300 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-sm">
                <h2 className="text-3xl font-semibold text-white">Ready to explore the Dex Platform?</h2>
                <p className="mt-3 text-lg text-gray-300">
                    Secure your access to Market Mapper today and help shape the next modules on the roadmap.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-semibold text-black transition hover:bg-[#d68c3f]"
                    >
                        Book a discovery call
                    </Link>
                    <a
                        href="mailto:justin@dexintelligence.ai"
                        className="inline-flex items-center justify-center rounded-full border border-brand/60 px-6 py-3 text-base font-semibold text-white transition hover:border-brand"
                    >
                        Email justin@dexintelligence.ai
                    </a>
                </div>
            </section>
        </main>
    );
}