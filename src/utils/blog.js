import { marked } from 'marked';

// Simple front-matter parser for browser use
function parseFrontMatter(content) {
  const lines = content.split('\n');
  
  if (lines[0] !== '---') {
    return { data: {}, content: content };
  }
  
  let endIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') {
      endIndex = i;
      break;
    }
  }
  
  if (endIndex === -1) {
    return { data: {}, content: content };
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

// Get all blog post files from the public/posts directory
export async function getAllPosts() {
  try {
    console.log('Fetching posts index...');
    const response = await fetch('/posts/index.json');
    console.log('Index response status:', response.status);
    
    if (!response.ok) {
      console.error('Failed to fetch index:', response.status);
      return [];
    }
    
    const postList = await response.json();
    console.log('Post list:', postList);
    
    const posts = await Promise.all(
      postList.map(async (filename) => {
        const slug = filename.replace('.md', '');
        console.log('Loading post:', slug);
        const post = await getPostBySlug(slug);
        return post;
      })
    );
    
    const validPosts = posts.filter(post => post !== null);
    console.log('Valid posts:', validPosts.length);
    
    return validPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

// Get a specific post by slug
export async function getPostBySlug(slug) {
  try {
    console.log('Fetching post:', slug);
    const response = await fetch(`/posts/${slug}.md`);
    console.log('Post response status:', response.status);
    
    if (!response.ok) {
      console.error(`Failed to fetch post ${slug}:`, response.status);
      return null;
    }
    
    const content = await response.text();
    console.log('Post content length:', content.length);
    
    const { data, content: markdown } = parseFrontMatter(content);
    console.log('Post frontmatter:', data);
    
    const html = marked(markdown);
    
    const post = {
      slug,
      title: data.title,
      date: data.date,
      author: data.author || 'Justin Mayne',
      excerpt: data.excerpt || '',
      readTime: data.readTime || '5 min read',
      content: html,
      ...data
    };
    
    console.log('Processed post:', post.title);
    return post;
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

// Get post slugs for routing
export async function getPostSlugs() {
  try {
    const response = await fetch('/posts/index.json');
    if (!response.ok) {
      return [];
    }
    const postList = await response.json();
    return postList.map(filename => filename.replace('.md', ''));
  } catch (error) {
    console.error('Error loading post slugs:', error);
    return [];
  }
}