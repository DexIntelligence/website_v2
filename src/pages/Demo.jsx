import { Link } from 'react-router-dom';
import { Play, Clock, Users, BarChart3 } from 'lucide-react';

export default function Demo() {
  // Market Mapper Demo Video
  const youtubeVideoId = "JmYO_4RsH5k";

  const demoHighlights = [
    {
      icon: BarChart3,
      title: "Live Market Analysis",
      description: "See how Market Mapper generates competitive overlap analysis in real-time"
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Watch complex geographic analysis completed in minutes, not days or weeks"
    },
    {
      icon: Users,
      title: "Lawyer-Friendly Interface",
      description: "Explore an interface designed specifically for legal professionals"
    }
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-40 pb-24">
      {/* Video Section */}
      <section className="mb-16 pt-8">
        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-video rounded-2xl overflow-hidden border border-brand/30 bg-black/50 backdrop-blur-sm">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?rel=0&modestbranding=1&showinfo=0`}
              title="Market Mapper Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ aspectRatio: '16/9' }}
            />
          </div>
        </div>
      </section>

      {/* What You'll See Section */}
      <section className="mb-16">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">What You'll See in This Demo</h2>
          <p className="text-lg text-gray-300 max-w-5xl border-l-4 border-brand pl-4 sm:pl-5 italic leading-snug">
            This demonstration showcases Market Mapper's core capabilities for competition law analysis.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {demoHighlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-brand/60 hover:-translate-y-1"
              >
                <Icon className="mb-4 h-8 w-8 text-brand" />
                <h3 className="text-lg font-semibold text-white mb-3">{highlight.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{highlight.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center bg-gradient-to-br from-brand/10 to-brand/5 rounded-3xl border border-brand/30 p-8 sm:p-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Ready to Explore Market Mapper?
        </h2>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
          See how Market Mapper can streamline your competition analysis workflow with
          precise, defensible market intelligence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-semibold text-black transition hover:bg-[#d68c3f]"
          >
            Request a Live Demo
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-full border border-brand/60 px-6 py-3 text-base font-semibold text-white transition hover:border-brand"
          >
            Learn More About the Platform
          </Link>
        </div>
      </section>
    </main>
  );
}