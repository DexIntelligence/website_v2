import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../utils/blog.js';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (slug) {
        const postData = await getPostBySlug(slug);
        setPost(postData);
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 sm:px-6 pt-32">
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Loading post...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="mx-auto max-w-4xl px-4 sm:px-6 pt-32">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-white mb-4">Post not found</h1>
          <Link to="/insights" className="text-brand hover:text-white transition-colors">
            ← Back to Insights
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 pt-32">
      {/* Back link */}
      <div className="mb-8">
        <Link 
          to="/insights" 
          className="text-brand hover:text-white transition-colors text-sm font-medium"
        >
          ← Back to Insights
        </Link>
      </div>

      {/* Post header */}
      <header className="mb-12">
        <div className="mb-6">
          <span className="text-sm text-gray-400">
            {new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span>By {post.author}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </header>

      {/* Post content */}
      <article 
        className="prose prose-lg prose-invert max-w-none
                   prose-headings:text-white prose-headings:font-bold
                   prose-p:text-gray-300 prose-p:leading-relaxed
                   prose-strong:text-white prose-strong:font-semibold
                   prose-em:text-gray-200
                   prose-blockquote:border-brand prose-blockquote:text-gray-300
                   prose-code:text-brand prose-code:bg-neutral-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                   prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-white/20
                   prose-a:text-brand prose-a:no-underline hover:prose-a:text-white hover:prose-a:underline
                   prose-ul:text-gray-300 prose-ol:text-gray-300
                   prose-li:text-gray-300"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Post footer */}
      <footer className="mt-16 pt-8 border-t border-white/20">
        <div className="text-center">
          <Link 
            to="/insights" 
            className="inline-flex items-center gap-2 text-brand hover:text-white transition-colors font-medium"
          >
            ← Back to all insights
          </Link>
        </div>
      </footer>
    </main>
  );
}