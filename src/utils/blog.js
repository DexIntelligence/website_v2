import { marked } from 'marked';
import matter from 'gray-matter';

// Get all blog post files from the public/posts directory
export async function getAllPosts() {
  try {
    const response = await fetch('/posts/index.json');
    if (!response.ok) {
      return [];
    }
    const postList = await response.json();
    
    const posts = await Promise.all(
      postList.map(async (filename) => {
        const post = await getPostBySlug(filename.replace('.md', ''));
        return post;
      })
    );
    
    return posts.filter(post => post !== null).sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

// Get a specific post by slug
export async function getPostBySlug(slug) {
  try {
    const response = await fetch(`/posts/${slug}.md`);
    if (!response.ok) {
      return null;
    }
    
    const content = await response.text();
    const { data, content: markdown } = matter(content);
    
    const html = marked(markdown);
    
    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author || 'Justin Mayne',
      excerpt: data.excerpt || '',
      readTime: data.readTime || '5 min read',
      content: html,
      ...data
    };
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