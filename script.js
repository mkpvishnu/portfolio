document.addEventListener('DOMContentLoaded', () => {
    const branchButtons = document.querySelectorAll('.branches button');
    const contentSections = document.querySelectorAll('.content-section');
    const profilePhotoImg = document.getElementById('profilePhoto');
    const profileNameH1 = document.getElementById('profileName');
    const profileTaglineP = document.getElementById('profileTagline');

    const educationContainer = document.getElementById('educationContainer');
    const experienceContainer = document.getElementById('experienceContainer');
    const projectTilesContainer = document.getElementById('projectTilesContainer');
    const contactContainer = document.getElementById('contactContainer');

    const projectDetailSection = document.getElementById('project-detail');
    const projectDetailName = document.getElementById('projectDetailName');
    const projectDetailDescription = document.getElementById('projectDetailDescription');
    const projectDetailTechnologies = document.getElementById('projectDetailTechnologies');
    const projectDetailRepoUrl = document.getElementById('projectDetailRepoUrl');
    const projectDetailLiveDemoUrl = document.getElementById('projectDetailLiveDemoUrl');
    const projectDetailImage = document.getElementById('projectDetailImage');
    const backToProjectsButton = document.getElementById('backToProjects');

    let portfolioData = {};

    async function loadPortfolioData() {
        try {
            const response = await fetch('profile_data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            portfolioData = await response.json();
            renderData();
        } catch (error) {
            console.error("Could not load portfolio data:", error);
            const contentArea = document.getElementById('contentArea');
            if (contentArea) {
                contentArea.innerHTML = `<p style="color: red; text-align: center;">Error loading portfolio data. Please check console or try again later.</p>`;
            }
        }
    }

    function renderData() {
        if (!portfolioData) return;

        // Profile
        if (portfolioData.profile) {
            profilePhotoImg.src = portfolioData.profile.photo || 'data/placeholder-profile.jpg'; // Default placeholder
            profilePhotoImg.alt = portfolioData.profile.name ? `${portfolioData.profile.name}'s photo` : 'Profile Photo';
            profileNameH1.textContent = portfolioData.profile.name || 'Your Name';
            profileTaglineP.textContent = portfolioData.profile.tagline || 'Your Tagline';
        }

        // Education
        if (portfolioData.education && educationContainer) {
            educationContainer.innerHTML = portfolioData.education.map(edu => `
                <article>
                    <h3>${edu.degree}</h3>
                    <p><em>${edu.institution} (${edu.period})</em></p>
                    <p>${edu.details}</p>
                </article>
            `).join('');
        }

        // Experience
        if (portfolioData.experience && experienceContainer) {
            experienceContainer.innerHTML = portfolioData.experience.map(exp => `
                <article>
                    <h3>${exp.title} at ${exp.company}</h3>
                    <p><em>${exp.period}</em></p>
                    <ul>${exp.responsibilities.map(res => `<li>${res}</li>`).join('')}</ul>
                </article>
            `).join('');
        }

        // Projects
        if (portfolioData.projects && projectTilesContainer) {
            projectTilesContainer.innerHTML = portfolioData.projects.map(proj => `
                <div class="tile" data-project-id="${proj.id}">
                    <img src="${proj.thumbnail || 'data/placeholder-project.jpg'}" alt="${proj.name}" style="width:100%; height: 120px; object-fit: cover; border-radius: 3px; margin-bottom: 10px;">
                    <h4>${proj.name}</h4>
                </div>
            `).join('');
            addProjectTileListeners(); // Re-attach listeners after new tiles are rendered
        }

        // Contact
        if (portfolioData.contact && contactContainer) {
            contactContainer.innerHTML = `
                <p>Email: <a href="mailto:${portfolioData.contact.email}">${portfolioData.contact.email}</a></p>
                <p>LinkedIn: <a href="${portfolioData.contact.linkedin}" target="_blank">${portfolioData.contact.linkedin}</a></p>
                <p>GitHub: <a href="${portfolioData.contact.github}" target="_blank">${portfolioData.contact.github}</a></p>
                ${portfolioData.contact.twitter ? `<p>Twitter: <a href="${portfolioData.contact.twitter}" target="_blank">${portfolioData.contact.twitter}</a></p>` : ''}
            `;
        }
    }

    function hideAllSections() {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
    }

    branchButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.dataset.section;
            hideAllSections();
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            // If navigating to 'projects', ensure project detail is hidden
            if (sectionId === 'projects') {
                 projectDetailSection.classList.remove('active');
            } else {
                 // If navigating to any other section from project detail, hide project detail
                 if(projectDetailSection.classList.contains('active')){
                    projectDetailSection.classList.remove('active');
                 }
            }
        });
    });

    function addProjectTileListeners() {
        const projectTiles = document.querySelectorAll('#projectTilesContainer .tile');
        projectTiles.forEach(tile => {
            tile.addEventListener('click', () => {
                const projectId = tile.dataset.projectId;
                const projectData = portfolioData.projects.find(p => p.id === projectId);
                if (projectData) {
                    displayProjectDetails(projectData);
                }
            });
        });
    }

    function displayProjectDetails(project) {
        hideAllSections(); 
        projectDetailName.textContent = project.name;
        projectDetailDescription.textContent = project.description;
        projectDetailTechnologies.textContent = project.technologies.join(', ');
        
        projectDetailRepoUrl.href = project.repoUrl;
        projectDetailRepoUrl.style.display = project.repoUrl ? 'inline-block' : 'none';

        projectDetailLiveDemoUrl.href = project.liveDemoUrl;
        if (project.liveDemoUrl) {
            projectDetailLiveDemoUrl.style.display = 'inline-block';
            projectDetailLiveDemoUrl.textContent = 'View Live Demo';
        } else {
            projectDetailLiveDemoUrl.style.display = 'none';
        }

        projectDetailImage.src = project.thumbnail || 'data/placeholder-project.jpg'; 
        projectDetailImage.alt = project.name + " screenshot";
        projectDetailImage.style.display = project.thumbnail ? 'block' : 'none';
        
        projectDetailSection.classList.add('active');
    }

    if (backToProjectsButton) {
        backToProjectsButton.addEventListener('click', () => {
            projectDetailSection.classList.remove('active');
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.classList.add('active');
            }
        });
    }

    loadPortfolioData();
});
