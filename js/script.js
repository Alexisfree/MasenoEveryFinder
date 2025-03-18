// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    // Initialize mobile menu
    initializeMobileMenu();
    // Initialize scroll effects
    initializeScrollEffects();
    // FAQ Category Filtering
    initializeFAQCategoryFiltering();
    // Blog Page Functionality
    const categoryButtons = document.querySelectorAll('.category-buttons .btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const featuredCard = document.querySelector('.featured-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // Filter blog cards
            blogCards.forEach(card => {
                const cardCategory = card.querySelector('.badge').textContent.toLowerCase();
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide featured card based on category
            if (category === 'all' || category === 'featured') {
                featuredCard.style.display = 'block';
            } else {
                featuredCard.style.display = 'none';
            }
        });
    });

    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            // Here you would typically send this to your backend
            // For now, we'll just show a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.textContent = 'Thank you for subscribing to our newsletter!';
            
            this.appendChild(successMessage);
            emailInput.value = '';

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }

    // Initialize How It Works functionality
    initializeHowItWorks();
});

// Initialize animations
function initializeAnimations() {
    // Add animation class to elements when they come into view
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Initialize mobile menu
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// FAQ Category Filtering
function initializeFAQCategoryFiltering() {
    const categoryButtons = document.querySelectorAll('.category-buttons .btn');
    const faqCategories = document.querySelectorAll('.faq-category');
    const generalCategory = document.getElementById('general');

    // Only proceed if we're on the FAQ page (elements exist)
    if (categoryButtons.length && faqCategories.length && generalCategory) {
        // Show general category by default
        generalCategory.classList.add('active');

        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and categories
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                faqCategories.forEach(category => category.classList.remove('active'));

                // Add active class to clicked button and corresponding category
                this.classList.add('active');
                const categoryId = this.getAttribute('data-category');
                const targetCategory = document.getElementById(categoryId);
                if (targetCategory) {
                    targetCategory.classList.add('active');
                }
            });
        });
    }
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    return isValid;
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    if (validateForm(form.id)) {
        // Here you would typically send the form data to a server
        console.log('Form submitted successfully');
        form.reset();
        alert('Thank you for your message! We will get back to you soon.');
    }
}

// Initialize form handlers
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
});

// How It Works Page Functionality
function initializeHowItWorks() {
    const userTypeButtons = document.querySelectorAll('.user-type-buttons .btn');
    const guideSections = document.querySelectorAll('.guide-section');

    userTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            userTypeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const userType = button.getAttribute('data-user-type');

            // Show/hide guide sections
            guideSections.forEach(section => {
                if (section.id === `${userType}-guide`) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
} 