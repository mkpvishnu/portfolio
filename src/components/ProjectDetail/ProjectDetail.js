import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProjectDetail.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'; // For loading Readme

const ProjectDetail = ({ project, onClose }) => {
  const [readmeContent, setReadmeContent] = useState('');
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);
  const [readmeError, setReadmeError] = useState(null);

  useEffect(() => {
    if (project && project.name) {
      const fetchReadme = async () => {
        setIsLoadingReadme(true);
        setReadmeError(null);
        try {
          // Attempt to get the default branch's README
          // The GitHub API for repo content returns base64 encoded content
          const readmeUrl = `https://api.github.com/repos/${project.owner.login}/${project.name}/readme`;
          const response = await axios.get(readmeUrl, {
            headers: { Accept: 'application/vnd.github.v3.html+json' } // Request HTML version
          });
          setReadmeContent(response.data); // response.data is already HTML
        } catch (err) {
          console.error('Error fetching README:', err);
          setReadmeError('Could not load project README. It might not exist or there was a network issue.');
          setReadmeContent(''); // Clear any previous readme
        }
        setIsLoadingReadme(false);
      };
      fetchReadme();
    }
  }, [project]);

  if (!project) {
    return <p>No project selected.</p>;
  }

  // Format date nicely
  const lastUpdated = new Date(project.updated_at).toLocaleDateString();

  return (
    <section className="project-detail-section">
      <button onClick={onClose} className="back-button project-detail-back">← Back to Projects</button>
      <h2 className="project-title">{project.name}</h2>
      <p className="project-tagline">{project.description || 'No description available.'}</p>
      
      <div className="project-quick-info">
        <span><strong>Language:</strong> {project.language || 'N/A'}</span>
        <span><strong>Stars:</strong> {project.stargazers_count}</span>
        <span><strong>Forks:</strong> {project.forks_count}</span>
        <span><strong>Last Updated:</strong> {lastUpdated}</span>
      </div>

      <div className="project-links">
        <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="project-link github-link">
          View on GitHub
        </a>
        {project.homepage && (
          <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="project-link live-demo-link">
            Live Demo
          </a>
        )}
      </div>
      
      <div className="readme-container">
        <h3>Project README.md</h3>
        {isLoadingReadme && <LoadingSpinner size="small" />}
        {readmeError && <p className="readme-error">{readmeError}</p>}
        {!isLoadingReadme && !readmeError && readmeContent && (
          <div dangerouslySetInnerHTML={{ __html: readmeContent }} className="readme-content" />
        )}
        {!isLoadingReadme && !readmeError && !readmeContent && (
            <p>No README content loaded.</p>
        )}
      </div>
      {/* Add sections for Demos/Videos if applicable */}
    </section>
  );
};

export default ProjectDetail; 