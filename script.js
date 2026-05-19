// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const contactForm = document.getElementById('contactForm');
const formSuccessMessage = document.getElementById('formSuccessMessage');
const currentYear = document.getElementById('year');
const reveals = document.querySelectorAll('.reveal');

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenu.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.querySelector('i').classList.remove('fa-xmark');
            mobileMenu.querySelector('i').classList.add('fa-bars');
        }
    });
});

// Scroll Reveal Animation
function revealAnimation() {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// Active Nav Link highlight on Scroll
const sections = document.querySelectorAll('section');

function activeLinkOnScroll() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

// Event listeners for scrolling
window.addEventListener('scroll', () => {
    revealAnimation();
    activeLinkOnScroll();
});

// Initial trigger for visible elements on load
revealAnimation();

// Contact Form Handling (French)
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = 'Envoi en cours...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            contactForm.reset();
            formSuccessMessage.classList.remove('hidden');
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formSuccessMessage.classList.add('hidden');
            }, 5000);
        }, 1500);
    });
}
