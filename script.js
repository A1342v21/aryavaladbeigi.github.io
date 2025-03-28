// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Load additional web fonts
    document.head.innerHTML += `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
    `;
    
    // Custom cursor
    const cursor = document.querySelector('.cursor-follower');
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
        });
        
        // Change cursor size on links
        const links = document.querySelectorAll('a, button, .trait-card');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 1.5,
                    backgroundColor: 'rgba(26, 35, 126, 0.5)', // Midnight blue with opacity
                    duration: 0.3
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    backgroundColor: 'rgba(26, 35, 126, 0.4)', // Back to default
                    duration: 0.3
                });
            });
        });
    } else {
        cursor.style.display = 'none';
    }
    
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-left, .animate-fade-in-right');
    
    animateElements.forEach(element => {
        gsap.fromTo(element, 
            {
                y: element.classList.contains('animate-fade-in') ? 50 : 0,
                x: element.classList.contains('animate-fade-in-left') ? -50 : 
                   element.classList.contains('animate-fade-in-right') ? 50 : 0,
                opacity: 0
            },
            {
                y: 0,
                x: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // Enhanced Timeline animations with staggered effect and 3D transforms
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const isOdd = index % 2 === 0;
        
        // Create a timeline for each job item
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
        
        // Initial state and animation
        tl.fromTo(item, 
            {
                x: isOdd ? -100 : 100,
                opacity: 0,
                rotateY: isOdd ? -10 : 10,
                transformPerspective: 1000,
            },
            {
                x: 0,
                opacity: 1,
                rotateY: 0,
                duration: 1.2,
                ease: "power2.out"
            }
        );
        
        // Get all the child elements to animate them in sequence
        const content = item.querySelector('.timeline-content');
        const title = content.querySelector('h3');
        const subtitle = content.querySelector('h4');
        const dateElement = content.querySelector('.date');
        const listItems = content.querySelectorAll('li');
        
        // Add reveal animations for content elements
        tl.fromTo(dateElement, 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=0.5"
        )
        .fromTo(title, 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=0.3"
        )
        .fromTo(subtitle, 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=0.3"
        );
        
        // Animate list items with stagger
        tl.fromTo(listItems, 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" },
            "-=0.2"
        );
    });
    
    // Add 3D depth effect to timeline
    gsap.set(".timeline-content", { transformStyle: "preserve-3d", transformPerspective: 1000 });
    
    // Animate trait cards with stagger effect
    gsap.from('.trait-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.personality-traits',
            start: 'top 80%'
        }
    });
    
    // Header hide/show on scroll with smoother animation
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down - hide header
            gsap.to(header, { y: "-100%", duration: 0.4, ease: "power2.inOut" });
        } else {
            // Scrolling up - show header
            gsap.to(header, { y: "0%", duration: 0.4, ease: "power2.out" });
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scrolling for anchor links with better easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
                
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: { y: targetPosition, autoKill: false },
                    ease: "power3.inOut"
                });
            }
        });
    });
    
    // Create enhanced transitions between timeline items with 3D perspective
    function createTimelineTransitions() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            if (index < timelineItems.length - 1) {
                const currentItem = item;
                const nextItem = timelineItems[index + 1];
                
                // Generate a unique color transition based on company colors
                const currentCompany = currentItem.getAttribute('data-company');
                const nextCompany = nextItem.getAttribute('data-company');
                
                // Create a more sophisticated transition element
                const transitionElement = document.createElement('div');
                transitionElement.classList.add('timeline-transition');
                
                // Style the transition element
                Object.assign(transitionElement.style, {
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    height: '120px',
                    background: `linear-gradient(to bottom, var(--${currentCompany}-color), var(--${nextCompany}-color))`,
                    zIndex: '0',
                    overflow: 'visible'
                });
                
                // Add decorative elements to the transition
                const decorElement = document.createElement('div');
                Object.assign(decorElement.style, {
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '20px',
                    height: '20px',
                    background: `linear-gradient(135deg, var(--${currentCompany}-color), var(--${nextCompany}-color))`,
                    borderRadius: '50%',
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                });
                
                transitionElement.appendChild(decorElement);
                
                // Insert transition element between timeline items
                currentItem.after(transitionElement);
                
                // Create a more elaborate animation
                const transitionTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: currentItem,
                        start: 'bottom 70%',
                        toggleActions: 'play none none none'
                    }
                });
                
                transitionTl
                    .fromTo(transitionElement, 
                        {
                            height: 0,
                            opacity: 0
                        },
                        {
                            height: '120px',
                            opacity: 1,
                            duration: 0.8,
                            ease: "power2.inOut"
                        }
                    )
                    .fromTo(decorElement,
                        {
                            scale: 0,
                            rotation: -45,
                            opacity: 0
                        },
                        {
                            scale: 1,
                            rotation: 0,
                            opacity: 1,
                            duration: 0.5,
                            ease: "back.out(1.7)"
                        },
                        "-=0.4"
                    );
                
                // Add floating particles along the transition path for more visual interest
                for (let i = 0; i < 4; i++) {
                    const particle = document.createElement('div');
                    Object.assign(particle.style, {
                        position: 'absolute',
                        width: '6px',
                        height: '6px',
                        background: `linear-gradient(135deg, var(--${currentCompany}-color), var(--${nextCompany}-color))`,
                        borderRadius: '50%',
                        left: `${(Math.random() * 30) - 15}px`,
                        opacity: 0
                    });
                    
                    transitionElement.appendChild(particle);
                    
                    transitionTl.fromTo(particle,
                        {
                            top: '0%',
                            opacity: 0,
                            scale: 0
                        },
                        {
                            top: '100%',
                            opacity: function() { return Math.random() * 0.5 + 0.3; },
                            scale: function() { return Math.random() * 0.5 + 0.7; },
                            duration: function() { return Math.random() * 2 + 2; },
                            delay: function() { return Math.random() * 0.5; },
                            ease: "power1.inOut"
                        },
                        "-=0.8"
                    );
                }
            }
        });
    }
    
    // Initialize timeline transitions after a short delay to ensure DOM is fully processed
    setTimeout(createTimelineTransitions, 500);
    
    // Handle form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send this data to a server
            // For now, just show a success message
            const formGroups = document.querySelectorAll('.form-group');
            gsap.to(formGroups, {
                y: -20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                onComplete: () => {
                    formGroups.forEach(group => {
                        group.style.display = 'none';
                    });
                }
            });
            
            const submitBtn = document.querySelector('.btn-submit');
            gsap.to(submitBtn, {
                y: -20,
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    submitBtn.style.display = 'none';
                    
                    // Create success message
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('success-message');
                    successMessage.innerHTML = `
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: #1a237e; margin-bottom: 1rem;"></i>
                        <h3 style="font-size: 1.8rem; margin-bottom: 0.8rem;">Message Sent!</h3>
                        <p style="font-size: 1.1rem;">Thank you for reaching out, ${name}. I'll get back to you soon.</p>
                    `;
                    
                    successMessage.style.textAlign = 'center';
                    successMessage.style.padding = '2rem';
                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'translateY(20px)';
                    
                    contactForm.appendChild(successMessage);
                    
                    // Animate success message
                    gsap.to(successMessage, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "back.out(1.5)"
                    });
                }
            });
        });
    }
    
    // Enhanced 3D tilt effect to timeline items
    const timelineCards = document.querySelectorAll('.timeline-content');
    
    timelineCards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
    
    function handleTilt(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        
        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;
        
        // Limit the tilt angle but make it more noticeable
        const rotateY = mouseX * 0.03;
        const rotateX = -mouseY * 0.03;
        
        gsap.to(card, {
            rotateY: rotateY,
            rotateX: rotateX,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out",
            boxShadow: `
                ${-rotateY * 0.5}px ${-rotateX * 0.5}px 20px rgba(0,0,0,0.1),
                ${rotateY * 0.5}px ${rotateX * 0.5}px 30px rgba(0,0,0,0.05)
            `
        });
        
        // Parallax effect for card contents
        const cardContents = card.querySelectorAll('h3, h4, .date');
        gsap.to(cardContents, {
            x: mouseX * 0.03,
            y: mouseY * 0.03,
            duration: 0.4,
            ease: "power2.out"
        });
    }
    
    function resetTilt() {
        gsap.to(this, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
        });
        
        const cardContents = this.querySelectorAll('h3, h4, .date');
        gsap.to(cardContents, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)"
        });
    }
    
    // Add company logos to timeline items with enhanced animation
    function addCompanyLogos() {
        const companyLogos = {
            'dhl': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/DHL_Logo.svg/2560px-DHL_Logo.svg.png',
            'bertrandt': 'https://www.bertrandt.com/fileadmin/template/img/bertrandt-logo.svg',
            'itm': 'https://www.itm.uni-stuttgart.de/img/logo-ITM.svg',
            'fkfs': 'https://www.fkfs.de/typo3temp/pics/7c72ac3e2b.jpg',
            'navid': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfFvPj4QBzGR5kc0m75CgN0msHEJYjL-T2gQ&usqp=CAU', // Placeholder
            'bahman': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH1EchNkzGJDn8Cq_-uc2DIV60RTF5KnwSKg&usqp=CAU'  // Placeholder
        };
        
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const company = item.getAttribute('data-company');
            
            if (company && companyLogos[company]) {
                const logoDiv = document.createElement('div');
                logoDiv.classList.add('company-logo');
                
                // Style with GSAP instead of inline styles
                gsap.set(logoDiv, {
                    backgroundImage: `url(${companyLogos[company]})`,
                    position: 'absolute',
                    width: '60px',
                    height: '60px',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    top: '20px',
                    right: '20px',
                    opacity: 0.1,
                    scale: 0.8,
                    transformOrigin: 'center'
                });
                
                // Append to timeline content
                const timelineContent = item.querySelector('.timeline-content');
                timelineContent.appendChild(logoDiv);
                
                // Add hover animation for the logo
                timelineContent.addEventListener('mouseenter', () => {
                    gsap.to(logoDiv, {
                        opacity: 0.9,
                        scale: 1,
                        rotation: 5,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                });
                
                timelineContent.addEventListener('mouseleave', () => {
                    gsap.to(logoDiv, {
                        opacity: 0.1,
                        scale: 0.8,
                        rotation: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                });
            }
        });
    }
    
    // Initialize company logos after a short delay
    setTimeout(addCompanyLogos, 500);
    
    // Enhance section headers animation when they come into view
    const sectionHeaders = document.querySelectorAll('.section-header h2');
    
    sectionHeaders.forEach(header => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        tl.fromTo(header,
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            }
        );
        
        // Find the ::after pseudo-element or create a separate element for animation
        const underlineEl = header.parentElement.querySelector('.section-underline');
        
        if (!underlineEl) {
            // Create a separate element for the underline animation
            const underline = document.createElement('div');
            underline.classList.add('section-underline');
            
            Object.assign(underline.style, {
                height: '4px',
                width: '0px',
                background: 'var(--secondary-color)',
                position: 'relative',
                display: 'block',
                margin: '15px auto 0',
                borderRadius: '2px'
            });
            
            header.parentElement.appendChild(underline);
            
            tl.to(underline, {
                width: '80px',
                duration: 0.6,
                ease: "power2.inOut",
                delay: 0.2
            });
        }
    });
    
    // Create enhanced particles background effect for hero section
    function createParticles() {
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            const particlesContainer = document.createElement('div');
            particlesContainer.classList.add('particles-container');
            
            Object.assign(particlesContainer.style, {
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                zIndex: '0',
                pointerEvents: 'none'
            });
            
            heroSection.prepend(particlesContainer);
            
            // Create more interesting particles
            for (let i = 0; i < 40; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random styles with varied shapes
                const size = Math.random() * 15 + 5;
                const isCircle = Math.random() > 0.3; // 70% circles, 30% squares
                
                Object.assign(particle.style, {
                    position: 'absolute',
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: `rgba(26, 35, 126, ${Math.random() * 0.1 + 0.03})`, // Midnight blue with low opacity
                    borderRadius: isCircle ? '50%' : Math.random() > 0.5 ? '2px' : '50% 0 50% 0', // Mix of shapes
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: 'inset 0 0 5px rgba(255,255,255,0.3)'
                });
                
                // Add to container
                particlesContainer.appendChild(particle);
                
                // More complex animation path
                gsap.to(particle, {
                    x: `${Math.random() * 200 - 100}`,
                    y: `${Math.random() * 200 - 100}`,
                    rotation: Math.random() * 360,
                    duration: Math.random() * 30 + 20,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
                
                // Pulsing effect
                gsap.to(particle, {
                    opacity: Math.random() * 0.6 + 0.2,
                    scale: Math.random() * 0.5 + 0.5,
                    duration: Math.random() * 5 + 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        }
    }
    
    // Initialize enhanced particles effect
    createParticles();
});
