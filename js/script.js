document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll-reveal effect for sections
    const sections = document.querySelectorAll('main section.fade-in'); // Target only sections with fade-in class

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once it's active
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('nav-open');
    });

    // Close nav menu when a link is clicked (for mobile)
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('nav-open')) {
                navMenu.classList.remove('nav-open');
            }
        });
    });

    // Fetch and display GitHub projects
    const githubProjectsContainer = document.getElementById('github-projects');
    const githubUsername = 'rohitkusharma'; // Replace with your GitHub username

    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc`)
        .then(response => response.json())
        .then(repos => {
            githubProjectsContainer.innerHTML = ''; // Clear loading message

            // Filter out forks and non-public repos, and limit to a reasonable number (e.g., 6 recent projects)
            const recentProjects = repos.filter(repo => !repo.fork && repo.private === false)
                                         .slice(0, 6);

            if (recentProjects.length === 0) {
                githubProjectsContainer.innerHTML = '<p>No public projects found or an error occurred.</p>';
                return;
            }

            recentProjects.forEach(repo => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project-item');
                projectElement.innerHTML = `
                    <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h3>
                    <p>${repo.description || 'No description provided.'}</p>
                    <div class="project-meta">
                        ${repo.language ? `<span class="language">${repo.language}</span>` : ''}
                        <span class="stars">⭐ ${repo.stargazers_count}</span>
                    </div>
                `;
                githubProjectsContainer.appendChild(projectElement);
            });
        })
        .catch(error => {
            console.error('Error fetching GitHub projects:', error);
            githubProjectsContainer.innerHTML = '<p>Failed to load GitHub projects. Please try again later.</p>';
        });
});
