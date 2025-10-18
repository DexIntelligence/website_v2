import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllNews } from '../utils/news.js';

export default function News() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      const allNews = await getAllNews();
      setNewsItems(allNews);
      setLoading(false);
    }
    loadNews();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-40">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-12 relative">
          News
          <div className="absolute -bottom-2 left-0 w-24 h-1 bg-brand"></div>
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Loading news...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-40">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-8 sm:mb-12 relative">
        News
        <div className="absolute -bottom-2 left-0 w-16 sm:w-24 h-1 bg-brand"></div>
      </h1>

      {/* News Article List */}
      <div className="space-y-6 sm:space-y-8">
        {newsItems.length > 0 ? (
          newsItems.map((item) => (
            <article key={item.slug} className="border-b border-white/20 pb-6 sm:pb-8">
              <div className="mb-4">
                <span className="text-sm text-gray-400">
                  {new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <Link to={`/news/${item.slug}`}>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 hover:text-brand transition-colors cursor-pointer">
                  {item.title}
                </h2>
              </Link>
              <p className="text-base sm:text-lg text-gray-300 mb-4 leading-relaxed">
                {item.excerpt}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <div className="flex items-center space-x-2 sm:space-x-4 text-sm">
                  <span className="text-sm text-gray-400">By {item.author}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-400">{item.readTime}</span>
                </div>
                <Link
                  to={`/news/${item.slug}`}
                  className="text-brand hover:text-white transition-colors text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No news available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}
