import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { ChevronRight, FileText, Map, BarChart3, Package, Settings, Zap } from 'lucide-react';

const UserGuide = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  const tabs = [
    {
      id: 'upload',
      label: 'Tab 1: Upload Data',
      icon: FileText,
      file: 'tab1-upload.md'
    },
    {
      id: 'overview',
      label: 'Tab 2: Market Overview',
      icon: Map,
      file: 'tab2-overview.md'
    },
    {
      id: 'market-xray',
      label: 'Tab 3: Market X-Ray (Beta)',
      icon: Zap,
      file: 'tab3-market-xray.md'
    },
    {
      id: 'analysis',
      label: 'Tab 4: Individual Analysis',
      icon: BarChart3,
      file: 'tab4-analysis.md'
    },
    {
      id: 'divestiture',
      label: 'Tab 5: Divestiture',
      icon: Package,
      file: 'tab5-divestiture.md'
    },
    {
      id: 'export',
      label: 'Tab 6: Settings & Export',
      icon: Settings,
      file: 'tab6-export.md'
    }
  ];

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      const loadedContent = {};

      for (const tab of tabs) {
        try {
          const response = await fetch(`/user-guide-content/${tab.file}`);
          const text = await response.text();
          loadedContent[tab.id] = marked(text);
        } catch (error) {
          console.error(`Failed to load ${tab.file}:`, error);
          loadedContent[tab.id] = '<p>Content loading failed. Please refresh the page.</p>';
        }
      }

      setContent(loadedContent);
      setLoading(false);
    };

    loadContent();
  }, []);

  const currentTab = tabs[activeTab];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-neutral-800 text-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Market Mapper User Guide</h1>
          <p className="text-gray-400 text-lg">
            Learn how to use the Market Mapper application for antitrust geographic market analysis
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-4 overflow-x-auto">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(index)}
                    className={`
                      whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                      transition-all duration-200
                      ${
                        activeTab === index
                          ? 'border-brand text-brand'
                          : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(':')[0]}</span>
                  </button>
                );
              })}
            </nav>
          </div>
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
                dangerouslySetInnerHTML={{ __html: content[currentTab.id] }}
                className="guide-content"
              />
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
            disabled={activeTab === 0}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-all
              ${
                activeTab === 0
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }
            `}
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Previous
          </button>

          <button
            onClick={() => setActiveTab(Math.min(tabs.length - 1, activeTab + 1))}
            disabled={activeTab === tabs.length - 1}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-all
              ${
                activeTab === tabs.length - 1
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-brand text-black hover:bg-[#d68c3f]'
              }
            `}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </main>

      <style jsx>{`
        .guide-content h1,
        .guide-content h2,
        .guide-content h3 {
          color: white;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .guide-content h1 {
          font-size: 2rem;
          font-weight: bold;
        }

        .guide-content h2 {
          font-size: 1.5rem;
          font-weight: semibold;
          border-bottom: 1px solid #374151;
          padding-bottom: 0.5rem;
        }

        .guide-content h3 {
          font-size: 1.25rem;
          font-weight: medium;
        }

        .guide-content p {
          color: #d1d5db;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .guide-content ul,
        .guide-content ol {
          color: #d1d5db;
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }

        .guide-content li {
          margin-bottom: 0.5rem;
        }

        .guide-content code {
          background-color: #1f2937;
          color: #fbbf24;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }

        .guide-content pre {
          background-color: #1f2937;
          color: #e5e7eb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin-bottom: 1rem;
        }

        .guide-content blockquote {
          border-left: 4px solid #ee9e46;
          padding-left: 1rem;
          color: #9ca3af;
          font-style: italic;
          margin: 1.5rem 0;
        }

        .guide-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 2rem auto;
          display: block;
          border: 1px solid #374151;
        }

        .guide-content .screenshot-placeholder {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          border: 2px dashed #4b5563;
          border-radius: 0.5rem;
          padding: 3rem;
          text-align: center;
          color: #6b7280;
          margin: 2rem 0;
        }

        .guide-content strong {
          color: #f3f4f6;
          font-weight: 600;
        }

        .guide-content a {
          color: #ee9e46;
          text-decoration: underline;
        }

        .guide-content a:hover {
          color: #d68c3f;
        }

        .guide-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1rem;
        }

        .guide-content th {
          background-color: #1f2937;
          color: white;
          padding: 0.75rem;
          text-align: left;
          border-bottom: 2px solid #374151;
        }

        .guide-content td {
          padding: 0.75rem;
          border-bottom: 1px solid #374151;
          color: #d1d5db;
        }
      `}</style>
    </div>
  );
};

export default UserGuide;