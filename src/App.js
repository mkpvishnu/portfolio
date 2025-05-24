import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header/Header';
import ContentDisplay from './components/ContentDisplay/ContentDisplay';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import portfolioData from './portfolioData.json'; // Import the JSON data

// Configuration
const GITHUB_USERNAME = 'mkpvishnu'; // Replace with your GitHub username

function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [activeSection, setActiveSection] = useState(null); // Start with no section selected
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true); // Start with header expanded

  const GITHUB_API_BASE_URL = 'https://api.github.com';

  // Fetch GitHub Profile
  const fetchGitHubProfile = useCallback(async () => {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${GITHUB_USERNAME}`);
      setUserProfile({
        name: response.data.name || response.data.login,
        avatarUrl: response.data.avatar_url,
        bio: response.data.bio,
        githubUrl: response.data.html_url,
        // Add other profile details as needed
      });
    } catch (err) {
      console.error('Error fetching GitHub profile:', err);
      setError('Failed to load GitHub profile information.');
      // Keep userProfile as null or set a default
    }
  }, []);

  // Fetch GitHub Repos
  const fetchGitHubRepos = useCallback(async () => {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
      // Filter out forks if desired, or sort/limit them
      setRepos(response.data.filter(repo => !repo.fork).slice(0, 10)); // Example: top 10 non-forked repos
    } catch (err) {
      console.error('Error fetching GitHub repos:', err);
      setError('Failed to load projects. Please check the console.');
      // Keep repos as an empty array
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    Promise.all([fetchGitHubProfile(), fetchGitHubRepos()])
      .finally(() => setIsLoading(false));
  }, [fetchGitHubProfile, fetchGitHubRepos]);

  const handleSectionSelect = (section) => {
    setSelectedProject(null); // Clear selected project when changing main sections
    if (activeSection === section && !isHeaderExpanded) {
      // If clicking the same section button and content is shown, hide content & expand header
      setIsHeaderExpanded(true);
      setActiveSection(null);
    } else {
      setActiveSection(section);
      setIsHeaderExpanded(false); // Collapse header to show content
    }
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setActiveSection('projectDetail'); // Special section for project details
    setIsHeaderExpanded(false); // Ensure header is collapsed
  };

  const handleCloseContent = () => {
    setActiveSection(null);
    setSelectedProject(null);
    setIsHeaderExpanded(true); // Expand header
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Use imported data, but allow dynamic GitHub URL for contact
  const staticData = {
    ...portfolioData,
    contact: {
      ...portfolioData.contact,
      github: userProfile?.githubUrl || portfolioData.contact.github, // Prioritize fetched URL
    },
  };

  return (
    <div className={`App ${!isHeaderExpanded ? 'content-visible' : ''}`}>
      <Header 
        userProfile={userProfile}
        onSectionSelect={handleSectionSelect} 
        onLogoClick={handleCloseContent} // Clicking logo/photo closes content
        isExpanded={isHeaderExpanded}
      />
      <ContentDisplay
        activeSection={activeSection}
        educationData={staticData.education}
        skillsData={staticData.skills}
        experienceData={staticData.experience}
        projectsData={repos} // From GitHub API
        contactData={staticData.contact} // Added contact data
        selectedProject={selectedProject}
        onProjectSelect={handleProjectSelect} // Pass this down for project list to use
        onClose={handleCloseContent} // For back buttons within content display
        isHeaderExpanded={isHeaderExpanded}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default App; 