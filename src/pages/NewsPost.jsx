import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsBySlug } from '../utils/news.js';

export default function NewsPost() {
  const { slug } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNewsItem() {
      if (slug) {
        const itemData = await getNewsBySlug(slug);
        setNewsItem(itemData);
        setLoading(false);
      }
    }
    loadNewsItem();
  }, [slug]);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 sm:px-6 pt-40">
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Loading news...</p>
        </div>
      </main>
    );
  }

  if (!newsItem) {
    return (
      <main className="mx-auto max-w-4xl px-4 sm:px-6 pt-40">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-white mb-4">News item not found</h1>
          <Link to="/news" className="text-brand hover:text-white transition-colors">
            ← Back to News
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 pt-40">
      {/* Back link */}
      <div className="mb-8">
        <Link
          to="/news"
          className="text-brand hover:text-white transition-colors text-sm font-medium inline-flex items-center gap-1"
        >
          <span>←</span> Back to News
        </Link>
      </div>

      {/* Post header */}
      <header className="mb-16 pb-8 border-b border-white/10">
        {/* Meta info */}
        <div className="mb-6">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400">
              {new Date(newsItem.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">By {newsItem.author}</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-300 font-medium">{newsItem.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
          {newsItem.title}
        </h1>

        {/* Excerpt */}
        {newsItem.excerpt && (
          <div className="border-l-4 border-brand pl-6">
            <p className="text-xl font-light text-gray-200 leading-relaxed italic">
              {newsItem.excerpt}
            </p>
          </div>
        )}
      </header>

      {/* Post content - no prose classes since we're using custom HTML/Tailwind */}
      <article className="max-w-none" dangerouslySetInnerHTML={{ __html: newsItem.content }} />

      {/* Post footer */}
      <footer className="mt-20 pt-8 border-t border-white/10">
        <div className="bg-black/40 border border-white/10 rounded-lg p-6 text-center">
          <p className="text-gray-300 mb-4 text-sm">
            Want to learn more about our products and services?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="bg-brand text-white px-6 py-2 rounded font-medium hover:bg-[#d68c3f] transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/news"
              className="text-brand hover:text-white transition-colors font-medium inline-flex items-center gap-1"
            >
              <span>←</span> Back to all news
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
