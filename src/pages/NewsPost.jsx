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

      {/* Post content */}
      <article
        className="prose prose-lg prose-invert max-w-none
                   prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                   prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
                   prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-200
                   prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
                   prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg
                   prose-strong:text-white prose-strong:font-semibold
                   prose-em:text-gray-200 prose-em:italic
                   prose-blockquote:border-brand prose-blockquote:bg-black/40 prose-blockquote:text-gray-300 prose-blockquote:p-4 prose-blockquote:rounded-r
                   prose-code:text-brand prose-code:bg-neutral-800/60 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                   prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-white/20 prose-pre:rounded-lg
                   prose-a:text-brand prose-a:no-underline prose-a:font-medium hover:prose-a:text-white hover:prose-a:underline prose-a:underline-offset-2
                   prose-ul:text-gray-300 prose-ul:space-y-2 prose-ol:text-gray-300 prose-ol:space-y-2
                   prose-li:text-gray-300 prose-li:leading-relaxed prose-li:marker:text-gray-400
                   prose-hr:border-white/10 prose-hr:my-12"
        dangerouslySetInnerHTML={{ __html: newsItem.content }}
      />

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
