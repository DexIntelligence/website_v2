import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { FileCode } from 'lucide-react';

const ApiDocumentation = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const response = await fetch('/docs/api-documentation.md');
        const text = await response.text();
        setContent(marked(text));
      } catch (error) {
        console.error('Failed to load API documentation:', error);
        setContent('<p>Content loading failed. Please refresh the page.</p>');
      }
      setLoading(false);
    };

    loadContent();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-neutral-800 text-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileCode className="h-10 w-10 text-brand" />
            <h1 className="text-4xl font-bold">API Documentation</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Technical documentation for integrating with Dex Intelligence APIs
          </p>
        </div>

        {/* Content Area */}
        <div className="bg-black/30 rounded-lg p-8 backdrop-blur-sm border border-gray-800">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-400">Loading content...</div>
            </div>
          ) : (
            <div className="prose prose-invert prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: content }}
                className="api-content"
              />
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .api-content h1,
        .api-content h2,
        .api-content h3 {
          color: white;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .api-content h1 {
          font-size: 2rem;
          font-weight: bold;
        }

        .api-content h2 {
          font-size: 1.5rem;
          font-weight: semibold;
          border-bottom: 1px solid #374151;
          padding-bottom: 0.5rem;
        }

        .api-content h3 {
          font-size: 1.25rem;
          font-weight: medium;
        }

        .api-content p {
          color: #d1d5db;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .api-content ul,
        .api-content ol {
          color: #d1d5db;
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }

        .api-content li {
          margin-bottom: 0.5rem;
        }

        .api-content code {
          background-color: #1f2937;
          color: #fbbf24;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }

        .api-content pre {
          background-color: #1f2937;
          color: #e5e7eb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin-bottom: 1rem;
        }

        .api-content pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
        }

        .api-content blockquote {
          border-left: 4px solid #ee9e46;
          padding-left: 1rem;
          color: #9ca3af;
          font-style: italic;
          margin: 1.5rem 0;
        }

        .api-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 2rem auto;
          display: block;
          border: 1px solid #374151;
        }

        .api-content strong {
          color: #f3f4f6;
          font-weight: 600;
        }

        .api-content a {
          color: #ee9e46;
          text-decoration: underline;
        }

        .api-content a:hover {
          color: #d68c3f;
        }

        .api-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1rem;
        }

        .api-content th {
          background-color: #1f2937;
          color: white;
          padding: 0.75rem;
          text-align: left;
          border-bottom: 2px solid #374151;
        }

        .api-content td {
          padding: 0.75rem;
          border-bottom: 1px solid #374151;
          color: #d1d5db;
        }
      `}</style>
    </div>
  );
};

export default ApiDocumentation;
