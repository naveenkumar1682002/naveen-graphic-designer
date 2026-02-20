// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 50
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Custom Cursor
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

// Only activate custom cursor on desktop devices (rough check)
if (window.matchMedia("(min-width: 768px)").matches) {
    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Add slight delay to outline for smoother effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add cursor hover effect on interactable elements
    const interactables = document.querySelectorAll('a, button, input, textarea, .service-card, .tool-card');

    interactables.forEach(interactive => {
        interactive.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(225, 6, 0, 0.1)';
        });

        interactive.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}

// Scroll Progress Bar
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
    // Calculate total scrollable area
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPercentage = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = scrollPercentage + '%';
});

// Sticky Navbar Background and active link update
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');
const mobileBtnIcon = document.querySelector('.mobile-menu-btn i');

mobileBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');

    if (navLinksContainer.classList.contains('active')) {
        mobileBtnIcon.classList.remove('fa-bars');
        mobileBtnIcon.classList.add('fa-times');
    } else {
        mobileBtnIcon.classList.remove('fa-times');
        mobileBtnIcon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        mobileBtnIcon.classList.remove('fa-times');
        mobileBtnIcon.classList.add('fa-bars');
    });
});

// Animate Progress Bars on Scroll
const progressBars = document.querySelectorAll('.progress-bar');
let animated = false;

window.addEventListener('scroll', () => {
    const aboutSection = document.getElementById('about');
    const sectionPos = aboutSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.2;

    if (sectionPos < screenPos && !animated) {
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress;
        });
        animated = true;
    }
});

// Pre-fill skills if they are already in view on load
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const sectionPos = aboutSection.getBoundingClientRect().top;
        if (sectionPos < window.innerHeight) {
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress;
            });
            animated = true;
        }
    }
});

// Simple form submission prevention & alert for demo UX
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = this.querySelector('.btn-submit span');
        const icon = this.querySelector('.btn-submit i');

        btn.textContent = 'Sending...';
        icon.className = 'fas fa-spinner fa-spin';

        setTimeout(() => {
            btn.textContent = 'Message Sent!';
            icon.className = 'fas fa-check';
            this.reset();

            setTimeout(() => {
                btn.textContent = 'Send Message';
                icon.className = 'fas fa-paper-plane';
            }, 3000);
        }, 1500);
    });
}
