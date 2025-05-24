import React from 'react';
import './ContentDisplay.css';
import ProjectsList from '../ProjectsList/ProjectsList';
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import ExperienceDisplay from '../ExperienceDisplay/ExperienceDisplay';
import SkillsDisplay from '../SkillsDisplay/SkillsDisplay';
import BlogLanding from '../BlogLanding/BlogLanding';
import BlogPost from '../BlogPost/BlogPost';

const ContentDisplay = ({
  activeSection,
  educationData,
  skillsData,
  experienceData,
  projectsData,
  contactData,
  selectedProject,
  onProjectSelect,
  onClose, // To handle back/close actions within content
  isHeaderExpanded,
  userProfile,
  onSectionSelect, // Add this prop to handle navigation from blog landing
  sectionParams, // Add this to handle parameters like blog slug
}) => {
  let content = null;

  // Show BlogLanding when header is expanded (default state)
  if (isHeaderExpanded) {
    return (
      <main className={`content-display blog-landing-container ${isHeaderExpanded ? 'header-expanded' : 'header-collapsed'}`}>
        <BlogLanding userProfile={userProfile} onNavigate={onSectionSelect} />
      </main>
    );
  }

  switch (activeSection) {
    case 'blog':
      content = <BlogLanding userProfile={userProfile} onNavigate={onSectionSelect} />;
      break;
    case 'blogPost':
      content = (
        <BlogPost 
          slug={sectionParams?.slug} 
          onBack={() => onSectionSelect('blog')}
          onNavigate={onSectionSelect}
        />
      );
      break;
    case 'blogList':
      // For now, redirect to blog landing - later we can create a dedicated BlogList component
      content = <BlogLanding userProfile={userProfile} onNavigate={onSectionSelect} />;
      break;
    case 'education':
      content = (
        <section className="content-section education-section">
          <h2>Education</h2>
          {educationData.map((edu, index) => (
            <article key={index} className="education-item">
              <h3>{edu.degree}</h3>
              <p className="institution-period">{edu.institution} ({edu.period})</p>
              <p>{edu.details}</p>
            </article>
          ))}
        </section>
      );
      break;
    case 'skills':
      content = (
        <section className="content-section skills-section">
          <h2>Skills & Technologies</h2>
          <SkillsDisplay skillsData={skillsData} />
        </section>
      );
      break;
    case 'experience':
      content = (
        <section className="content-section experience-section">
          <h2>Experience</h2>
          <ExperienceDisplay experienceData={experienceData} />
        </section>
      );
      break;
    case 'projects':
      content = <ProjectsList projects={projectsData} onProjectSelect={onProjectSelect} />;
      break;
    case 'projectDetail':
      content = selectedProject ? 
        <ProjectDetail project={selectedProject} onClose={() => onProjectSelect(null)} /> :
        <p>Project not found. Please go back to projects.</p>; // Fallback
      break;
    case 'contact':
        content = (
            <section className="content-section contact-section">
              <h2>Contact Me</h2>
              <div className="contact-grid">
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <h3>Email</h3>
                  <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">💼</div>
                  <h3>LinkedIn</h3>
                  <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer">View Profile</a>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">💻</div>
                  <h3>GitHub</h3>
                  <a href={contactData.github} target="_blank" rel="noopener noreferrer">View Profile</a>
                </div>
              </div>
            </section>
        );
        break;
    default:
      // Fallback content
      content = <BlogLanding userProfile={userProfile} onNavigate={onSectionSelect} />;
      break;
  }

  return (
    <main className={`content-display ${activeSection ? 'anmt-show' : 'anmt-hide'} ${isHeaderExpanded ? 'header-expanded' : 'header-collapsed'}`}>
      {activeSection && activeSection !== 'projectDetail' && activeSection !== 'projects' && activeSection !== 'blog' && activeSection !== 'blogPost' && activeSection !== 'blogList' && (
        <button onClick={onClose} className="back-button main-back-button">Close</button>
      )}
      {content}
    </main>
  );
};

export default ContentDisplay; 