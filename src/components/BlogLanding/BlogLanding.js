import React from 'react';
import './BlogLanding.css';

const BlogLanding = ({ userProfile, onNavigate }) => {
  // Featured blog posts/articles (can be moved to portfolioData.json later)
  const featuredPosts = [
    {
      id: 1,
      title: "Building Robust AI Testing Frameworks at Scale",
      excerpt: "How I architected and developed a comprehensive AI testing framework using FastAPI that reduced testing time by 60% while improving accuracy metrics.",
      date: "2024-11-15",
      readTime: "8 min read",
      tags: ["AI Testing", "FastAPI", "Quality Assurance"],
      featured: true
    },
    {
      id: 2,
      title: "From Manual to Automated: Enterprise ML Pipeline Testing",
      excerpt: "A deep dive into testing machine learning pipelines at enterprise scale, covering validation frameworks and quality gates for production deployment.",
      date: "2024-10-22",
      readTime: "12 min read",
      tags: ["Machine Learning", "Testing", "DevOps"],
      featured: false
    },
    {
      id: 3,
      title: "Karate DSL: Revolutionizing API Testing Workflows",
      excerpt: "How I built a VS Code extension for Karate DSL that streamlines API testing workflows with features like bug tracking and JWT utilities.",
      date: "2024-09-18",
      readTime: "6 min read",
      tags: ["API Testing", "VS Code", "Karate DSL"],
      featured: false
    }
  ];

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
        <div className="blog-grid">
          {featuredPosts.map((post) => (
            <article key={post.id} className={`blog-card ${post.featured ? 'featured' : ''}`}>
              {post.featured && <div className="featured-badge">Featured</div>}
              <div className="blog-meta">
                <span className="blog-date">{new Date(post.date).toLocaleDateString()}</span>
                <span className="blog-read-time">{post.readTime}</span>
              </div>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="blog-tag">{tag}</span>
                ))}
              </div>
              <div className="blog-action">
                <span className="read-more">Coming Soon →</span>
              </div>
            </article>
          ))}
        </div>
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