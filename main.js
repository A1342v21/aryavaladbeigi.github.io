// Main JavaScript file

// Wait for DOM Content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    
                    // Reset menu toggle bars
                    const bars = document.querySelectorAll('.menu-toggle .bar');
                    bars.forEach(bar => bar.classList.remove('active'));
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Add active class to nav links based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Form validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demonstration, we'll just log it and show a success message
            console.log('Form submission:', { name, email, subject, message });
            
            // Show success message
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Message Sent!';
            submitButton.disabled = true;
            
            // Reset the form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 3000);
        });
    }

    // Add animation classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Add fade-in class to section titles
        const title = section.querySelector('.section-title');
        if (title) {
            title.classList.add('fade-in');
        }
        
        // Add slide-in classes to various elements
        const leftElements = section.querySelectorAll('.about-text, .contact-info, .skill-category:nth-child(odd)');
        leftElements.forEach(el => {
            el.classList.add('slide-in-left');
        });
        
        const rightElements = section.querySelectorAll('.contact-form, .skill-category:nth-child(even)');
        rightElements.forEach(el => {
            el.classList.add('slide-in-right');
        });
        
        // Add scramble-text class to job descriptions
        const jobDescriptions = section.querySelectorAll('.job-description p');
        jobDescriptions.forEach(el => {
            el.classList.add('scramble-text');
        });
    });

    // Initialize job background colors based on scroll position
    const jobCards = document.querySelectorAll('.job-card');
    const jobColors = {
        'dhl-job': { color: '#ffcc00', icon: 'fas fa-box' },
        'bertrandt-job': { color: '#0066b3', icon: 'fas fa-cogs' },
        'stuttgart-job': { color: '#9b0000', icon: 'fas fa-university' },
        'tehran-job': { color: '#239f40', icon: 'fas fa-flag' }
    };
    
    // Add job icons
    jobCards.forEach(card => {
        const id = card.id;
        if (jobColors[id]) {
            // Create icon element
            const iconContainer = document.createElement('div');
            iconContainer.classList.add('job-icon');
            
            const icon = document.createElement('i');
            icon.className = jobColors[id].icon;
            icon.style.color = jobColors[id].color;
            
            iconContainer.appendChild(icon);
            card.querySelector('.job-content').appendChild(iconContainer);
        }
    });
});

// Handle loading events
window.addEventListener('load', function() {
    // Add animation to skill bars once the page is loaded
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const value = bar.getAttribute('data-value');
            bar.style.width = value;
        });
    }, 1000);
});
