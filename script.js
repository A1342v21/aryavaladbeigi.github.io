// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Initialize Particles.js
particlesJS('particles-js',
    {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            }
        },
        "retina_detect": true
    }
);

// Language Toggle
let currentLang = 'de';

function toggleLanguage() {
    const elements = {
        en: document.querySelectorAll('.en'),
        de: document.querySelectorAll('.de')
    };
    
    if (currentLang === 'de') {
        elements.de.forEach(el => el.style.display = 'none');
        elements.en.forEach(el => el.style.display = 'block');
        currentLang = 'en';
    } else {
        elements.en.forEach(el => el.style.display = 'none');
        elements.de.forEach(el => el.style.display = 'block');
        currentLang = 'de';
    }
}

// Initialize with German as default
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.en').forEach(el => el.style.display = 'none');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
