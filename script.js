// ===================================
// Particle Background Animation
// ===================================
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// ===================================
// Counter Animation
// ===================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ===================================
// Smooth Scrolling for Navigation
// ===================================
function initSmoothScroll() {
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

// ===================================
// Active Navigation Link
// ===================================
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
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
}

// ===================================
// Navbar Background on Scroll
// ===================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        }
    });
}

// ===================================
// Scroll Reveal Animation
// ===================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.about, .work, .contact, .project-card, .skill-tag');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===================================
// Form Handling
// ===================================
function initForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simple validation and visual feedback
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;

        button.innerHTML = `
            <span>Sending...</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="30"/>
            </svg>
        `;
        button.disabled = true;

        // Simulate sending (replace with actual form submission)
        setTimeout(() => {
            button.innerHTML = `
                <span>Message Sent!</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
            `;
            button.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.disabled = false;
                form.reset();
            }, 3000);
        }, 1500);
    });
}

// ===================================
// Translations
// ===================================
const translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.work': 'Work',
        'nav.contact': 'Contact',
        'nav.cta': "Let's Talk",

        // Hero Section
        'hero.badge': 'Available for projects',
        'hero.greeting': "Hello, I'm",
        'hero.subtitle': 'Crafting digital experiences that inspire, engage, and transform ideas into reality',
        'hero.btn.work': 'View My Work',
        'hero.btn.contact': 'Get In Touch',

        // Stats
        'stats.projects': 'Projects',
        'stats.years': 'Years Exp',
        'stats.clients': 'Clients',
        'stats.passion': '% Passion',

        // About Section
        'about.tag': 'About Me',
        'about.title': 'Passionate Creator & ',
        'about.title.highlight': 'Problem Solver',
        'about.description': 'I believe in the power of design and technology to create meaningful experiences. Every project is an opportunity to push boundaries and deliver excellence.',

        // Skills
        'skills.design': 'Design',
        'skills.development': 'Development',
        'skills.strategy': 'Strategy',
        'skills.innovation': 'Innovation',
        'skills.creativity': 'Creativity',

        // Work Section
        'work.tag': 'Featured Work',
        'work.title': 'Projects That ',
        'work.title.highlight': 'Inspire',
        'project.view': 'View Project',

        // Project 1
        'project1.category': 'Web Design',
        'project1.title': 'E-Commerce Platform',
        'project1.desc': 'A modern shopping experience with seamless UX',

        // Project 2
        'project2.category': 'Branding',
        'project2.title': 'Brand Identity',
        'project2.desc': 'Complete visual identity transformation',

        // Project 3
        'project3.category': 'Mobile App',
        'project3.title': 'Fitness Tracker',
        'project3.desc': 'Health and wellness at your fingertips',

        // Project 4
        'project4.category': 'IT Support',
        'project4.title': 'IT Assistant',
        'project4.desc': 'AI-powered help desk solution',

        // Project 5
        'project5.category': 'Geospatial',
        'project5.title': 'GIS Platform',
        'project5.desc': 'Interactive mapping and spatial analysis',

        // Project 6
        'project6.category': 'Data Management',
        'project6.title': 'Database System',
        'project6.desc': 'Enterprise data platform solution',

        // Contact Section
        'contact.tag': 'Get In Touch',
        'contact.title': "Let's Create Something ",
        'contact.title.highlight': 'Amazing',
        'contact.description': "Ready to start your next project? I'd love to hear from you and discuss how we can work together.",

        // Form
        'form.name': 'Your Name',
        'form.email': 'Your Email',
        'form.message': 'Your Message',
        'form.submit': 'Send Message',

        // Footer
        'footer.copyright': '© 2026 Bai. Crafted with passion.'
    },
    lo: {
        // Navigation
        'nav.home': 'ໜ້າຫຼັກ',
        'nav.about': 'ກ່ຽວກັບ',
        'nav.work': 'ຜົນງານ',
        'nav.contact': 'ຕິດຕໍ່',
        'nav.cta': 'ລົມກັນ',

        // Hero Section
        'hero.badge': 'ພ້ອມຮັບວຽກໂປຣເຈັກ',
        'hero.greeting': 'ສະບາຍດີ, ຂ້ອຍແມ່ນ',
        'hero.subtitle': 'ສ້າງປະສົບການດິຈິຕອນທີ່ສ້າງແຮງບັນດານໃຈ, ດຶງດູດ, ແລະປ່ຽນຄວາມຄິດໃຫ້ເປັນຄວາມຈິງ',
        'hero.btn.work': 'ເບິ່ງຜົນງານ',
        'hero.btn.contact': 'ຕິດຕໍ່ຫາຂ້ອຍ',

        // Stats
        'stats.projects': 'ໂປຣເຈັກ',
        'stats.years': 'ປີປະສົບການ',
        'stats.clients': 'ລູກຄ້າ',
        'stats.passion': '% ຄວາມມຸ້ງໝັ້ນ',

        // About Section
        'about.tag': 'ກ່ຽວກັບຂ້ອຍ',
        'about.title': 'ຜູ້ສ້າງສັນທີ່ມີຄວາມຫລົງໄຫລ & ',
        'about.title.highlight': 'ນັກແກ້ໄຂບັນຫາ',
        'about.description': 'ຂ້ອຍເຊື່ອໃນພະລັງຂອງການອອກແບບແລະເທັກໂນໂລຍີໃນການສ້າງປະສົບການທີ່ມີຄວາມໝາຍ. ທຸກໂປຣເຈັກແມ່ນໂອກາດໃນການກ້າວຂ້າມຂອບເຂດແລະສົ່ງມອບຄວາມເປັນເລີດ.',

        // Skills
        'skills.design': 'ການອອກແບບ',
        'skills.development': 'ການພັດທະນາ',
        'skills.strategy': 'ຍຸດທະສາດ',
        'skills.innovation': 'ນະວັດຕະກຳ',
        'skills.creativity': 'ຄວາມຄິດສ້າງສັນ',

        // Work Section
        'work.tag': 'ຜົນງານເດັ່ນ',
        'work.title': 'ໂປຣເຈັກທີ່',
        'work.title.highlight': 'ສ້າງແຮງບັນດານໃຈ',
        'project.view': 'ເບິ່ງໂປຣເຈັກ',

        // Project 1
        'project1.category': 'ອອກແບບເວັບ',
        'project1.title': 'ແພລດຟອມອີຄອມເມີສ',
        'project1.desc': 'ປະສົບການຊື້ເຄື່ອງທັນສະໄໝທີ່ມີ UX ທີ່ລຽບງ່າຍ',

        // Project 2
        'project2.category': 'ແບຣນດິ້ງ',
        'project2.title': 'ອັດຕະລັກແບຣນ',
        'project2.desc': 'ການປ່ຽນແປງອັດຕະລັກທາງສາຍຕາຢ່າງສົມບູນ',

        // Project 3
        'project3.category': 'ແອັບມືຖື',
        'project3.title': 'ຕິດຕາມສຸຂະພາບ',
        'project3.desc': 'ສຸຂະພາບແລະຄວາມເປັນຢູ່ດີຢູ່ປາຍນິ້ວມືຂອງທ່ານ',

        // Project 4
        'project4.category': 'ຊ່ວຍເຫຼືອ IT',
        'project4.title': 'ຜູ້ຊ່ວຍ IT',
        'project4.desc': 'ໂຊລູຊັນ Help Desk ທີ່ຂັບເຄື່ອນດ້ວຍ AI',

        // Project 5
        'project5.category': 'ພູມສາດ',
        'project5.title': 'ແພລດຟອມ GIS',
        'project5.desc': 'ແຜນທີ່ເຄື່ອນໄຫວ ແລະການວິເຄາະພື້ນທີ່',

        // Project 6
        'project6.category': 'ການຈັດການຂໍ້ມູນ',
        'project6.title': 'ລະບົບຖານຂໍ້ມູນ',
        'project6.desc': 'ໂຊລູຊັນແພລດຟອມຂໍ້ມູນອົງກອນ',

        // Contact Section
        'contact.tag': 'ຕິດຕໍ່ຫາຂ້ອຍ',
        'contact.title': 'ມາສ້າງບາງສິ່ງທີ່',
        'contact.title.highlight': 'ອັດສະຈັນ',
        'contact.description': 'ພ້ອມທີ່ຈະເລີ່ມໂປຣເຈັກຕໍ່ໄປຂອງທ່ານບໍ? ຂ້ອຍຢາກໄດ້ຍິນຈາກທ່ານແລະປຶກສາຫາລືກ່ຽວກັບວ່າພວກເຮົາສາມາດເຮັດວຽກຮ່ວມກັນໄດ້ແນວໃດ.',

        // Form
        'form.name': 'ຊື່ຂອງທ່ານ',
        'form.email': 'ອີເມວຂອງທ່ານ',
        'form.message': 'ຂໍ້ຄວາມຂອງທ່ານ',
        'form.submit': 'ສົ່ງຂໍ້ຄວາມ',

        // Footer
        'footer.copyright': '© 2026 Bai. ສ້າງດ້ວຍຄວາມຮັກ.'
    }
};

// Current language
let currentLang = localStorage.getItem('language') || 'en';

// Apply translations
function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang === 'lo' ? 'lo' : 'en';

    // Save preference
    localStorage.setItem('language', lang);
    currentLang = lang;
}

// ===================================
// Language Switcher
// ===================================
function initLanguageSwitcher() {
    const langSwitcher = document.querySelector('.lang-switcher');
    const langBtn = document.getElementById('langBtn');
    const langOptions = document.querySelectorAll('.lang-option');
    const langCurrent = document.querySelector('.lang-current');

    // Apply saved language on load
    langCurrent.textContent = currentLang.toUpperCase();
    langOptions.forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('data-lang') === currentLang);
    });
    applyTranslations(currentLang);

    // Toggle dropdown
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langSwitcher.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        langSwitcher.classList.remove('active');
    });

    // Language selection
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');

            // Update active state
            langOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            // Update button text
            langCurrent.textContent = lang.toUpperCase();

            // Close dropdown
            langSwitcher.classList.remove('active');

            // Apply translations
            applyTranslations(lang);
        });
    });
}

// ===================================
// Initialize Everything
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateCounters();
    initSmoothScroll();
    initActiveNav();
    initNavbarScroll();
    initScrollReveal();
    initForm();
    initLanguageSwitcher();
});

// Add spinning animation style for loading
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);
