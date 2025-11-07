// ============================================
// ADVANCED ANIMATION UTILITIES
// ============================================

// Smooth Scroll with Easing
class SmoothScroller {
    constructor(duration = 1000) {
        this.duration = duration;
    }

    scrollTo(target, offset = 0) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.ease(timeElapsed, startPosition, distance, this.duration);
            window.scrollTo(0, run);
            if (timeElapsed < this.duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
}

// Usage
const scroller = new SmoothScroller(800);
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) scroller.scrollTo(target, 80);
    });
});

// ============================================
// SPLIT TEXT ANIMATION
// ============================================
class SplitText {
    constructor(element) {
        this.element = element;
        this.text = element.textContent;
        this.split();
    }

    split() {
        this.element.innerHTML = this.text
            .split('')
            .map((char, i) => {
                return `<span style="display: inline-block; animation-delay: ${i * 0.03}s">${char === ' ' ? '&nbsp;' : char}</span>`;
            })
            .join('');
    }
}

// ============================================
// MOUSE PARALLAX EFFECT
// ============================================
class MouseParallax {
    constructor(selector, intensity = 20) {
        this.elements = document.querySelectorAll(selector);
        this.intensity = intensity;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

            this.elements.forEach((el, index) => {
                const depth = (index + 1) * 0.5;
                const moveX = x * this.intensity * depth;
                const moveY = y * this.intensity * depth;
                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
}

// Usage
new MouseParallax('.work-item', 15);

// ============================================
// INTERSECTION OBSERVER WITH CALLBACK
// ============================================
class ScrollTrigger {
    constructor(selector, callback, options = {}) {
        this.elements = document.querySelectorAll(selector);
        this.callback = callback;
        this.options = {
            threshold: 0.2,
            rootMargin: '0px',
            ...options
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.callback(entry.target);
                    if (this.options.once) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, this.options);

        this.elements.forEach(el => observer.observe(el));
    }
}

// Usage
new ScrollTrigger('.work-item', (element) => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
}, { once: true });

// ============================================
// TYPING EFFECT
// ============================================
class TypeWriter {
    constructor(element, speed = 50) {
        this.element = element;
        this.text = element.textContent;
        this.speed = speed;
        this.index = 0;
        this.element.textContent = '';
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }

    start() {
        this.type();
    }
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
class ScrollProgress {
    constructor() {
        this.bar = document.createElement('div');
        this.bar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 2px;
            background: #111;
            width: 0%;
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(this.bar);
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            this.bar.style.width = scrolled + '%';
        });
    }
}

new ScrollProgress();

// ============================================
// LAZY LOAD IMAGES
// ============================================
class LazyLoader {
    constructor(selector = 'img[data-src]') {
        this.images = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        this.images.forEach(img => observer.observe(img));
    }
}

// ============================================
// RIPPLE EFFECT ON CLICK
// ============================================
class RippleEffect {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            element.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: rgba(17, 17, 17, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                `;

                element.style.position = 'relative';
                element.style.overflow = 'hidden';
                element.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

new RippleEffect('.work-item, a');