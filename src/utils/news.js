import { marked } from 'marked';

// Configure marked to allow HTML (v16+ uses different API)
marked.use({
  gfm: true,
  breaks: true,
  mangle: false,
  headerIds: false
});

// Simple front-matter parser for browser use
function parseFrontMatter(content) {
  // Normalize line endings first
  const normalizedContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = normalizedContent.split('\n');

  if (lines[0] !== '---') {
    return { data: {}, content: normalizedContent };
  }

  let endIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) {
    return { data: {}, content: normalizedContent };
  }

  const frontMatterLines = lines.slice(1, endIndex);
  const contentLines = lines.slice(endIndex + 1);

  const data = {};
  frontMatterLines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      data[key] = value;
    }
  });

  return {
    data,
    content: contentLines.join('\n')
  };
}

// Get all news items from the public/news directory
export async function getAllNews() {
  try {
    console.log('Fetching news index...');
    const response = await fetch('/news/index.json');
    console.log('Index response status:', response.status);

    if (!response.ok) {
      console.error('Failed to fetch news index:', response.status);
      return [];
    }

    const newsList = await response.json();
    console.log('News list:', newsList);

    const newsItems = await Promise.all(
      newsList.map(async (filename) => {
        const slug = filename.replace('.md', '');
        console.log('Loading news item:', slug);
        const newsItem = await getNewsBySlug(slug);
        return newsItem;
      })
    );

    const validNews = newsItems.filter(item => item !== null);
    console.log('Valid news items:', validNews.length);

    return validNews.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error loading news:', error);
    return [];
  }
}

// Get a specific news item by slug
export async function getNewsBySlug(slug) {
  try {
    console.log('Fetching news item:', slug);
    const response = await fetch(`/news/${slug}.md`);
    console.log('News item response status:', response.status);

    if (!response.ok) {
      console.error(`Failed to fetch news item ${slug}:`, response.status);
      return null;
    }

    const content = await response.text();
    console.log('News item content length:', content.length);

    const { data, content: markdown } = parseFrontMatter(content);
    console.log('News item frontmatter:', data);

    const html = marked(markdown);

    const newsItem = {
      slug,
      title: data.title,
      date: data.date,
      author: data.author || 'Dex Intelligence',
      excerpt: data.excerpt || '',
      readTime: data.readTime || '3 min read',
      content: html,
      ...data
    };

    console.log('Processed news item:', newsItem.title);
    return newsItem;
  } catch (error) {
    console.error(`Error loading news item ${slug}:`, error);
    return null;
  }
}

// Get news slugs for routing
export async function getNewsSlugs() {
  try {
    const response = await fetch('/news/index.json');
    if (!response.ok) {
      return [];
    }
    const newsList = await response.json();
    return newsList.map(filename => filename.replace('.md', ''));
  } catch (error) {
    console.error('Error loading news slugs:', error);
    return [];
  }
}
