// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Personality traits text
const traits = [
    "Innovative", "Problem Solver", "Team Player", "Detail Oriented",
    "Creative", "Analytical", "Adaptable", "Passionate"
];

// Scatter personality traits
const scatteredText = document.getElementById('scattered-text');
traits.forEach((trait, index) => {
    const span = document.createElement('span');
    span.textContent = trait;
    span.style.left = `${Math.random() * 100}%`;
    span.style.top = `${Math.random() * 100}%`;
    span.style.transform = `rotate(${Math.random() * 360}deg)`;
    scatteredText.appendChild(span);
});

// Animate sections on scroll
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1
        },
        opacity: 0,
        y: 100
    });
});

// Cylinder animation
const cylinder = document.getElementById('cylinder');
gsap.to(cylinder, {
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
    },
    y: -100,
    opacity: 0,
    scale: 0.5
});

// Scattered text animation
const textSpans = document.querySelectorAll('#scattered-text span');
textSpans.forEach((span, index) => {
    gsap.to(span, {
        scrollTrigger: {
            trigger: "#personality",
            start: "top center",
            end: "bottom center",
            scrub: 1
        },
        opacity: 1,
        duration: 1,
        delay: index * 0.2
    });
});

// Background color transitions
const colors = {
    dhl: '#FFD700',
    bertrandt: '#0066CC',
    hiwistelle: '#FFFFFF',
    tehran: '#DA0000'
};

Object.entries(colors).forEach(([section, color]) => {
    gsap.to('body', {
        scrollTrigger: {
            trigger: `#${section}`,
            start: "top center",
            end: "bottom center",
            scrub: 1
        },
        backgroundColor: color
    });
});
