/**
 * Santhiya Ganesharatnam - Portfolio Interactive Functions
 * Handles Theme Toggle, Sticky Nav, Scrollspy, Mobile Menu, Project Modals & Form Validation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. THEME SWITCHER (DARK / LIGHT MODE)
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    // Default to dark theme (or check saved setting)
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('portfolio-theme', 'dark');
        }
    });

    // ==========================================================================
    // 2. SCROLL BEHAVIOR & STICKY NAVBAR
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // 3. MOBILE MENU TOGGLE
    // ==========================================================================
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = (open) => {
        const isOpen = open !== undefined ? open : menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isOpen);
        if (!isOpen) {
            navMenu.classList.add('open');
        } else {
            navMenu.classList.remove('open');
        }
    };

    menuToggle.addEventListener('click', () => toggleMenu());

    // Close menu when clicking navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(true));
    });

    // ==========================================================================
    // 4. SCROLLSPY (ACTIVE LINK ON SCROLL)
    // ==========================================================================
    const sections = document.querySelectorAll('section, header');
    const scrollspyOptions = {
        root: null,
        rootMargin: '-30% 0px -40% 0px', // Trigger active state when section takes substantial center space
        threshold: 0
    };

    const scrollspyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (!id) return;
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, scrollspyOptions);

    sections.forEach(section => {
        if (section.getAttribute('id')) {
            scrollspyObserver.observe(section);
        }
    });

    // ==========================================================================
    // 5. INTERACTIVE PROJECT DETAILS MODAL
    // ==========================================================================
    // Detailed projects dataset
    const projectsData = {
        ayurveda: {
            title: "Ayurveda Knowledge Platform",
            badge: "Final Year Project",
            subtitle: "PHP • Laravel • MySQL • Groq LLM API",
            image: "ayurveda-project.jpg",
            desc: "A full-stack Ayurveda knowledge platform designed to provide users with Ayurveda-related information through a modern web application. Designed and developed as an individual final-year project, including application development, database design, admin functionality, and AI integration.",
            features: [
                "AI-powered chatbot for real-time natural language health queries",
                "Multilingual AI-assisted Q&A supporting English, Tamil, and Sinhala",
                "Ayurveda centre locator with maps and expert profiles",
                "Comprehensive admin dashboard with full CRUD operations for centres and expert records",
                "MySQL database configuration, schema layout, and backup/recovery procedures"
            ],
            ai: "This project integrates the Groq LLM API to power multilingual, AI-assisted question answering in English, Tamil, and Sinhala.",
            role: "Designed and developed the project as an individual final-year project, including application development, database design, admin functionality, and AI integration.",
            github: "https://github.com/santhiya739"
        },
        "pet-adoption": {
            title: "Pet Adoption Website",
            badge: "Academic Project",
            subtitle: "HTML • CSS • JavaScript • PHP • MySQL",
            image: "pet-adoption.jpg",
            desc: "A pet adoption platform where users can browse rescue pets, view detailed profiles, and reach out to adopt. The project uses a frontend interface with PHP + MySQL backend functionality for pet listings and contact/adoption submissions.",
            features: [
                "Home page with hero section, backgrounds, and featured pet collage",
                "Adopt a Pet listing page showing all available rescue animals",
                "Detailed pet profiles for Max, Luna, Bella, lucky, Blacky, Bam, Rose, Daisy, and other pets",
                "Dynamic pet details page driven by JavaScript to show age, breed, color, and description",
                "Adopt Us contact form that passes selected pet information automatically"
            ],
            ai: null,
            role: "Designed and developed the full website, including UI/UX, page structure, frontend development, pet data integration, and PHP + MySQL backend functionality.",
            github: "https://github.com/santhiya739"
        },
        travelease: {
            title: "TravelEase Local Discovery",
            badge: "Academic Project",
            subtitle: "PHP • MySQL • HTML • CSS • JavaScript",
            image: "travelease.jpg",
            desc: "A PHP and MySQL-based web application that helps users discover nearby stores, restaurants, hotels, and attractions in a local area. The application focuses on simple navigation, useful local discovery features, and interactive UI elements.",
            features: [
                "User signup and login system with secure password hashing backend",
                "Interactive store and product listings with hover-to-reveal detail cards",
                "Google Maps integration supporting direct store and attraction location mapping",
                "MySQL database integration with secure queries",
                "Responsive slider, mobile-friendly navigation header, and contact form"
            ],
            ai: null,
            role: "Designed and developed the full-stack application, including database schema, PHP backend logic, frontend UI, UX design, and database integration.",
            github: "https://github.com/santhiya739"
        }
    };

    const modalOverlay = document.getElementById('project-modal');
    const modalClose = modalOverlay.querySelector('.modal-close');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Modal dynamic fields
    const modalImg = document.getElementById('modal-project-img');
    const modalBadge = document.getElementById('modal-project-badge');
    const modalTitle = document.getElementById('modal-project-title');
    const modalSubtitle = document.getElementById('modal-project-subtitle');
    const modalDesc = document.getElementById('modal-project-desc');
    const modalFeatures = document.getElementById('modal-project-features');
    const modalAiSection = document.getElementById('modal-ai-section');
    const modalProjectAi = document.getElementById('modal-project-ai');
    const modalRole = document.getElementById('modal-project-role');
    const modalGitLink = document.getElementById('modal-github-link');
    const modalGitPlaceholder = document.getElementById('modal-github-placeholder');

    let previousFocusedElement = null;

    const openModal = (projectId, triggerElement) => {
        const data = projectsData[projectId];
        if (!data) return;

        previousFocusedElement = triggerElement;

        // Populate Modal Fields
        modalImg.src = data.image;
        modalImg.alt = data.title;
        modalBadge.textContent = data.badge;
        modalTitle.textContent = data.title;
        modalSubtitle.textContent = data.subtitle;
        modalDesc.textContent = data.desc;
        modalRole.textContent = data.role;

        // Populate Features List
        modalFeatures.innerHTML = '';
        data.features.forEach(feat => {
            const li = document.createElement('li');
            li.textContent = feat;
            modalFeatures.appendChild(li);
        });

        // AI Integration Section
        if (data.ai) {
            modalAiSection.style.display = 'block';
            modalProjectAi.textContent = data.ai;
        } else {
            modalAiSection.style.display = 'none';
        }

        // GitHub Repository URL or Disclaimer
        if (data.github) {
            modalGitLink.href = data.github;
            modalGitLink.style.display = 'inline-flex';
            modalGitPlaceholder.style.display = 'none';
        } else {
            modalGitLink.style.display = 'none';
            modalGitPlaceholder.style.display = 'inline';
        }

        // Open Modal Accessibility & Visibility
        modalOverlay.classList.add('open');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Trap focus to close button
        setTimeout(() => modalClose.focus(), 100);
    };

    const closeModal = () => {
        modalOverlay.classList.remove('open');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        if (previousFocusedElement) {
            previousFocusedElement.focus();
        }
    };

    projectCards.forEach(card => {
        const triggerBtn = card.querySelector('.open-modal-btn');
        const projectId = card.getAttribute('data-project-id');
        
        triggerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(projectId, triggerBtn);
        });

        // Make card clickable itself as a progressive enhancement
        card.addEventListener('click', () => {
            openModal(projectId, triggerBtn);
        });
    });

    modalClose.addEventListener('click', closeModal);
    
    // Close on click outside container
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close on ESC key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
            closeModal();
        }
    });

    // ==========================================================================
    // 6. CONTACT FORM VALIDATION & SIMULATED SUBMIT
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    const validateField = (input, errorSpanId) => {
        const parent = input.parentElement;
        const errorSpan = document.getElementById(errorSpanId);
        let isValid = true;

        if (input.required && !input.value.trim()) {
            isValid = false;
        } else if (input.type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value.trim())) {
                isValid = false;
            }
        }

        if (!isValid) {
            parent.classList.add('invalid');
        } else {
            parent.classList.remove('invalid');
        }

        return isValid;
    };

    // Live validation on blur
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');

    nameInput.addEventListener('blur', () => validateField(nameInput, 'name-error'));
    emailInput.addEventListener('blur', () => validateField(emailInput, 'email-error'));
    subjectInput.addEventListener('blur', () => validateField(subjectInput, 'subject-error'));
    messageInput.addEventListener('blur', () => validateField(messageInput, 'message-error'));

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields on submit
        const isNameValid = validateField(nameInput, 'name-error');
        const isEmailValid = validateField(emailInput, 'email-error');
        const isSubjectValid = validateField(subjectInput, 'subject-error');
        const isMessageValid = validateField(messageInput, 'message-error');

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Success State - Show confirmation banner
            formFeedback.className = 'form-feedback success';
            formFeedback.innerHTML = `
                Thank you, ${nameInput.value.trim()}! Your message has been validation-passed.<br>
                <small style="opacity: 0.85;">(Note: Email backend is currently simulated. Full connection can be configured here.)</small>
            `;
            
            // Reset form
            contactForm.reset();
            
            // Clear invalid classes
            document.querySelectorAll('.form-group').forEach(grp => {
                grp.classList.remove('invalid');
            });

            // Auto-hide feedback after 8 seconds
            setTimeout(() => {
                formFeedback.style.display = 'none';
            }, 8000);
        } else {
            // Error State
            formFeedback.className = 'form-feedback error';
            formFeedback.textContent = 'Please fill out all required fields with valid entries.';
            
            // Auto-hide error after 4 seconds
            setTimeout(() => {
                formFeedback.style.display = 'none';
            }, 4000);
        }
    });
});
