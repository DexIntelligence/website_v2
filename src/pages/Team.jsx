import { Linkedin } from 'lucide-react';

const teamMembers = [
  {
    name: "Justin Mayne",
    title: "Founder & CEO",
    bio: "Justin founded Dex to revolutionize quantitative evidence in competition law. He brings a rare blend of expertise in economics, mathematics, and competition law, honed by applying innovative AI solutions to high-stakes cases at elite Canadian law firms. Today, he leads Dex in its mission to empower lawyers and their clients with automated, accessible, and data-driven economic analysis.",
    linkedinUrl: "https://www.linkedin.com/in/justin-dd-mayne/"
  },
  {
    name: "Aaron Wolf",
    title: "Founding Economist",
    bio: "Aaron Wolf is a PhD Candidate in economics at Northwestern University (expected 2026) with expertise in econometrics, industrial organization, and data analysis. He previously worked as a statistician at Yale's Economic Growth Center and as an economic consultant on large-scale competition and regulatory cases in the United States. He brings deep experience in structuring complex data and applying advanced quantitative methods to real-world business and policy challenges.",
    linkedinUrl: "https://www.linkedin.com/in/aarondwolf/"
  },
  {
    name: "Lauren Cappell",
    title: "Fractional COO",
    bio: "Lauren Cappell is a senior technology executive who began her career in corporate law. Her experience spans large tech companies (Amazon, Thomson Reuters, Blackberry) and early and mid-stage startups. Lauren currently serves as a fractional COO and advisor, combining her legal background with proven operational expertise in AI and enterprise platforms.",
    linkedinUrl: "https://www.linkedin.com/in/lauren-cappell/"
  }
];

// Reusable Team component that can be used on both Team page and About page
export function TeamSection({ showHeader = true, className = "" }) {
  return (
    <section className={className}>
      {showHeader && (
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 relative">
            Team
            <div className="absolute -bottom-2 left-0 w-16 sm:w-24 h-1 bg-brand"></div>
          </h1>
        </div>
      )}

      <div className="grid gap-8 md:gap-12">
        {teamMembers.map((member, index) => (
          <div key={index} className="border-l-4 border-brand pl-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-brand font-medium">{member.title}</p>
              </div>
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-brand transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
            <p className="text-gray-300 leading-relaxed">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Main Team page component
export default function Team() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-40 pb-24">
      <TeamSection />
    </main>
  );
}