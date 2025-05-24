import React, { useEffect, useState } from 'react';
import './BlogPost.css';
import BlogService from '../../blogs/BlogService';

const BlogPost = ({ slug, onBack, onNavigate }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      await BlogService.loadPosts();
      
      const foundPost = BlogService.getPostBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
        
        // Get related posts by tags
        const related = BlogService.getPublishedPosts()
          .filter(p => p.slug !== slug && 
                      p.data.tags.some(tag => foundPost.data.tags.includes(tag)))
          .slice(0, 3);
        setRelatedPosts(related);
      }
      setLoading(false);
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  const handleTagClick = (tag) => {
    // Navigate to blog list filtered by tag
    if (onNavigate) {
      onNavigate('blog', { filterTag: tag });
    }
  };

  const handleRelatedPostClick = (relatedSlug) => {
    // Navigate to another blog post
    if (onNavigate) {
      onNavigate('blogPost', { slug: relatedSlug });
    }
  };

  if (loading) {
    return (
      <div className="blog-post-container">
        <div className="blog-post-loading">
          <div className="loading-spinner"></div>
          <p>Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-post-container">
        <div className="blog-post-error">
          <h2>Blog Post Not Found</h2>
          <p>The blog post you're looking for doesn't exist or hasn't been published yet.</p>
          <button className="back-to-blog-btn" onClick={onBack}>
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <button className="back-to-blog-btn" onClick={onBack}>
        ← Back to Blog
      </button>
      
      <article className="blog-post">
        <header className="blog-post-header">
          <div className="post-meta">
            <span className="post-date">
              {new Date(post.data.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="post-read-time">{post.data.readTime}</span>
            {post.data.category && (
              <span className="post-category">{post.data.category}</span>
            )}
          </div>
          
          <h1 className="post-title">{post.data.title}</h1>
          
          <div className="post-excerpt">
            {post.data.excerpt}
          </div>
          
          <div className="post-tags">
            {post.data.tags.map((tag, index) => (
              <button 
                key={index} 
                className="tag-button"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          
          <div className="post-author">
            <span>By {post.data.author}</span>
            <span className="post-stats">{post.wordCount} words</span>
          </div>
        </header>
        
        <div 
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />
        
        {relatedPosts.length > 0 && (
          <aside className="related-posts">
            <h3>Related Articles</h3>
            <div className="related-posts-grid">
              {relatedPosts.map((relatedPost) => (
                <div 
                  key={relatedPost.slug} 
                  className="related-post-card"
                  onClick={() => handleRelatedPostClick(relatedPost.slug)}
                >
                  <h4>{relatedPost.data.title}</h4>
                  <p>{relatedPost.data.excerpt}</p>
                  <div className="related-post-meta">
                    <span>{new Date(relatedPost.data.date).toLocaleDateString()}</span>
                    <span>{relatedPost.data.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </article>
    </div>
  );
};

export default BlogPost; 