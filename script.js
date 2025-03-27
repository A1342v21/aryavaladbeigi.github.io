document.addEventListener('DOMContentLoaded', () => {
    // Initial animations
    gsap.to('.main-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5
    });

    gsap.to('.subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.8
    });

    // Scroll animations
    let engineStarted = false;
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100 && !engineStarted) {
            engineStarted = true;
            startEngine();
        }
    });
});

function startEngine() {
    gsap.to('.piston', {
        y: '-20px',
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
}
    }
}
