// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
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
                    backgroundColor: 'rgba(231, 76, 60, 0.5)',
                    duration: 0.3
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    backgroundColor: 'rgba(52, 152, 219, 0.5)',
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
    
    // Timeline animations with staggered effect
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const isOdd = index % 2 === 0;
        gsap.fromTo(item, 
            {
                x: isOdd ? -100 : 100,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
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
    
    // Header hide/show on scroll
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.classList.add('hidden');
        } else {
            // Scrolling up
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Create transitions between timeline items
    function createTimelineTransitions() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            if (index < timelineItems.length - 1) {
                const currentItem = item;
                const nextItem = timelineItems[index + 1];
                
                // Generate a unique color transition based on company colors
                const currentCompany = currentItem.getAttribute('data-company');
                const nextCompany = nextItem.getAttribute('data-company');
                
                const transitionElement = document.createElement('div');
                transitionElement.classList.add('timeline-transition');
                transitionElement.style.position = 'absolute';
                transitionElement.style.left = '50%';
                transitionElement.style.transform = 'translateX(-50%)';
                transitionElement.style.width = '4px';
                transitionElement.style.height = '100px';
                transitionElement.style.background = `linear-gradient(to bottom, var(--${currentCompany}-color), var(--${nextCompany}-color))`;
                transitionElement.style.zIndex = '0';
                
                // Insert transition element between timeline items
                currentItem.after(transitionElement);
                
                // Animate transition on scroll
                gsap.fromTo(transitionElement, 
                    {
                        height: 0,
                        opacity: 0
                    },
                    {
                        height: '100px',
                        opacity: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: currentItem,
                            start: 'bottom 70%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
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
            formGroups.forEach(group => {
                group.style.display = 'none';
            });
            
            const submitBtn = document.querySelector('.btn-submit');
            submitBtn.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out, ${name}. I'll get back to you soon.</p>
            `;
            
            successMessage.style.textAlign = 'center';
            successMessage.style.padding = '2rem';
            
            contactForm.appendChild(successMessage);
            
            // Animation for success message
            gsap.from(successMessage, {
                y: 30,
                opacity: 0,
                duration: 0.5
            });
        });
    }
    
    // Add 3D tilt effect to timeline items
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
        
        const rotateY = mouseX * 0.02;
        const rotateX = -mouseY * 0.02;
        
        gsap.to(card, {
            rotateY: rotateY,
            rotateX: rotateX,
            transformPerspective: 1000,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
    
    function resetTilt() {
        gsap.to(this, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    }
    
    // Add company logos to timeline items
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
                logoDiv.style.backgroundImage = `url(${companyLogos[company]})`;
                
                // Append to timeline content
                const timelineContent = item.querySelector('.timeline-content');
                timelineContent.appendChild(logoDiv);
            }
        });
    }
    
    // Initialize company logos after a short delay
    setTimeout(addCompanyLogos, 500);
    
    // Animate section headers when they come into view
    const sectionHeaders = document.querySelectorAll('.section-header h2');
    
    sectionHeaders.forEach(header => {
        gsap.fromTo(header,
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
        
        // Animate the underline
        const underline = header.parentElement.querySelector('h2::after');
        if (underline) {
            gsap.fromTo(underline,
                {
                    width: 0
                },
                {
                    width: '50px',
                    duration: 0.5,
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }
    });
    
    // Create particles background effect for hero section
    function createParticles() {
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            const particlesContainer = document.createElement('div');
            particlesContainer.classList.add('particles-container');
            particlesContainer.style.position = 'absolute';
            particlesContainer.style.top = '0';
            particlesContainer.style.left = '0';
            particlesContainer.style.width = '100%';
            particlesContainer.style.height = '100%';
            particlesContainer.style.overflow = 'hidden';
            particlesContainer.style.zIndex = '0';
            
            heroSection.prepend(particlesContainer);
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random styles
                particle.style.position = 'absolute';
                particle.style.width = `${Math.random() * 10 + 5}px`;
                particle.style.height = particle.style.width;
                particle.style.backgroundColor = `rgba(${Math.floor(Math.random() * 100 + 155)}, 
                                                      ${Math.floor(Math.random() * 100 + 155)}, 
                                                      ${Math.floor(Math.random() * 100 + 155)}, 
                                                      ${Math.random() * 0.4 + 0.1})`;
                particle.style.borderRadius = '50%';
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Add to container
                particlesContainer.appendChild(particle);
                
                // Animate each particle
                gsap.to(particle, {
                    x: `${Math.random() * 200 - 100}`,
                    y: `${Math.random() * 200 - 100}`,
                    duration: Math.random() * 20 + 10,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        }
    }
    
    // Initialize particles effect
    createParticles();
});
