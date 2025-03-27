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
                "value": "#3b82f6"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5,
                "random": true
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#3b82f6",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    }
);

// 3D Carousel for Experience Section
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const cells = document.querySelectorAll('.carousel__cell');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const dots = document.querySelectorAll('.dot');
    
    let currentPosition = 1;
    updateCarousel();
    
    // Event listeners for navigation
    prevButton.addEventListener('click', () => {
        currentPosition = currentPosition > 1 ? currentPosition - 1 : 6;
        updateCarousel();
    });
    
    nextButton.addEventListener('click', () => {
        currentPosition = currentPosition < 6 ? currentPosition + 1 : 1;
        updateCarousel();
    });
    
    // Event listeners for dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentPosition = parseInt(dot.getAttribute('data-index'));
            updateCarousel();
        });
    });
    
    // Function to update carousel position
    function updateCarousel() {
        carousel.setAttribute('data-position', currentPosition);
        
        // Update dots
        dots.forEach(dot => {
            dot.classList.remove('active');
            if (parseInt(dot.getAttribute('data-index')) === currentPosition) {
                dot.classList.add('active');
            }
        });
        
        // Fancy transition effect: slightly scale down all cells and scale up the active one
        cells.forEach(cell => {
            const cellIndex = parseInt(cell.getAttribute('data-id'));
            if(cellIndex === currentPosition) {
                cell.style.opacity = '1';
                cell.style.transform = `rotateY(${(cellIndex - 1) * 60}deg) translateZ(288px) scale(1)`;
            } else {
                cell.style.opacity = '0.7';
                cell.style.transform = `rotateY(${(cellIndex - 1) * 60}deg) translateZ(288px) scale(0.9)`;
            }
        });
    }
    
    // Auto-rotation (optional)
    const autoRotate = setInterval(() => {
        currentPosition = currentPosition < 6 ? currentPosition + 1 : 1;
        updateCarousel();
    }, 8000); // Change slide every 8 seconds
    
    // Pause auto-rotation when user interacts with carousel
    document.querySelector('.scene').addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });
});

// Initialize Swiper for Education Section
const eduSwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        }
    }
});

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

// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Add parallax effect to skills cards on mouse move
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});
