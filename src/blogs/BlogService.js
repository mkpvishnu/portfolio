import matter from 'gray-matter';
import { marked } from 'marked';

class BlogService {
  constructor() {
    this.posts = [];
    this.loaded = false;
  }

  // Load all blog posts dynamically
  async loadPosts() {
    if (this.loaded) return this.posts;

    try {
      // Define the blog posts manually since require.context doesn't work as expected
      const postFiles = [
        { path: '2024-11-15-ai-testing-frameworks.md', slug: 'ai-testing-frameworks' },
        { path: '2024-10-22-ml-pipeline-testing.md', slug: 'ml-pipeline-testing' },
        { path: '2024-09-18-karate-dsl-extension.md', slug: 'karate-dsl-extension' }
      ];
      
      this.posts = await Promise.all(
        postFiles.map(async (file) => {
          try {
            const content = await this.loadPostContent(file.path);
            return this.parsePost(content, file.slug);
          } catch (error) {
            console.error(`Error loading post ${file.path}:`, error);
            return null;
          }
        })
      );

      // Filter out failed posts
      this.posts = this.posts.filter(post => post !== null);

      // Sort posts by date (newest first)
      this.posts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
      
      this.loaded = true;
      return this.posts;
    } catch (error) {
      console.error('Error loading blog posts:', error);
      return [];
    }
  }

  // Load content from markdown file using fetch
  async loadPostContent(filename) {
    try {
      // Try to fetch from the public directory first
      const response = await fetch(`/blog-posts/${filename}`);
      if (response.ok) {
        return await response.text();
      }
      
      // If that fails, try importing as a static asset
      const module = await import(`./posts/${filename}`);
      if (typeof module.default === 'string') {
        return module.default;
      }
      
      // If it's a URL, fetch it
      if (typeof module.default === 'string' && module.default.startsWith('/')) {
        const assetResponse = await fetch(module.default);
        return await assetResponse.text();
      }
      
      throw new Error(`Could not load content for ${filename}`);
    } catch (error) {
      console.error(`Error loading ${filename}:`, error);
      throw error;
    }
  }

  // Extract slug from file path
  extractSlugFromPath(path) {
    return path.replace('./posts/', '').replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  }

  // Parse markdown content with frontmatter
  parsePost(content, slug) {
    const { data, content: markdownContent } = matter(content);
    
    // Configure marked for better parsing
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: true,
      mangle: false,
    });

    const htmlContent = marked(markdownContent);
    
    return {
      slug,
      data: {
        ...data,
        published: data.published !== false, // Default to published
        featured: data.featured || false,
        readTime: data.readTime || this.calculateReadTime(markdownContent),
        excerpt: data.excerpt || this.generateExcerpt(markdownContent),
        tags: data.tags || [],
        author: data.author || 'Pragadeshwar Vishnu',
      },
      content: markdownContent,
      htmlContent,
      wordCount: this.countWords(markdownContent),
    };
  }

  // Calculate estimated read time
  calculateReadTime(content) {
    const wordsPerMinute = 200;
    const wordCount = this.countWords(content);
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }

  // Count words in content
  countWords(content) {
    return content.trim().split(/\s+/).length;
  }

  // Generate excerpt from content
  generateExcerpt(content, maxLength = 150) {
    const plainText = content.replace(/[#*`_]/g, '').replace(/\n/g, ' ');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
  }

  // Get published posts only
  getPublishedPosts() {
    return this.posts.filter(post => post.data.published);
  }

  // Get featured posts
  getFeaturedPosts() {
    return this.getPublishedPosts().filter(post => post.data.featured);
  }

  // Get posts by tag
  getPostsByTag(tag) {
    return this.getPublishedPosts().filter(post => 
      post.data.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  // Get post by slug
  getPostBySlug(slug) {
    return this.posts.find(post => post.slug === slug);
  }

  // Get all unique tags
  getAllTags() {
    const tags = new Set();
    this.getPublishedPosts().forEach(post => {
      post.data.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }

  // Search posts
  searchPosts(query) {
    const searchQuery = query.toLowerCase();
    return this.getPublishedPosts().filter(post => 
      post.data.title.toLowerCase().includes(searchQuery) ||
      post.data.excerpt.toLowerCase().includes(searchQuery) ||
      post.data.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
      post.content.toLowerCase().includes(searchQuery)
    );
  }

  // Get recent posts
  getRecentPosts(limit = 5) {
    return this.getPublishedPosts().slice(0, limit);
  }

  // Get posts for a specific year
  getPostsByYear(year) {
    return this.getPublishedPosts().filter(post => 
      new Date(post.data.date).getFullYear() === year
    );
  }

  // Get all years with posts
  getYearsWithPosts() {
    const years = new Set();
    this.getPublishedPosts().forEach(post => {
      years.add(new Date(post.data.date).getFullYear());
    });
    return Array.from(years).sort((a, b) => b - a);
  }
}

// Export singleton instance
const blogService = new BlogService();
export default blogService; 