export const platformModules = [
    {
        name: 'Market Mapper',
        status: 'Live beta',
        statusTone: 'text-emerald-300 bg-emerald-500/10 border border-emerald-400/40',
        tagline: 'Local area analysis available today.',
        description:
            'Interactive, map-driven local competition analysis for merger review teams, complete with export-ready evidence packs.',
        highlights: [
            'Define and compare overlap markets across drive-time, distance, or travel time in minutes.',
            'Instantly check Competition Bureau screening thresholds and provincial rules.',
            'Auto-generate polished market reports with transparent methodology notes.',
        ],
        cta: {
            label: 'View Market Mapper overview',
            href: '/Dex - Market Mapper v1 One Pager.pdf',
            external: true,
        },
    },
    {
        name: 'Retail Data Collector',
        status: 'Alpha build',
        statusTone: 'text-amber-300 bg-amber-500/10 border border-amber-400/40',
        tagline: 'Automated sourcing for national and local competitor coverage.',
        description:
            'Structured ingestion of store locator, pricing, and loyalty data to keep Market Mapper analysis current and defensible.',
        highlights: [
            'Verified scraping of thousands of storefronts with geocoding and audit trails.',
            'Change-detection alerts so counsel always knows when overlaps shift.',
            'Secure pipelines ready for private retailer data drops.',
        ],
    },
    {
        name: 'Market Mapper Pro',
        status: 'In design',
        statusTone: 'text-sky-300 bg-sky-500/10 border border-sky-400/40',
        tagline: 'Advanced project file management and competition analytics for geographic competition.',
        description:
            'Extends Market Mapper with collaborative workspaces, versioned case files, and remedy scenario planning so teams can manage complex geographic competition matters end-to-end.',
        highlights: [
            'Organize every matter with secure, version-controlled project files tied to live Market Mapper data.',
            'Model divestiture and commitment scenarios alongside automated overlap analytics in one place.',
            'Publish regulator-ready exhibits that stay synced to the same Dex data fabric as Market Mapper v1.',
        ],
    },
];
