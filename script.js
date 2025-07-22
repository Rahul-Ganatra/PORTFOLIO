// All JavaScript from index.html <script> tags goes here.
// ... (Typed.js initialization, fetchGitHubProjects, IntersectionObserver, nav wheel logic, etc.) ... 

// Typed.js initialization
var typed = new Typed('#typed-text', {
    strings: [
        'HELLO, I AM <span class="rahul">RAHUL</span>',
        'DATA <span class="scientist">SCIENCE</span>',
        'DATA <span class="analyst">ANALYST</span>',
        'FLUTTER <span class="developer">DEVELOPER</span>',
        'WELCOME TO MY <span class="site">SITE</span>'
    ],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 1000,
    startDelay: 500,
    loop: true,
    contentType: 'html'
});

// GitHub Projects Fetch (currently not used, but included for completeness)
function fetchGitHubProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) {
        console.error("Projects container not found!");
        return;
    }
    fetch('https://api.github.com/users/Rahul-Ganatra/repos')
        .then(response => response.json())
        .then(data => {
            projectsContainer.innerHTML = '';
            data.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.innerHTML = `<h3>${project.name}</h3><p>${project.description}</p>`;
                projectsContainer.appendChild(projectElement);
            });
        })
        .catch(error => {
            console.error("Error fetching projects:", error);
        });
}
// document.addEventListener('DOMContentLoaded', fetchGitHubProjects); // Uncomment if you add a #projects-container

// Intersection Observer for fade-in animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Active nav link handling
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for Safari and other browsers that don't support scroll-behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = navLinks.querySelectorAll('a');

    // Toggle menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}); 

// Horizontal scroll arrows for mobile (projects and experience)
function addHorizontalScrollArrows(gridSelector, leftArrowId, rightArrowId, cardSelector) {
    const grid = document.querySelector(gridSelector);
    const leftArrow = document.getElementById(leftArrowId);
    const rightArrow = document.getElementById(rightArrowId);
    if (!grid || !leftArrow || !rightArrow) return;
    const scrollAmount = () => {
        const card = grid.querySelector(cardSelector);
        return card ? card.offsetWidth + 20 : 200; // 20px gap fallback
    };
    // Remove previous listeners if any
    leftArrow.onclick = null;
    rightArrow.onclick = null;
    leftArrow.addEventListener('click', function(e) {
        e.preventDefault();
        grid.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
    rightArrow.addEventListener('click', function(e) {
        e.preventDefault();
        grid.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
}

function setupMobileArrows() {
    if (window.innerWidth <= 576) {
        addHorizontalScrollArrows('.projects-grid', 'projects-left-arrow', 'projects-right-arrow', '.project-card');
        addHorizontalScrollArrows('.experience-grid', 'experience-left-arrow', 'experience-right-arrow', '.experience-card');
    }
}

document.addEventListener('DOMContentLoaded', setupMobileArrows);
window.addEventListener('resize', setupMobileArrows); 