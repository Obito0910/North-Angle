// North Angle Architecture Portfolio - Main JavaScript File

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeArchTools();
    initializePageTransitions();
    initializeScrollAnimations();
    
    // Page-specific initializations
    if (document.querySelector('.projects-grid-page')) {
        initializeProjectFilter();
        initializeProjectModal();
    }
    
    if (document.querySelector('.plan-form')) {
        initializePlanForm();
    }
    
    if (document.querySelector('.contact-form')) {
        initializeContactForm();
    }
});

// Theme Toggle Functionality
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(themeIcon, currentTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeIcon, newTheme);
    });
}

function updateThemeIcon(iconElement, theme) {
    iconElement.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Navigation Functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '0';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        }
    });
}

// Architectural Tools Animation
function initializeArchTools() {
    const tools = document.querySelectorAll('.tool');
    
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        tools.forEach(tool => {
            const speed = parseFloat(tool.getAttribute('data-speed')) || 0.5;
            const yPos = -(scrollPosition * speed);
            const rotation = scrollPosition * 0.1;
            
            tool.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });
    });
    
    // Gentle floating animation
    tools.forEach((tool, index) => {
        // Stagger the animation start for each tool
        setTimeout(() => {
            tool.style.animation = `float 6s ease-in-out ${index * 1.5}s infinite`;
        }, index * 500);
    });
    
    // Add keyframes for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
    `;
    document.head.appendChild(style);
}

// Page Transitions
function initializePageTransitions() {
    // Add fade-in animation to page content
    const mainContent = document.querySelector('body');
    mainContent.style.opacity = '0';
    mainContent.style.transition = 'opacity 0.5s ease';
    
    // Fade in content after a short delay
    setTimeout(() => {
        mainContent.style.opacity = '1';
    }, 100);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.project-card, .service-card, .principle, .process-step, .faq-item');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial state and observe
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(element);
    });
}

// Project Filter Functionality (Projects Page)
function initializeProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Project Modal Functionality (Projects Page)
function initializeProjectModal() {
    const modal = document.getElementById('project-modal');
    const viewButtons = document.querySelectorAll('.view-project');
    const closeModal = document.querySelector('.close-modal');
    
    // Project data (in a real application, this would come from a database)
    const projects = {
        1: {
            title: 'Skyline Residence',
            category: 'Residential',
            year: '2022',
            description: 'A modern luxury home designed with panoramic city views in mind. This residence features floor-to-ceiling windows, an open floor plan, and sustainable materials throughout.',
            details: [
                'Location: Urban Center',
                'Size: 4,500 sq ft',
                'Materials: Glass, Steel, Sustainable Wood',
                'Features: Rooftop Garden, Smart Home Integration'
            ],
            images: [
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]
        },
        2: {
            title: 'North Angle Offices',
            category: 'Commercial',
            year: '2021',
            description: 'Our own office space designed to reflect our architectural philosophy. The building features sustainable design elements, natural lighting, and flexible workspaces.',
            details: [
                'Location: Creative District',
                'Size: 10,000 sq ft',
                'Materials: Recycled Steel, Glass, Bamboo',
                'Features: Green Roof, Solar Panels, Rainwater Harvesting'
            ],
            images: [
                'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]
        },
        3: {
            title: 'Riverfront Cultural Center',
            category: 'Public',
            year: '2020',
            description: 'A community space that blends traditional architectural elements with modern design. The center hosts cultural events, exhibitions, and community gatherings.',
            details: [
                'Location: Riverfront Park',
                'Size: 15,000 sq ft',
                'Materials: Local Stone, Glass, Timber',
                'Features: Amphitheater, Exhibition Halls, Community Kitchen'
            ],
            images: [
                'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]
        }
        // Additional projects would be defined here
    };
    
    // Open modal when project is clicked
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    // Close modal when X is clicked
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close modal when clicking outside content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    function openProjectModal(projectId) {
        const project = projects[projectId];
        if (!project) return;
        
        // Populate modal with project data
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-category').textContent = project.category;
        document.getElementById('modal-year').textContent = `Year: ${project.year}`;
        document.getElementById('modal-description').textContent = project.description;
        
        // Set main image
        const mainImage = document.getElementById('modal-main-image');
        mainImage.src = project.images[0];
        mainImage.alt = project.title;
        
        // Populate thumbnails
        const thumbnailsContainer = document.querySelector('.modal-thumbnails');
        thumbnailsContainer.innerHTML = '';
        
        project.images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image;
            thumbnail.alt = `${project.title} - Image ${index + 1}`;
            thumbnail.addEventListener('click', function() {
                mainImage.src = image;
                // Update active thumbnail
                document.querySelectorAll('.modal-thumbnails img').forEach(img => {
                    img.classList.remove('active');
                });
                this.classList.add('active');
            });
            
            if (index === 0) thumbnail.classList.add('active');
            thumbnailsContainer.appendChild(thumbnail);
        });
        
        // Populate project details
        const detailsList = document.getElementById('modal-details');
        detailsList.innerHTML = '';
        
        project.details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            detailsList.appendChild(li);
        });
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

// Custom Plan Form (Services Page)
function initializePlanForm() {
    const planForm = document.getElementById('plan-form');
    
    planForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        if (validateForm(this)) {
            // In a real application, you would send the form data to a server
            // For this demo, we'll just show a success message
            showNotification('Thank you for your request! We will contact you within 24 hours.', 'success');
            this.reset();
        }
    });
    
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
                
                // Remove error style when user starts typing
                input.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.style.borderColor = '';
                    }
                });
            } else {
                input.style.borderColor = '';
            }
        });
        
        return isValid;
    }
}

// Contact Form (Contact Page)
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        if (validateContactForm(this)) {
            // In a real application, you would send the form data to a server
            // For this demo, we'll just show a success message
            showNotification('Your message has been sent successfully! We will respond as soon as possible.', 'success');
            this.reset();
        }
    });
    
    function validateContactForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
                
                // Remove error style when user starts typing
                input.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.style.borderColor = '';
                    }
                });
            } else {
                input.style.borderColor = '';
            }
        });
        
        // Email validation
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = 'red';
                showNotification('Please enter a valid email address.', 'error');
            }
        }
        
        return isValid;
    }
}

// Notification System
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        transition: transform 0.3s ease, opacity 0.3s ease;
        transform: translateX(100%);
        opacity: 0;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#F44336';
    } else {
        notification.style.backgroundColor = '#2196F3';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Image Lazy Loading
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);
