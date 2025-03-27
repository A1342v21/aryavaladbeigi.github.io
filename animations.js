// Text Scramble Animation
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scrambling">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Animated Text Phrases
const phrases = [
    'Automotive Engineer',
    'Blockchain Developer',
    'Creative Problem Solver',
    'Innovative Thinker'
];

// Initialize Text Scramble
document.addEventListener('DOMContentLoaded', () => {
    // Animated text in hero section
    const animatedTextEl = document.getElementById('animated-text');
    if (animatedTextEl) {
        const fx = new TextScramble(animatedTextEl);
        
        let counter = 0;
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 3000);
            });
            counter = (counter + 1) % phrases.length;
        };
        
        next();
    }
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Scroll Animations
function initScrollAnimations() {
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');
    
    // Skill bars animation
    const skillBars = document.querySelectorAll('.progress');
    
    // Handle scroll
    const handleScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        // Fade in animations
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('appear');
            }
        });
        
        // Slide in from left
        slideLeftElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('appear');
            }
        });
        
        // Slide in from right
        slideRightElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('appear');
            }
        });
        
        // Animate skill bars
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < triggerBottom) {
                const width = bar.getAttribute('data-value');
                bar.style.width = width;
            }
        });
        
        // Handle job transitions
        handleJobTransitions();
    };
    
    // Job section transition effects
    function handleJobTransitions() {
        const jobCards = document.querySelectorAll('.job-card');
        const viewportHeight = window.innerHeight;
        
        jobCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            
            // Calculate how centered the card is in the viewport
            const distanceFromCenter = Math.abs(cardCenter - viewportHeight / 2);
            const maxDistance = viewportHeight / 2;
            
            // Calculate a "focus factor" (1 when centered, 0 when off screen)
            const focusFactor = 1 - Math.min(1, distanceFromCenter / maxDistance);
            
            // Apply scale based on focus
            const scale = 0.95 + (0.05 * focusFactor);
            card.style.transform = `translateY(-${focusFactor * 10}px) scale(${scale})`;
            
            // Increase opacity of background when centered
            const bgElement = card.querySelector('.job-background');
            if (bgElement) {
                bgElement.style.opacity = 0.3 + (focusFactor * 0.3);
            }
        });
    }
    
    // Call once to initialize
    handleScroll();
    
    // Add event listener
    window.addEventListener('scroll', handleScroll);
}

// Add scrambled-text effect to specific text elements
function addScrambleToElements() {
    const elements = document.querySelectorAll('.scramble-text');
    
    elements.forEach(el => {
        const originalText = el.innerText;
        const fx = new TextScramble(el);
        
        // Add intersection observer to trigger scramble when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is in view, start scramble effect
                    fx.setText(originalText);
                    // Unobserve after triggering once
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(el);
    });
}

// Job transition animations
function setupJobTransitions() {
    const jobs = document.querySelectorAll('.job-card');
    
    // Custom animations for each job transition
    const jobTransitions = [
        { from: 'dhl-job', to: 'bertrandt-job', icon: 'postbox-to-engine' },
        { from: 'bertrandt-job', to: 'stuttgart-job', icon: 'engine-to-university' },
        { from: 'stuttgart-job', to: 'tehran-job', icon: 'university-to-flag' }
    ];
    
    // Detect which job is currently in focus
    let currentJobIndex = 0;
    let previousScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const scrollingDown = window.scrollY > previousScrollY;
        previousScrollY = window.scrollY;
        
        jobs.forEach((job, index) => {
            const rect = job.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
            
            if (isVisible && currentJobIndex !== index) {
                // Job transition detected
                const prevIndex = currentJobIndex;
                currentJobIndex = index;
                
                // Find the transition if it exists
                const transition = jobTransitions.find(t => 
                    t.from === jobs[prevIndex].id && t.to === jobs[currentJobIndex].id);
                
                if (transition) {
                    // Play transition animation
                    console.log(`Transition from ${transition.from} to ${transition.to} with ${transition.icon}`);
                    // Animation would be triggered here
                }
            }
        });
    });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Fade out preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1000);
    }
    
    // Setup navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Add animation to menu toggle bars
            const bars = menuToggle.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
        });
    }
    
    // Add scroll class to header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Initialize scramble texts
    addScrambleToElements();
    
    // Setup job transitions
    setupJobTransitions();
    
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
