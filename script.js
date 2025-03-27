// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
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
                output += `<span class="dud">${char}</span>`;
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

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize engine animation
    const engine = new EngineAnimation();
    engine.animate();

    // Scroll-based animations
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const scrollDirection = scrollPosition > lastScroll ? 'down' : 'up';
        
        // Start engine animation on scroll
        if (scrollPosition > 100 && !engine.isRunning) {
            engine.startEngine();
            engine.isRunning = true;
        }

        // Trigger section-specific animations
        document.querySelectorAll('.experience').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                section.classList.add('active');
                triggerTransition(section.id, scrollDirection);
            }
        });

        lastScroll = scrollPosition;
    });
});

// Section transitions
function triggerTransition(sectionId, direction) {
    const transitions = {
        'dhl': () => {
            // Animate DHL post box to Bertrandt engine
            gsap.to('.post-box', {
                morphSVG: '.engine-model',
                duration: 1.5,
                ease: "power2.inOut"
            });
        },
        'bertrandt': () => {
            // Transform engine to robot arm
            gsap.to('.engine-model', {
                morphSVG: '.robot-arm',
                duration: 1.5,
                ease: "power2.inOut"
            });
        }
        // Add more transitions...
    };

    if (transitions[sectionId]) {
        transitions[sectionId]();
    }
}
