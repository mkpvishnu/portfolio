import React from 'react';
import './SkillsDisplay.css';

const SkillsDisplay = ({ skillsData }) => {
  if (!skillsData) {
    return <p className="no-skills-message">No skills data available.</p>;
  }

  const skillCategories = Object.entries(skillsData);

  return (
    <div className="skills-display-container">
      <div className="skills-grid">
        {skillCategories.map(([categoryKey, category]) => (
          <div key={categoryKey} className="skill-category">
            <h3 className="skill-category-title">{category.title}</h3>
            <div className="skill-items">
              {category.items.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsDisplay; 