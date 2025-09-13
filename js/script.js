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
    const sections = document.querySelectorAll('main section'); // Target all sections within main

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
        // Only apply fade-in to sections that are not the hero section
        // The hero section should be visible by default
        if (!section.classList.contains('hero')) {
            section.classList.add('fade-in'); // Start invisible
        }
        observer.observe(section);
    });
});