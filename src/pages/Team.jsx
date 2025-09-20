import { Linkedin } from 'lucide-react';

const teamMembers = [
  {
    name: "Justin Mayne",
    title: "Founder & CEO",
    bio: "Justin has hands-on experience leveraging AI in high-stakes competition matters, applying innovative technology to complex legal problems. Backed by a degree in mathematics and PhD-level training in econometrics, Justin founded Dex to make economic analysis accessible to competition lawyers and their clients.",
    linkedinUrl: "https://www.linkedin.com/in/justin-dd-mayne/"
  },
  {
    name: "Aaron Wolf",
    title: "Founding Economist",
    linkedinUrl: "https://www.linkedin.com/in/aarondwolf/"
  },
  {
    name: "Lauren Cappell",
    title: "Fractional COO",
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