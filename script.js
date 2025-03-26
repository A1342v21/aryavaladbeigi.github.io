// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
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

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize with German as default
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.en').forEach(el => el.style.display = 'none');
});
