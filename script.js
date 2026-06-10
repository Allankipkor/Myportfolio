// ============================================
// DOM ELEMENTS
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================

// Sticky Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close Mobile Menu on Link Click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
});

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// TYPING ANIMATION
// ============================================

const typingText = document.querySelector('.typing-text');
const phrases = [
    'Software Developer',
    'Web Developer',
    'Tech Enthusiast'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next phrase
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', typeEffect);

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

function reveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// Add reveal classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // About section
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    if (aboutImage) aboutImage.classList.add('reveal-left');
    if (aboutText) aboutText.classList.add('reveal-right');

    // Skills section
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.classList.add('reveal');
        category.style.transitionDelay = `${index * 0.2}s`;
    });

    // Projects section
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Experience section
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.2}s`;
    });

    // Certifications section
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Contact section
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    if (contactInfo) contactInfo.classList.add('reveal-left');
    if (contactForm) contactForm.classList.add('reveal-right');
});

// ============================================
// SKILLS PROGRESS BAR ANIMATION
// ============================================

function animateSkills() {
    const skillsSection = document.getElementById('skills');
    const sectionTop = skillsSection.offsetTop;
    const sectionHeight = skillsSection.offsetHeight;
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    if (scrollY > sectionTop - windowHeight / 2 && scrollY < sectionTop + sectionHeight) {
        skillProgressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
        });
    }
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ============================================
// BACK TO TOP BUTTON
// ============================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Simulate form submission (replace with actual form submission logic)
    showNotification('Message sent successfully! I will get back to you soon.', 'success');
    contactForm.reset();
});

// Notification function
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Append to body
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// PARALLAX EFFECT FOR HERO BACKGROUND
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============================================
// PRELOADER (Optional - can be removed if not needed)
// ============================================

window.addEventListener('load', () => {
    // Add a small delay to ensure smooth loading
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// INTERSECTION OBSERVER FOR BETTER PERFORMANCE
// ============================================

// Use Intersection Observer for scroll animations (more performant than scroll event)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe elements with reveal classes
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealElements.forEach(el => observer.observe(el));
});

// ============================================
// COUNTER ANIMATION FOR STATISTICS (Optional)
// ============================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// ============================================
// LAZY LOADING FOR IMAGES (Optional - for future use)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c Welcome to Allan\'s Portfolio! ', 'background: #6366f1; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Built with HTML, CSS, and JavaScript ', 'background: #1e293b; color: #94a3b8; font-size: 14px; padding: 5px; border-radius: 5px;');
