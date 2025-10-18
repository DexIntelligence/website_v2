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
      <div className="space-y-12">
        {newsItems.length > 0 ? (
          newsItems.map((item) => (
            <article key={item.slug} className="border-b border-white/20 pb-12">
              <div className="mb-3">
                <span className="text-sm text-gray-400">
                  {new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <Link to={`/news/${item.slug}`}>
                <h2 className="text-3xl font-bold text-white mb-4 hover:text-brand transition-colors cursor-pointer">
                  {item.title}
                </h2>
              </Link>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {item.excerpt}
              </p>

              {/* Render substantial preview of the actual content */}
              <div
                className="news-preview mb-6 max-w-none"
                dangerouslySetInnerHTML={{ __html: item.content }}
                style={{
                  maxHeight: '800px',
                  overflow: 'hidden',
                  maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                }}
              />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mt-6">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-sm text-gray-400">By {item.author}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-400">{item.readTime}</span>
                </div>
                <Link
                  to={`/news/${item.slug}`}
                  className="inline-flex items-center gap-2 bg-brand text-black px-5 py-2.5 rounded font-bold hover:bg-[#d68c3f] transition-colors"
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
