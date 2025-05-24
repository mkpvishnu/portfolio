import React, { useState } from 'react';
import './Header.css';
import BranchNavigation from '../BranchNavigation/BranchNavigation';

const Header = ({ userProfile, onSectionSelect, onLogoClick, isExpanded }) => {
  const [isHovering, setIsHovering] = useState(false);

  const navItems = [
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header 
      className={`portfolio-header ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="profile-intro">
        <img 
          src={userProfile?.avatarUrl || './default-avatar.png'} // Provide a default avatar
          alt={userProfile?.name || 'User'}
          className="profile-photo" 
          onClick={onLogoClick} // Clicking photo closes content/expands header
        />
        {isExpanded && (
          <>
            <h1>{userProfile?.name || 'Your Name'}</h1>
            <p className="tagline">{userProfile?.bio || 'Your professional tagline here.'}</p>
          </>
        )}
      </div>
      {(isHovering || !isExpanded) && (
         <BranchNavigation 
            items={navItems} 
            onSelect={onSectionSelect} 
            isVisible={isHovering || !isExpanded} // Branches visible on hover or when header is collapsed
            isHeaderExpanded={isExpanded}
        />
      )}
    </header>
  );
};

export default Header; 