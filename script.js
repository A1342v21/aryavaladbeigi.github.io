// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the loading animation
    initLoadingAnimation();
    
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Setup creative background
    setupCreativeBackground();
    
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
    
    // Animate floating skill elements
    animateFloatingElements();
    
    // Animate floating letters
    animateFloatingLetters();
    
    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Initialize loading animation
function initLoadingAnimation() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.loading-progress-bar');
    const percentageText = document.querySelector('.loading-percentage');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // After reaching 100%, wait 500ms then hide the loading screen
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                
                // Remove from DOM after transition completes
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
                
                // Trigger a nice animation for the entire page content
                gsap.from('body > *:not(#loading-screen, #background-canvas)', {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power3.out'
                });
                
            }, 500);
        }
        
        // Update the loading bar and percentage
        progressBar.style.width = `${progress}%`;
        percentageText.textContent = `${Math.floor(progress)}%`;
    }, 150);
    
    // Simulate loading resources
    window.addEventListener('load', () => {
        // Ensure we reach 100% quickly once everything is loaded
        progress = Math.max(progress, 90);
    });
}

// Setup creative background with canvas
function setupCreativeBackground() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Call resize initially and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create a grid of points for our background
    const points = [];
    const gridSize = 50; // Distance between points
    const mouseSensitivity = 150; // How far the mouse affects points
    
    // Create grid points
    for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
            points.push({
                x: x,
                y: y,
                baseX: x,
                baseY: y,
                // Add a random offset to create a more organic feel
                offsetX: Math.random() * 20 - 10,
                offsetY: Math.random() * 20 - 10,
                size: Math.random() * 2 + 1, // Random point size
                // Unique speeds for organic movement
                speedX: Math.random() * 0.2 - 0.1,
                speedY: Math.random() * 0.2 - 0.1
            });
        }
    }
    
    // Mouse position tracking
    let mouseX = 0;
    let mouseY = 0;
    let mouseActive = false;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        mouseActive = true;
        
        // Hide mouse after 2 seconds of inactivity
        clearTimeout(window.mouseTimeout);
        window.mouseTimeout = setTimeout(() => {
            mouseActive = false;
        }, 2000);
    });
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections between points
        ctx.strokeStyle = 'rgba(26, 35, 126, 0.05)';
        ctx.lineWidth = 0.5;
        
        // First update all point positions
        points.forEach(point => {
            // Apply gentle floating motion
            point.x += point.speedX;
            point.y += point.speedY;
            
            // Reverse direction at random intervals for natural movement
            if (Math.random() < 0.005) {
                point.speedX *= -1;
            }
            if (Math.random() < 0.005) {
                point.speedY *= -1;
            }
            
            // Keep within boundaries with a small random offset
            if (Math.abs(point.x - point.baseX) > 30) {
                point.speedX *= -1;
            }
            if (Math.abs(point.y - point.baseY) > 30) {
                point.speedY *= -1;
            }
            
            // Mouse influence
            if (mouseActive) {
                const dx = mouseX - point.x;
                const dy = mouseY - point.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouseSensitivity) {
                    const angle = Math.atan2(dy, dx);
                    const pushX = Math.cos(angle) * (mouseSensitivity - distance) / 10;
                    const pushY = Math.sin(angle) * (mouseSensitivity - distance) / 10;
                    
                    // Push away from mouse
                    point.x -= pushX;
                    point.y -= pushY;
                }
            }
        });
        
        // Draw connections
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const point1 = points[i];
                const point2 = points[j];
                
                const dx = point1.x - point2.x;
                const dy = point1.y - point2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Only draw connections between nearby points
                if (distance < gridSize * 1.5) {
                    // Fade out connections based on distance
                    const opacity = 1 - (distance / (gridSize * 1.5));
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(26, 35, 126, ${opacity * 0.05})`;
                    ctx.moveTo(point1.x, point1.y);
                    ctx.lineTo(point2.x, point2.y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw points
        points.forEach(point => {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(26, 35, 126, 0.1)';
            ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

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
    
    // Add 3D floating shapes
    const shapes = ['circle', 'square', 'triangle', 'pentagon', 'hexagon'];
    const colors = ['rgba(26, 35, 126, 0.05)', 'rgba(96, 125, 139, 0.05)', 'rgba(38, 50, 56, 0.05)'];
    
    for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        shape.classList.add('hero-shape');
        shape.classList.add(shapes[Math.floor(Math.random() * shapes.length)]);
        
        // Random size between 50 and 300
        const size = Math.random() * 250 + 50;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        
        // Random position
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        
        // Random background
        shape.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random rotation
        shape.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Add animation
        gsap.to(shape, {
            x: `random(-50, 50)`,
            y: `random(-50, 50)`,
            rotation: `random(-15, 15)`,
            duration: `random(10, 30)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        hero.insertBefore(shape, heroContent);
    }
    
    // Animate hero content
    gsap.fromTo(heroContent, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
    );
    
    // Add scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.classList.add('scroll-indicator');
    scrollIndicator.innerHTML = `
        <span>Scroll Down</span>
        <i class="fas fa-chevron-down"></i>
    `;
    hero.appendChild(scrollIndicator);
    
    // Animate scroll indicator
    gsap.to(scrollIndicator.querySelector('i'), {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'power1.inOut'
    });
}

// Create particles for background
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    document.body.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 6 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 300}vh`;
        
        // Random opacity and color
        const opacity = Math.random() * 0.3 + 0.1;
        const hue = Math.random() > 0.5 ? 240 : 210; // Blue or grey hue
        particle.style.backgroundColor = `hsla(${hue}, 70%, 50%, ${opacity})`;
        particle.style.borderRadius = '50%';
        
        // Apply animation
        gsap.to(particle, {
            y: `random(-200, 200)`,
            x: `random(-100, 100)`,
            opacity: `random(0.1, 0.5)`,
            duration: `random(20, 60)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        particlesContainer.appendChild(particle);
    }
}

// Setup advanced animations for timeline items
function setupTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineContainer = document.querySelector('.timeline');
    
    timelineItems.forEach(item => {
        const company = item.getAttribute('data-company');
        const content = item.querySelector('.timeline-content');
        
        // Animate timeline item when scrolled into view
        ScrollTrigger.create({
            trigger: item,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleClass: 'visible',
            once: true,
            onEnter: () => {
                gsap.fromTo(content, 
                    { opacity: 0, y: 50, rotateY: company === 'dhl' ? '15deg' : '-15deg' },
                    { 
                        opacity: 1, 
                        y: 0, 
                        rotateY: 0,
                        duration: 0.8, 
                        ease: 'power2.out',
                        clearProps: 'rotateY'
                    }
                );
            }
        });
    });
    
    // Animate timeline line
    ScrollTrigger.create({
        trigger: timelineContainer,
        start: 'top 80%',
        end: 'bottom 80%',
        onEnter: () => {
            gsap.to('.timeline::before', { scaleY: 1, duration: 1.5, ease: 'power3.out' });
        }
    });
    
    // Add 3D transition effect between jobs on scroll
    let lastScrollPos = 0;
    const companyInfo = {
        'dhl': { color: '#fc0', name: 'DHL' },
        'bertrandt': { color: '#005ca9', name: 'Bertrandt AG' },
        'itm': { color: '#990000', name: 'ITM Institut' },
        'fkfs': { color: '#336699', name: 'FKFS Institut' },
        'navid': { color: '#2ecc71', name: 'Navid' },
        'bahman': { color: '#9b59b6', name: 'Bahmanparsa' }
    };
    
    window.addEventListener('scroll', () => {
        const currentPos = window.scrollY;
        const scrollDown = currentPos > lastScrollPos;
        lastScrollPos = currentPos;
        
        if (!scrollDown) return; // Only trigger on scroll down
        
        // Check which timeline item is in view
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const nextItem = timelineItems[index + 1];
            
            // If this item is leaving view and next item is entering view
            if (rect.top < 0 && rect.bottom > 0 && nextItem) {
                const nextRect = nextItem.getBoundingClientRect();
                
                // If we're close to the transition point
                if (nextRect.top < window.innerHeight * 0.8 && nextRect.top > window.innerHeight * 0.2) {
                    const currentCompany = item.getAttribute('data-company');
                    const nextCompany = nextItem.getAttribute('data-company');
                    
                    if (currentCompany !== nextCompany) {
                        showTransition(currentCompany, nextCompany);
                    }
                }
            }
        });
    });
    
    function showTransition(fromCompany, toCompany) {
        const fromInfo = companyInfo[fromCompany];
        const toInfo = companyInfo[toCompany];
        
        if (!fromInfo || !toInfo) return;
        
        // Add 3D transition effect to timeline items
        const currentItem = document.querySelector(`.timeline-item[data-company="${fromCompany}"]`);
        const nextItem = document.querySelector(`.timeline-item[data-company="${toCompany}"]`);
        
        // Current item moves back into 3D space
        gsap.to(currentItem, {
            z: -500,
            opacity: 0.7,
            scale: 0.8,
            duration: 0.8,
            ease: "power2.in"
        });
        
        // Next item comes forward
        gsap.fromTo(nextItem,
            { z: -200, opacity: 0.5, scale: 0.9 },
            { z: 0, opacity: 1, scale: 1, duration: 0.8, delay: 0.3, ease: "power2.out" }
        );
    }
}

// Setup general animations
function setupAnimations() {
    // Animate sections when scrolled into view
    const sections = document.querySelectorAll('section:not(.hero)');
    
    sections.forEach(section => {
        // Animate section header
        const header = section.querySelector('.section-header');
        
        if (header) {
            gsap.fromTo(header, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }
        
        // Animate personality traits
        if (section.classList.contains('about')) {
            const traits = section.querySelectorAll('.trait-card');
            
            gsap.fromTo(traits, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: section.querySelector('.personality-traits'),
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none none'
                    }
                }
            );
            
            // Add 3D effect to trait cards
            traits.forEach(trait => {
                trait.addEventListener('mousemove', (e) => {
                    const rect = trait.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (centerY - y) / 10;
                    const rotateY = (x - centerX) / 10;
                    
                    gsap.to(trait, {
                        rotateX: rotateX,
                        rotateY: rotateY,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                });
                
                trait.addEventListener('mouseleave', () => {
                    gsap.to(trait, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                });
            });
        }
        
        // Animate education items
        if (section.classList.contains('education')) {
            const items = section.querySelectorAll('.education-item');
            
            items.forEach((item, index) => {
                gsap.fromTo(item, 
                    { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
                
                // Add hover effect
                item.addEventListener('mouseenter', () => {
                    gsap.to(item, {
                        y: -10,
                        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
                        duration: 0.3
                    });
                });
                
                item.addEventListener('mouseleave', () => {
                    gsap.to(item, {
                        y: 0,
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                        duration: 0.3
                    });
                });
            });
        }
        
        // Animate contact items
        if (section.classList.contains('contact')) {
            const items = section.querySelectorAll('.contact-item');
            
            gsap.fromTo(items, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: section.querySelector('.contact-info'),
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }
    });
}

// Setup navigation
function setupNavigation() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Hide/show navigation on scroll
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            gsap.to(nav, { y: -100, duration: 0.3, ease: 'power2.inOut' });
        } else {
            gsap.to(nav, { y: 0, duration: 0.3, ease: 'power2.inOut' });
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Create page transition effect
                const transition = document.createElement('div');
                transition.classList.add('page-transition');
                document.body.appendChild(transition);
                
                // Show transition
                transition.classList.add('active');
                
                // Scroll after transition starts
                setTimeout(() => {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: targetSection,
                            offsetY: 70
                        },
                        ease: 'power2.inOut'
                    });
                    
                    // Hide transition
                    setTimeout(() => {
                        transition.classList.remove('active');
                        
                        // Remove transition element after animation completes
                        setTimeout(() => {
                            document.body.removeChild(transition);
                        }, 800);
                    }, 500);
                }, 400);
            }
        });
    });
}

// Animate floating skill elements
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    // Create random animations for each element
    floatingElements.forEach(element => {
        const depth = parseFloat(element.getAttribute('data-depth'));
        
        // Float animation
        gsap.to(element, {
            x: `random(-${80 * depth}, ${80 * depth})`,
            y: `random(-${40 * depth}, ${40 * depth})`,
            rotation: `random(-${15 * depth}, ${15 * depth})`,
            duration: 20 + Math.random() * 10,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        // Hover effect
        element.addEventListener('mouseenter', () => {
            gsap.to(element, {
                scale: 1.2,
                color: 'rgba(26, 35, 126, 0.3)',
                borderColor: 'rgba(26, 35, 126, 0.3)',
                duration: 0.5
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                scale: 1,
                color: 'rgba(26, 35, 126, 0.1)',
                borderColor: 'rgba(26, 35, 126, 0.1)',
                duration: 0.5
            });
        });
    });
    
    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        floatingElements.forEach(element => {
            const depth = parseFloat(element.getAttribute('data-depth'));
            gsap.to(element, {
                y: scrollY * depth * 0.2,
                duration: 0.8,
                ease: 'power1.out'
            });
        });
    });
    
    // Parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        floatingElements.forEach(element => {
            const depth = parseFloat(element.getAttribute('data-depth'));
            gsap.to(element, {
                x: mouseX * 50 * depth,
                y: mouseY * 50 * depth,
                duration: 1,
                ease: 'power1.out'
            });
        });
    });
}

// Animate floating letters (inspired by spasoje.dev)
function animateFloatingLetters() {
    const letters = document.querySelectorAll('.floating-letter');
    
    letters.forEach((letter, index) => {
        // Random rotation
        letter.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
        
        // Fade in with delay
        gsap.fromTo(letter,
            { opacity: 0, y: 50 },
            { 
                opacity: 0.08, 
                y: 0, 
                duration: 1.5, 
                delay: index * 0.2,
                ease: 'power3.out'
            }
        );
        
        // Float animation
        gsap.to(letter, {
            x: `random(-100, 100)`,
            y: `random(-50, 50)`,
            rotation: `random(-15, 15)`,
            duration: 30 + Math.random() * 20,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
    
    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        letters.forEach((letter, index) => {
            const depth = parseFloat(letter.getAttribute('data-depth'));
            gsap.to(letter, {
                y: scrollY * depth * 0.1,
                rotation: scrollY * (index % 2 ? 0.01 : -0.01),
                duration: 0.5
            });
        });
    });
    
    // Interactive effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        letters.forEach(letter => {
            const depth = parseFloat(letter.getAttribute('data-depth'));
            gsap.to(letter, {
                x: mouseX * 100 * depth,
                y: mouseY * 100 * depth,
                rotation: mouseX * 10 * depth,
                duration: 1,
                ease: 'power1.out'
            });
        });
    });
    
    // Click interaction - create temporary letter elements
    document.addEventListener('click', (e) => {
        // Create a temporary letter that expands from click position
        const letterText = ['A', 'R', 'Y', 'A', 'V'][Math.floor(Math.random() * 5)];
        const tempLetter = document.createElement('div');
        tempLetter.classList.add('floating-letter');
        tempLetter.textContent = letterText;
        tempLetter.style.left = `${e.clientX - 50}px`;
        tempLetter.style.top = `${e.clientY - 50}px`;
        tempLetter.style.transform = 'scale(0) rotate(0deg)';
        tempLetter.style.opacity = '0';
        tempLetter.style.fontSize = '10rem';
        tempLetter.style.pointerEvents = 'none';
        
        document.body.appendChild(tempLetter);
        
        gsap.to(tempLetter, {
            scale: 1,
            opacity: 0.08,
            rotation: `random(-20, 20)`,
            duration: 0.5,
            onComplete: () => {
                gsap.to(tempLetter, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.5,
                    delay: 0.8,
                    onComplete: () => {
                        document.body.removeChild(tempLetter);
                    }
                });
            }
        });
    });
}

// Call the 3D scene initialization when the page is loaded
window.addEventListener('load', () => {
    const scene = document.getElementById('scene-container');
    if (scene && typeof THREE !== 'undefined') {
        init3DScene();
    }
});

// Initialize 3D scene for the hero section
function init3DScene() {
    // Check if Three.js is available
    if (typeof THREE === 'undefined') return;
    
    // Get the container
    const container = document.createElement('div');
    container.id = 'scene-container';
    container.classList.add('scene-container');
    document.querySelector('.hero').appendChild(container);
    
    // Create a scene
    const scene = new THREE.Scene();
    
    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
    
    // Create a group for all objects
    const group = new THREE.Group();
    scene.add(group);
    
    // Create geometric shapes with midnight blue and grey theme
    const shapes = [];
    const geometry1 = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const geometry2 = new THREE.OctahedronGeometry(0.8);
    const geometry3 = new THREE.TetrahedronGeometry(0.7);
    const geometry4 = new THREE.IcosahedronGeometry(0.6);
    
    // Create materials with nice colors
    const material1 = new THREE.MeshPhongMaterial({ 
        color: 0x1a237e, // Midnight blue
        shininess: 100,
        transparent: true,
        opacity: 0.8
    });
    
    const material2 = new THREE.MeshPhongMaterial({ 
        color: 0x607d8b, // Blue-grey
        shininess: 100, 
        transparent: true,
        opacity: 0.7
    });
    
    // Create meshes
    const torus = new THREE.Mesh(geometry1, material1);
    torus.position.set(-2, 0.5, 0);
    group.add(torus);
    shapes.push(torus);
    
    const octahedron = new THREE.Mesh(geometry2, material2);
    octahedron.position.set(2, -0.5, 0);
    group.add(octahedron);
    shapes.push(octahedron);
    
    const tetrahedron = new THREE.Mesh(geometry3, material1);
    tetrahedron.position.set(0, 1.5, -1);
    group.add(tetrahedron);
    shapes.push(tetrahedron);
    
    const icosahedron = new THREE.Mesh(geometry4, material2);
    icosahedron.position.set(0, -1.5, -1);
    group.add(icosahedron);
    shapes.push(icosahedron);
    
    // Add particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        // Create particles in a sphere around the origin
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xffffff,
        transparent: true,
        opacity: 0.7
    });
    
    const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleMesh);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Smooth mouse follow
        targetX = mouseX * 0.3;
        targetY = mouseY * 0.3;
        group.rotation.y += 0.05 * (targetX - group.rotation.y);
        group.rotation.x += 0.05 * (targetY - group.rotation.x);
        
        // Animate each shape
        shapes.forEach((shape, i) => {
            shape.rotation.x += 0.003 * (i + 1);
            shape.rotation.y += 0.005 * (i + 1);
            
            // Subtle floating motion
            shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
        });
        
        // Rotate particle system slowly
        particleMesh.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    }
    
    animate();
}
