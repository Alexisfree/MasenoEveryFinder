// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize all animations
    initAnimations();
    initMobileMenu();
    initScrollEffects();
    initSmoothScroll();
    initTabs();
});

function initTabs() {
    // How It Works Page Tabs
    const howItWorksTabs = document.querySelectorAll('.user-type-selection .btn');
    if (howItWorksTabs.length > 0) {
        howItWorksTabs.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle visual state within this group
                howItWorksTabs.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Content switching
                const type = btn.getAttribute('data-user-type');
                if (type) {
                    document.querySelectorAll('.guide-section').forEach(s => s.style.display = 'none');
                    const target = document.getElementById(`${type}-guide`);
                    if (target) {
                        target.style.display = 'block';
                        gsap.fromTo(target,
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
                        );
                    }
                }
            });
        });
    }

    // Blog Category Tabs
    const blogTabs = document.querySelectorAll('.blog-categories .btn');
    if (blogTabs.length > 0) {
        blogTabs.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle visual state within this group
                blogTabs.forEach(b => {
                    b.classList.remove('active');
                    b.classList.remove('btn-primary');
                    b.classList.add('btn-light');
                });

                btn.classList.remove('btn-light');
                btn.classList.add('btn-primary');
                btn.classList.add('active');
            });
        });
    }
}

function initAnimations() {
    // Hero Animations
    const heroTimeline = gsap.timeline();

    heroTimeline
        .to('.hero h1', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        })
        .to('.hero p', {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: -0.8,
            ease: 'power3.out'
        })
        .to('.hero .btn', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            delay: -0.6,
            ease: 'power2.out'
        })
        .to('.hero-img-container', {
            x: 0,
            opacity: 1,
            duration: 1.2,
            delay: -0.8,
            ease: 'power3.out'
        });

    // Feature Cards Staggered Animation
    gsap.to('.feature-card', {
        scrollTrigger: {
            trigger: '.features',
            start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });

    // Section Headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}

function initMobileMenu() {
    const toggler = document.querySelector('.navbar-toggler');
    const collapse = document.querySelector('.navbar-collapse');

    if (toggler && collapse) {
        // Bootstrap handles the toggler click automatically via data-bs-toggle.

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            // Check if the menu is open (has 'show' class)
            if (collapse.classList.contains('show')) {
                // If click is outside menu AND outside toggler
                if (!collapse.contains(e.target) && !toggler.contains(e.target)) {
                    const bsCollapse = bootstrap.Collapse.getInstance(collapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    } else {
                        collapse.classList.remove('show');
                    }
                }
            }
        });

        // Close menu when a nav link is clicked (for single page scrolling)
        const navLinks = collapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const bsCollapse = bootstrap.Collapse.getInstance(collapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else {
                    collapse.classList.remove('show');
                }
            });
        });
    }
}

function initScrollEffects() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}