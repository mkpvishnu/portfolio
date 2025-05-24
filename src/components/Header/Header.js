import React, { useState } from 'react';
import './Header.css';
import BranchNavigation from '../BranchNavigation/BranchNavigation';

const Header = ({ userProfile, onSectionSelect, onLogoClick, isExpanded }) => {
  const [isHovering, setIsHovering] = useState(false);

  const navItems = [
    { id: 'blog', label: 'Blog', icon: '📝' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '💻' },
    { id: 'contact', label: 'Contact', icon: '📞' },
  ];

  return (
    <header 
      className={`portfolio-header ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="profile-intro">
        <img 
          src={userProfile?.avatarUrl || '/data/profile_photo.jpg'} 
          alt={userProfile?.name || 'User'}
          className="profile-photo" 
          onClick={onLogoClick} // Clicking photo closes content/expands header
        />
        {isExpanded && (
          <>
            <h1>{userProfile?.name || 'Your Name'}</h1>
            <p className="tagline">{userProfile?.bio || 'Software Development Engineer in Test'}</p>
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