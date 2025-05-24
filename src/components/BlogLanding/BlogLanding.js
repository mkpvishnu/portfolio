import React, { useEffect, useState } from 'react';
import './BlogLanding.css';
import BlogService from '../../blogs/BlogService';

const BlogLanding = ({ userProfile, onNavigate }) => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogPosts = async () => {
      setLoading(true);
      try {
        await BlogService.loadPosts();
        
        // Get featured posts (up to 3)
        const featured = BlogService.getFeaturedPosts().slice(0, 1);
        setFeaturedPosts(featured);
        
        // Get recent posts (up to 3, excluding featured)
        const recent = BlogService.getRecentPosts(4)
          .filter(post => !featured.some(fp => fp.slug === post.slug))
          .slice(0, 2);
        setRecentPosts(recent);
        
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  const highlights = [
    {
      icon: "🚀",
      title: "2.5+ Years at Freshworks",
      description: "Leading AI/ML testing initiatives across enterprise platforms"
    },
    {
      icon: "🔬",
      title: "AI Testing Specialist",
      description: "Developed frameworks serving millions of customer interactions"
    },
    {
      icon: "⚡",
      title: "Performance Impact",
      description: "Reduced production incidents by 40% through comprehensive testing"
    },
    {
      icon: "🛠️",
      title: "Open Source Contributor",
      description: "Built VS Code extensions and testing utilities used by developers"
    }
  ];

  const handleContactClick = () => {
    if (onNavigate) {
      onNavigate('contact');
    }
  };

  const handleProjectsClick = () => {
    if (onNavigate) {
      onNavigate('projects');
    }
  };

  const handleBlogPostClick = (slug) => {
    if (onNavigate) {
      onNavigate('blogPost', { slug });
    }
  };

  const handleViewAllBlogsClick = () => {
    if (onNavigate) {
      onNavigate('blogList');
    }
  };

  // Combine featured and recent posts for display
  const allDisplayPosts = [...featuredPosts, ...recentPosts];

  return (
    <div className="blog-landing">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to My <span className="gradient-text">Tech Journey</span>
            </h1>
            <p className="hero-subtitle">
              Software Development Engineer in Test specializing in AI/ML testing, automation frameworks, 
              and enterprise platform engineering. Sharing insights from building scalable testing solutions 
              at Freshworks and beyond.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">2.5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">7+</span>
                <span className="stat-label">Major Projects</span>
              </div>
              <div className="stat">
                <span className="stat-number">40%</span>
                <span className="stat-label">Incident Reduction</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src={userProfile?.avatarUrl || '/data/profile_photo.jpg'} 
              alt={userProfile?.name || 'Profile'} 
              className="profile-image"
            />
            <div className="image-backdrop"></div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="highlights-section">
        <h2 className="section-title">Professional Highlights</h2>
        <div className="highlights-grid">
          {highlights.map((highlight, index) => (
            <div key={index} className="highlight-card">
              <div className="highlight-icon">{highlight.icon}</div>
              <h3 className="highlight-title">{highlight.title}</h3>
              <p className="highlight-description">{highlight.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="blog-section">
        <h2 className="section-title">Latest Articles & Insights</h2>
        
        {loading ? (
          <div className="blog-loading">
            <div className="loading-spinner"></div>
            <p>Loading latest articles...</p>
          </div>
        ) : allDisplayPosts.length > 0 ? (
          <>
            <div className="blog-grid">
              {allDisplayPosts.map((post) => (
                <article 
                  key={post.slug} 
                  className={`blog-card ${post.data.featured ? 'featured' : ''}`}
                  onClick={() => handleBlogPostClick(post.slug)}
                >
                  {post.data.featured && <div className="featured-badge">Featured</div>}
                  <div className="blog-meta">
                    <span className="blog-date">
                      {new Date(post.data.date).toLocaleDateString()}
                    </span>
                    <span className="blog-read-time">{post.data.readTime}</span>
                  </div>
                  <h3 className="blog-title">{post.data.title}</h3>
                  <p className="blog-excerpt">{post.data.excerpt}</p>
                  <div className="blog-tags">
                    {post.data.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="blog-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="blog-action">
                    <span className="read-more">Read More →</span>
                  </div>
                </article>
              ))}
            </div>
            
            {/* View All Blogs Button */}
            <div className="view-all-blogs">
              <button className="view-all-btn" onClick={handleViewAllBlogsClick}>
                View All Articles
              </button>
            </div>
          </>
        ) : (
          <div className="no-posts-message">
            <h3>Coming Soon!</h3>
            <p>I'm working on some exciting articles about AI testing, automation frameworks, and enterprise development. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Let's Build Something Amazing Together</h2>
          <p className="cta-description">
            Interested in AI/ML testing, automation frameworks, or enterprise solutions? 
            I'd love to connect and discuss how we can solve complex challenges together.
          </p>
          <div className="cta-buttons">
            <button className="cta-button primary" onClick={handleContactClick}>Get In Touch</button>
            <button className="cta-button secondary" onClick={handleProjectsClick}>View My Work</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogLanding; 