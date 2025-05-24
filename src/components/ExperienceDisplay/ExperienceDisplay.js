import React, { useState, useEffect } from 'react';
import './ExperienceDisplay.css'; // New CSS file

// Helper functions (can be kept from ExperienceTimeline)
const parseDate = (dateStr) => {
  if (!dateStr || dateStr === 'Present') return null;
  return new Date(dateStr + '-01');
};

const formatPeriod = (period) => {
  if (!period) return '';
  const { start, end } = period;
  const startDate = parseDate(start);
  const startMonthYear = startDate ? startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : start;
  
  let endMonthYear = end;
  if (end === 'Present') {
    endMonthYear = 'Present';
  } else {
    const endDate = parseDate(end);
    endMonthYear = endDate ? endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : end;
  }
  return `${startMonthYear} - ${endMonthYear}`;
};

const ExperienceDisplay = ({ experienceData }) => {
  const [processedExperience, setProcessedExperience] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null); // {companyId, projectName}

  useEffect(() => {
    if (!experienceData || experienceData.length === 0) {
      setProcessedExperience([]);
      return;
    }

    const data = experienceData.map(companyExp => {
      // Sort projects within this company by their start date
      const sortedProjects = [...companyExp.projects].sort((a, b) => {
        const aStartDate = parseDate(a.projectPeriod.start);
        const bStartDate = parseDate(b.projectPeriod.start);
        if (!aStartDate && bStartDate) return 1;
        if (aStartDate && !bStartDate) return -1;
        if (!aStartDate && !bStartDate) return 0;
        return aStartDate - bStartDate; // Ascending sort by start date
      });

      return {
        ...companyExp,
        projects: sortedProjects, // Use the sorted projects
      };
    });

    setProcessedExperience(data);

  }, [experienceData]);

  const handleTileClick = (companyId, projectName) => {
    if (expandedProject && expandedProject.companyId === companyId && expandedProject.projectName === projectName) {
      setExpandedProject(null);
    } else {
      setExpandedProject({ companyId, projectName });
    }
  };
  
  if (processedExperience.length === 0) {
     if (!experienceData || experienceData.length === 0) {
        return <p className="no-data-message">No experience data to display.</p>;
     }
     return <p className="loading-message">Processing experience data...</p>;
  }

  return (
    <div className="experience-display-container">
      {processedExperience.map(companyExp => (
        <section key={companyExp.companyId || companyExp.company} className="company-section">
          <div className="company-header">
            {companyExp.companyId && (
              <img 
                src={`/data/${companyExp.companyId}.ico`} 
                alt={`${companyExp.company} logo`} 
                className="company-logo"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
            <div className="company-info">
              <h2 className="company-name">{companyExp.company}</h2>
              <p className="company-job-title">{companyExp.title}</p>
              <p className="company-overall-period">{formatPeriod(companyExp.overallPeriod)}</p>
            </div>
          </div>
          <div className="project-tiles-grid">
            {companyExp.projects.map((project, index) => (
              <div 
                key={`${project.projectName}-${index}`} 
                className={`project-tile ${expandedProject && expandedProject.companyId === companyExp.companyId && expandedProject.projectName === project.projectName ? 'expanded' : ''}`}
                onClick={() => handleTileClick(companyExp.companyId, project.projectName)}
              >
                <h3 className="project-name">{project.projectName}</h3>
                {/* Display role title for project if different from company title, or if specified */}
                {/* For now, assuming project.roleTitle might not be needed if companyExp.title covers it */}
                <p className="project-period"> 
                  <em>({formatPeriod(project.projectPeriod)})</em>
                </p>
                
                {expandedProject && expandedProject.companyId === companyExp.companyId && expandedProject.projectName === project.projectName && (
                  <ul className="project-details-list">
                    {project.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ExperienceDisplay; 
