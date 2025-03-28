document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Create 3D scene
    setup3DScene();
    
    // Create custom cursor
    setupCustomCursor();
    
    // Create interactive hero
    setupHero();
    
    // Initialize particles for background
    initParticles();
    
    // Setup timeline animations
    setupTimelineAnimations();
    
    // Setup general animations
    setupAnimations();
    
    // Setup navigation
    setupNavigation();
    
    // Form handling
    setupFormHandling();
});

// Custom cursor with 3D effects
function setupCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-follower');
    document.body.appendChild(cursor);
    
    let cursorX = 0;
    let cursorY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });
    
    const links = document.querySelectorAll('a, button, .trait-card, .timeline-content, .education-item');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.backgroundColor = 'rgba(26, 35, 126, 0.2)';
            cursor.style.mixBlendMode = 'difference';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.backgroundColor = 'rgba(26, 35, 126, 0.4)';
            cursor.style.mixBlendMode = 'normal';
        });
    });
    
    function updateCursor() {
        const diffX = targetX - cursorX;
        const diffY = targetY - cursorY;
        
        cursorX += diffX * 0.1;
        cursorY += diffY * 0.1;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
}

// Create 3D scene effect for the entire page
function setup3DScene() {
    const body = document.body;
    body.classList.add('perspective-container');
    
    // Add perspective to all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('perspective-container');
    });
    
    // Create tilt effect for the entire page
    document.addEventListener('mousemove', e => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 100;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 100;
        
        gsap.to('.hero-content', {
            rotationY: xAxis,
            rotationX: yAxis,
            transformStyle: 'preserve-3d',
            ease: 'power1.out',
            duration: 0.3
        });
    });
}

// Create hero section with 3D elements and particles
function setupHero() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    // Create background shapes
    const heroBackground = document.createElement('div');
    heroBackground.classList.add('hero-background');
    hero.appendChild(heroBackground);
    
    // Add 3D floating shapes
    for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        shape.classList.add('hero-shape');
        
        // Random size between 20 and 300
        const size = Math.random() * 280 + 20;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        
        // Random position
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        
        // Random depth
        const zIndex = Math.floor(Math.random() * 200) - 100;
        shape.style.transform = `translateZ(${zIndex}px)`;
        
        // Apply animation
        gsap.to(shape, {
            x: `random(-50, 50)`,
            y: `random(-50, 50)`,
            rotation: `random(-15, 15)`,
            duration: `random(8, 20)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        heroBackground.appendChild(shape);
    }
    
    // Animate hero content
    gsap.fromTo(heroContent, 
        { opacity: 0, y: 100, rotationX: 20 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1.5, ease: 'power3.out' }
    );
    
    // Add scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.classList.add('scroll-indicator');
    scrollIndicator.innerHTML = `
        <span>Scroll Down</span>
        <i class="fas fa-chevron-down"></i>
    `;
    hero.appendChild(scrollIndicator);
}

// Create particles for background and sections
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    document.body.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Style the particle
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 5 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = `rgba(26, 35, 126, ${Math.random() * 0.2 + 0.1})`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        
        // Position randomly on page
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 500}vh`;
        
        // Add transform style for 3D
        particle.style.transform = `translateZ(${Math.random() * 100 - 50}px)`;
        
        // Animate with GSAP
        gsap.to(particle, {
            y: `random(-300, 300)`,
            x: `random(-100, 100)`,
            duration: `random(20, 60)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        particlesContainer.appendChild(particle);
    }
    
    // Parallax effect for particles
    document.addEventListener('mousemove', e => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        
        gsap.to('.particles-container', {
            x: xAxis,
            y: yAxis,
            duration: 1,
            ease: 'power1.out'
        });
    });
}

// Set up timeline animations with advanced 3D effects
function setupTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Set company themes based on index
    const companyColors = [
        'var(--dhl-color)',
        'var(--bertrandt-color)',
        'var(--itm-color)',
        'var(--fkfs-color)',
        'var(--navid-color)',
        'var(--bahman-color)'
    ];
    
    // Add company logos to timeline items
    const companyLogos = [
        'dhl-logo.png',
        'bertrandt-logo.png', 
        'itm-logo.png',
        'fkfs-logo.png',
        'navid-logo.png',
        'bahman-logo.png'
    ];
    
    // Create text logo placeholders if images not available
    timelineItems.forEach((item, index) => {
        // Add company color theme
        const colorIndex = index % companyColors.length;
        const companyColor = companyColors[colorIndex];
        
        // Add company color to the item
        const timelineContent = item.querySelector('.timeline-content');
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.top = '20px';
        dot.style.left = '50%';
        dot.style.transform = 'translateX(-50%)';
        dot.style.width = '25px';
        dot.style.height = '25px';
        dot.style.backgroundColor = companyColor;
        dot.style.borderRadius = '50%';
        dot.style.zIndex = '2';
        dot.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
        item.appendChild(dot);
        
        // Add company text logo
        const company = item.querySelector('h3').textContent.trim();
        const logoContainer = document.createElement('div');
        logoContainer.style.position = 'absolute';
        logoContainer.style.right = '20px';
        logoContainer.style.bottom = '20px';
        logoContainer.style.fontSize = '40px';
        logoContainer.style.fontWeight = 'bold';
        logoContainer.style.opacity = '0.1';
        logoContainer.style.color = companyColor;
        logoContainer.style.transform = 'translateZ(5px)';
        logoContainer.style.transition = 'all 0.5s ease';
        logoContainer.textContent = company.split(' ')[0];
        
        timelineContent.appendChild(logoContainer);
        
        // Logo hover effect
        timelineContent.addEventListener('mouseenter', () => {
            gsap.to(logoContainer, {
                opacity: 0.3,
                scale: 1.2,
                rotation: `random(-5, 5)`,
                duration: 0.5
            });
        });
        
        timelineContent.addEventListener('mouseleave', () => {
            gsap.to(logoContainer, {
                opacity: 0.1,
                scale: 1,
                rotation: 0,
                duration: 0.5
            });
        });
        
        // 3D tilt effect on mouse movement for each card
        timelineContent.addEventListener('mousemove', e => {
            const rect = timelineContent.getBoundingClientRect();
            const xAxis = (rect.width / 2 - (e.clientX - rect.left)) / 20;
            const yAxis = (rect.height / 2 - (e.clientY - rect.top)) / 20;
            
            gsap.to(timelineContent, {
                rotationY: xAxis,
                rotationX: yAxis,
                transformPerspective: 1000,
                transformStyle: 'preserve-3d',
                ease: 'power1.out',
                duration: 0.3
            });
            
            // Move child elements for parallax effect
            gsap.to(timelineContent.querySelector('h3'), {
                translateZ: 50,
                duration: 0.3
            });
            
            gsap.to(timelineContent.querySelector('.date'), {
                translateZ: 30,
                duration: 0.3
            });
            
            gsap.to(timelineContent.querySelectorAll('ul li'), {
                translateZ: 20,
                stagger: 0.02,
                duration: 0.3
            });
        });
        
        timelineContent.addEventListener('mouseleave', () => {
            gsap.to(timelineContent, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5
            });
            
            gsap.to(timelineContent.querySelector('h3'), {
                translateZ: 0,
                duration: 0.5
            });
            
            gsap.to(timelineContent.querySelector('.date'), {
                translateZ: 0,
                duration: 0.5
            });
            
            gsap.to(timelineContent.querySelectorAll('ul li'), {
                translateZ: 0,
                duration: 0.5
            });
        });
    });
    
    // Staggered animation for timeline items
    gsap.set(timelineItems, { opacity: 0, y: 100 });
    
    ScrollTrigger.batch(timelineItems, {
        onEnter: batch => {
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 1,
                ease: 'power3.out'
            });
        },
        start: 'top 80%'
    });
}

// Set up general page animations
function setupAnimations() {
    // Animate section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Animate trait cards with staggered effect
    const traitCards = document.querySelectorAll('.trait-card');
    gsap.set(traitCards, { opacity: 0, y: 50 });
    
    ScrollTrigger.batch(traitCards, {
        onEnter: batch => {
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out'
            });
        },
        start: 'top 80%'
    });
    
    // Trait card hover effects
    traitCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Show description with staggered letters
            const description = card.querySelector('p');
            if (description) {
                const text = description.textContent;
                description.textContent = '';
                description.style.opacity = '1';
                description.style.maxHeight = '100px';
                
                for (let i = 0; i < text.length; i++) {
                    const span = document.createElement('span');
                    span.textContent = text[i];
                    span.style.opacity = '0';
                    description.appendChild(span);
                    
                    gsap.to(span, {
                        opacity: 1,
                        duration: 0.05,
                        delay: 0.02 * i
                    });
                }
            }
        });
    });
    
    // Animate about text
    const aboutText = document.querySelector('.about-text');
    gsap.from(aboutText, {
        scrollTrigger: {
            trigger: aboutText,
            start: 'top 80%'
        },
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Animate education items
    const educationItems = document.querySelectorAll('.education-item');
    gsap.set(educationItems, { opacity: 0, x: -100 });
    
    ScrollTrigger.batch(educationItems, {
        onEnter: batch => {
            gsap.to(batch, {
                opacity: 1,
                x: 0,
                stagger: 0.2,
                duration: 1,
                ease: 'power3.out'
            });
        },
        start: 'top 80%'
    });
    
    // Add 3D tilt effect to education cards
    educationItems.forEach(item => {
        item.addEventListener('mousemove', e => {
            const rect = item.getBoundingClientRect();
            const xAxis = (rect.width / 2 - (e.clientX - rect.left)) / 20;
            const yAxis = (rect.height / 2 - (e.clientY - rect.top)) / 20;
            
            gsap.to(item, {
                rotationY: xAxis,
                rotationX: yAxis,
                transformPerspective: 1000,
                transformStyle: 'preserve-3d',
                ease: 'power1.out',
                duration: 0.3
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5
            });
        });
    });
}

// Set up smooth navigation
function setupNavigation() {
    // Hide header on scroll down, show on scroll up
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            gsap.to(header, {
                y: -header.offsetHeight,
                duration: 0.3,
                ease: 'power2.inOut'
            });
        } else {
            gsap.to(header, {
                y: 0,
                duration: 0.3,
                ease: 'power2.inOut'
            });
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Highlight current section in nav
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Smooth scroll with GSAP
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 70
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });
}

// Form handling with animations
function setupFormHandling() {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Success message
            setTimeout(() => {
                const formControls = this.querySelectorAll('input, textarea, button');
                
                // Hide form controls
                gsap.to(formControls, {
                    opacity: 0,
                    y: -20,
                    stagger: 0.05,
                    duration: 0.3
                });
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for your message. I'll get back to you soon.</p>
                `;
                
                // Style success message
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(20px)';
                successMessage.style.textAlign = 'center';
                successMessage.style.padding = '2rem';
                
                // Replace form with success message
                form.appendChild(successMessage);
                
                // Animate success message
                gsap.to(successMessage, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: 0.3
                });
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    gsap.to(successMessage, {
                        opacity: 0,
                        y: -20,
                        duration: 0.3,
                        onComplete: () => {
                            successMessage.remove();
                            submitButton.disabled = false;
                            submitButton.textContent = originalText;
                            
                            // Show form controls again
                            gsap.to(formControls, {
                                opacity: 1,
                                y: 0,
                                stagger: 0.05,
                                duration: 0.3
                            });
                        }
                    });
                }, 3000);
            }, 1500);
        });
    }
}
