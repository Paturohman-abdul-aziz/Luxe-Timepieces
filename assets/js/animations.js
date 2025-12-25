// Advanced Animations for Luxe Timepieces

// GSAP-like animation utilities (lightweight implementation)
class LuxeAnimations {
    constructor() {
        this.animations = new Map();
        this.init();
    }

    init() {
        this.setupScrollTriggers();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
        this.setupParticleSystem();
    }

    // Scroll-triggered animations
    setupScrollTriggers() {
        const scrollElements = document.querySelectorAll('[data-animate]');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.animate;
                    const delay = element.dataset.delay || 0;
                    
                    setTimeout(() => {
                        this.triggerAnimation(element, animationType);
                    }, delay);
                    
                    scrollObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        scrollElements.forEach(el => scrollObserver.observe(el));
    }

    // Trigger specific animations
    triggerAnimation(element, type) {
        switch (type) {
            case 'fadeInUp':
                this.fadeInUp(element);
                break;
            case 'fadeInLeft':
                this.fadeInLeft(element);
                break;
            case 'fadeInRight':
                this.fadeInRight(element);
                break;
            case 'scaleIn':
                this.scaleIn(element);
                break;
            case 'rotateIn':
                this.rotateIn(element);
                break;
            case 'slideInUp':
                this.slideInUp(element);
                break;
            case 'bounceIn':
                this.bounceIn(element);
                break;
            case 'typewriter':
                this.typewriter(element);
                break;
            default:
                this.fadeInUp(element);
        }
    }

    // Animation methods
    fadeInUp(element, duration = 600) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    fadeInLeft(element, duration = 600) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    fadeInRight(element, duration = 600) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    scaleIn(element, duration = 500) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }

    rotateIn(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'rotate(-180deg)';
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'rotate(0deg)';
        });
    }

    slideInUp(element, duration = 600) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(100px)';
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    bounceIn(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.3)';
        element.style.transition = `all ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }

    typewriter(element, speed = 50) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(timer);
            }
        }, speed);
    }

    // Hover effects
    setupHoverEffects() {
        // Magnetic effect for buttons
        document.querySelectorAll('.btn').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.addMagneticEffect(e.target);
            });
            
            element.addEventListener('mouseleave', (e) => {
                this.removeMagneticEffect(e.target);
            });
        });

        // Parallax hover effect for images - disabled for cards
        // document.querySelectorAll('.collection-card .card-image').forEach(element => {
        //     element.addEventListener('mousemove', (e) => {
        //         this.parallaxHover(e, element);
        //     });
        //     
        //     element.addEventListener('mouseleave', (e) => {
        //         this.resetParallax(element);
        //     });
        // });
    }

    addMagneticEffect(element) {
        element.addEventListener('mousemove', this.magneticMove);
        element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    removeMagneticEffect(element) {
        element.removeEventListener('mousemove', this.magneticMove);
        element.style.transform = 'translate(0, 0)';
    }

    magneticMove(e) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.1;
        const moveY = y * 0.1;
        
        e.target.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    parallaxHover(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        const img = element.querySelector('img');
        if (img) {
            img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        }
    }

    resetParallax(element) {
        const img = element.querySelector('img');
        if (img) {
            img.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        }
    }

    // Loading animations
    setupLoadingAnimations() {
        // Stagger animation for grid items
        const gridItems = document.querySelectorAll('.collections-grid .collection-card, .services-grid .service-card');
        
        gridItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Particle system
    setupParticleSystem() {
        this.createFloatingParticles();
    }

    createFloatingParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(212, 175, 55, 0.3);
                border-radius: 50%;
                animation: particle-float ${5 + Math.random() * 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            particleContainer.appendChild(particle);
        }

        document.body.appendChild(particleContainer);
    }

    // Smooth scroll with easing
    smoothScrollTo(target, duration = 1000) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const targetPosition = targetElement.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuart(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        requestAnimationFrame(animation.bind(this));
    }

    // Easing function
    easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }

    // Text reveal animation
    revealText(element) {
        const text = element.textContent;
        const words = text.split(' ');
        element.innerHTML = '';

        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.display = 'inline-block';
            span.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            element.appendChild(span);

            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 100);
        });
    }

    // Morphing shapes
    createMorphingShape(container) {
        const shape = document.createElement('div');
        shape.style.cssText = `
            width: 200px;
            height: 200px;
            background: linear-gradient(45deg, #d4af37, #f4d03f);
            animation: morph 8s ease-in-out infinite;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.1;
        `;
        
        container.appendChild(shape);
    }

    // Progress bar animation
    animateProgressBar(element, percentage, duration = 2000) {
        const progressBar = element.querySelector('.progress-fill') || element;
        progressBar.style.width = '0%';
        progressBar.style.transition = `width ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        setTimeout(() => {
            progressBar.style.width = percentage + '%';
        }, 100);
    }

    // Ripple effect
    createRipple(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Initialize all animations
    initializeAll() {
        // Add data attributes for animations
        document.querySelectorAll('.section-title').forEach(el => {
            el.setAttribute('data-animate', 'fadeInUp');
        });
        
        document.querySelectorAll('.section-subtitle').forEach(el => {
            el.setAttribute('data-animate', 'fadeInUp');
            el.setAttribute('data-delay', '200');
        });
        
        document.querySelectorAll('.collection-card').forEach((el, index) => {
            el.setAttribute('data-animate', 'scaleIn');
            el.setAttribute('data-delay', index * 100);
        });
        
        document.querySelectorAll('.service-card').forEach((el, index) => {
            el.setAttribute('data-animate', 'slideInUp');
            el.setAttribute('data-delay', index * 150);
        });

        // Add ripple effect to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createRipple(btn, e);
            });
        });
    }
}

// CSS for additional animations
const additionalStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .particle-container .particle {
        will-change: transform;
    }
    
    @keyframes particle-float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .magnetic-element {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .parallax-hover img {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const luxeAnimations = new LuxeAnimations();
    luxeAnimations.initializeAll();
    
    // Make it globally available
    window.LuxeAnimations = luxeAnimations;
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LuxeAnimations;
}