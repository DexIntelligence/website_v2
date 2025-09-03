import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/blog.js';

export default function Insights() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
      setLoading(false);
    }
    loadPosts();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-40">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-12 relative">
          Insights
          <div className="absolute -bottom-2 left-0 w-24 h-1 bg-brand"></div>
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Loading posts...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-40">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-8 sm:mb-12 relative">
        Insights
        <div className="absolute -bottom-2 left-0 w-16 sm:w-24 h-1 bg-brand"></div>
      </h1>
      
      {/* Blog Article List */}
      <div className="space-y-6 sm:space-y-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.slug} className="border-b border-white/20 pb-6 sm:pb-8">
              <div className="mb-4">
                <span className="text-sm text-gray-400">
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <Link to={`/insights/${post.slug}`}>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 hover:text-brand transition-colors cursor-pointer">
                  {post.title}
                </h2>
              </Link>
              <p className="text-base sm:text-lg text-gray-300 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <div className="flex items-center space-x-2 sm:space-x-4 text-sm">
                  <span className="text-sm text-gray-400">By {post.author}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-400">{post.readTime}</span>
                </div>
                <Link 
                  to={`/insights/${post.slug}`}
                  className="text-brand hover:text-white transition-colors text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No posts available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}
  