import React from 'react';
import './BranchNavigation.css';

const BranchNavigation = ({ items, onSelect, isVisible, isHeaderExpanded }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <nav className={`branch-navigation ${isHeaderExpanded ? 'header-expanded' : 'header-collapsed'}`}>
      {items.map((item, index) => (
        <button 
          key={item.id}
          className={`branch-button branch-button-${index}`}
          onClick={() => onSelect(item.id)}
          style={{ '--branch-index': index }} // For staggered animations or positioning if needed
        >
          {item.icon && <span className="button-icon">{item.icon}</span>}
          <span className="button-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BranchNavigation; 