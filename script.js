document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const branchButtons = document.querySelectorAll('.branches button');
    const contentSections = document.querySelectorAll('.content-section');
    const profilePhotoImg = document.getElementById('profilePhoto');
    const profileNameH1 = document.getElementById('profileName');
    const profileTaglineP = document.getElementById('profileTagline');
    const contentArea = document.getElementById('contentArea');

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
    let currentOpenSectionId = null; 
    const animationDelay = 500; // ms, should match CSS transition duration for slides

    async function loadPortfolioData() {
        try {
            const response = await fetch('profile_data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            portfolioData = await response.json();
            renderData();
            contentArea.classList.add('content-hidden');
            contentArea.classList.remove('content-visible', 'content-slid-left');
        } catch (error) {
            console.error("Could not load portfolio data:", error);
            if (contentArea) {
                contentArea.innerHTML = `<p style="color: red; text-align: center;">Error loading portfolio data. Please check console or try again later.</p>`;
                contentArea.classList.remove('content-hidden');
                contentArea.classList.add('content-visible');
            }
        }
    }

    function renderData() {
        if (!portfolioData) return;
        if (portfolioData.profile) {
            profilePhotoImg.src = portfolioData.profile.photo || 'data/placeholder-profile.jpg';
            profilePhotoImg.alt = portfolioData.profile.name ? `${portfolioData.profile.name}'s photo` : 'Profile Photo';
            profileNameH1.textContent = portfolioData.profile.name || 'Your Name';
            profileTaglineP.textContent = portfolioData.profile.tagline || 'Your Tagline';
        }
        if (portfolioData.education && educationContainer) {
            educationContainer.innerHTML = portfolioData.education.map(edu => `
                <article>
                    <h3>${edu.degree}</h3>
                    <p><em>${edu.institution} (${edu.period})</em></p>
                    <p>${edu.details}</p>
                </article>
            `).join('');
        }
        if (portfolioData.experience && experienceContainer) {
            experienceContainer.innerHTML = portfolioData.experience.map(exp => `
                <article>
                    <h3>${exp.title} at ${exp.company}</h3>
                    <p><em>${exp.period}</em></p>
                    <ul>${exp.responsibilities.map(res => `<li>${res}</li>`).join('')}</ul>
                </article>
            `).join('');
        }
        if (portfolioData.projects && projectTilesContainer) {
            projectTilesContainer.innerHTML = portfolioData.projects.map(proj => `
                <div class="tile" data-project-id="${proj.id}">
                    <img src="${proj.thumbnail || 'data/placeholder-project.jpg'}" alt="${proj.name}" style="width:100%; height: 120px; object-fit: cover; border-radius: 3px; margin-bottom: 10px;">
                    <h4>${proj.name}</h4>
                </div>
            `).join('');
            addProjectTileListeners(); 
        }
        if (portfolioData.contact && contactContainer) {
            contactContainer.innerHTML = `
                <p>Email: <a href="mailto:${portfolioData.contact.email}">${portfolioData.contact.email}</a></p>
                <p>LinkedIn: <a href="${portfolioData.contact.linkedin}" target="_blank">${portfolioData.contact.linkedin}</a></p>
                <p>GitHub: <a href="${portfolioData.contact.github}" target="_blank">${portfolioData.contact.github}</a></p>
                ${portfolioData.contact.twitter ? `<p>Twitter: <a href="${portfolioData.contact.twitter}" target="_blank">${portfolioData.contact.twitter}</a></p>` : ''}
            `;
        }
    }

    function hideAllInternalContentSections() {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
    }

    function openMainSection(sectionId) {
        currentOpenSectionId = sectionId;
        hideAllInternalContentSections();
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        projectDetailSection.classList.remove('active'); // Ensure project detail is not shown

        header.classList.add('photo-slid-left');
        contentArea.classList.remove('content-hidden', 'content-slid-left');
        contentArea.classList.add('content-visible');
    }

    function closeAllContent() {
        header.classList.remove('photo-slid-left');
        contentArea.classList.remove('content-visible');
        contentArea.classList.add('content-hidden');
        currentOpenSectionId = null;
        // It might be good to also hide internal sections after a delay
        setTimeout(() => {
            hideAllInternalContentSections();
            projectDetailSection.classList.remove('active');
        }, animationDelay);
    }

    branchButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from bubbling to photo if branches are over it
            const sectionId = button.dataset.section;
            openMainSection(sectionId);
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
        hideAllInternalContentSections(); // Clear main sections like 'Education', 'Projects' list etc.
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

        // Slide out current content (e.g. project list) and slide in project detail
        contentArea.classList.add('content-slid-left');
        contentArea.classList.remove('content-visible');

        setTimeout(() => {
            projectDetailSection.classList.add('active');
            contentArea.classList.remove('content-slid-left', 'content-hidden');
            contentArea.classList.add('content-visible');
            header.classList.add('photo-slid-left'); // Ensure header is slid
        }, animationDelay);
    }

    if (backToProjectsButton) {
        backToProjectsButton.addEventListener('click', () => {
            // Slide out project detail and slide in project list (which is a main section)
            contentArea.classList.add('content-slid-left');
            contentArea.classList.remove('content-visible');

            setTimeout(() => {
                projectDetailSection.classList.remove('active');
                openMainSection('projects'); // Reopen the main projects section
            }, animationDelay);
        });
    }
    
    profilePhotoImg.addEventListener('click', () => {
        if (header.classList.contains('photo-slid-left')) {
             closeAllContent(); 
        }
    });

    loadPortfolioData();
});
