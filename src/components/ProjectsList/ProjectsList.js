import React from 'react';
import './ProjectsList.css';

const ProjectsList = ({ projects, onProjectSelect }) => {
  if (!projects || projects.length === 0) {
    return <p className="no-projects-message">No projects to display at the moment. Check back later!</p>;
  }

  return (
    <section className="projects-list-section">
      <h2>My Projects</h2>
      <div className="project-tiles-container">
        {projects.map(project => (
          <div key={project.id} className="project-tile" onClick={() => onProjectSelect(project)}>
            {/* You might want a placeholder image if project.owner.avatar_url is not what you want */}
            {/* Or use a generic project icon */}
            {/* <img src={project.owner?.avatar_url || './default-project-icon.png'} alt={`${project.name} icon`} className="project-icon" /> */}
            <h3>{project.name}</h3>
            <p className="project-description">{project.description || 'No description available.'}</p>
            <div className="project-meta">
              <span className="project-language">{project.language || 'N/A'}</span>
              <span className="project-stars">★ {project.stargazers_count}</span>
            </div>
            {/* <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="view-project-link">View on GitHub</a> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsList; 