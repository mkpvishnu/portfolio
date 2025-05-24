import React from 'react';
import './ContentDisplay.css';
import ProjectsList from '../ProjectsList/ProjectsList';
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import ExperienceDisplay from '../ExperienceDisplay/ExperienceDisplay';

const ContentDisplay = ({
  activeSection,
  educationData,
  experienceData,
  projectsData,
  contactData,
  selectedProject,
  onProjectSelect,
  onClose, // To handle back/close actions within content
  isHeaderExpanded,
}) => {
  let content = null;

  if (isHeaderExpanded) { // If header is expanded, no content is shown here
    return <main className={`content-display anmt-hide ${isHeaderExpanded ? 'header-expanded' : 'header-collapsed'}`}></main>;
  }

  switch (activeSection) {
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
              <p><strong>Email:</strong> <a href={`mailto:${contactData.email}`}>{contactData.email}</a></p>
              <p><strong>LinkedIn:</strong> <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer">View Profile</a></p>
              <p><strong>GitHub:</strong> <a href={contactData.github} target="_blank" rel="noopener noreferrer">View Profile</a></p>
              {/* Add more contact methods as needed */}
            </section>
        );
        break;
    default:
      // No section selected, or header is expanded
      // The main return handles the isHeaderExpanded case already
      break;
  }

  return (
    <main className={`content-display ${activeSection ? 'anmt-show' : 'anmt-hide'} ${isHeaderExpanded ? 'header-expanded' : 'header-collapsed'}`}>
      {activeSection && activeSection !== 'projectDetail' && activeSection !== 'projects' && (
        <button onClick={onClose} className="back-button main-back-button">← Back</button>
      )}
      {content}
    </main>
  );
};

export default ContentDisplay; 