// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
    const isActive = navMenu.classList.contains('active');
    
    if (isActive) {
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    } else {
        navMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

function closeMenu() {
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

if (menuToggle && navMenu && menuOverlay) {
    menuToggle.addEventListener('click', toggleMenu);
    menuToggle.addEventListener('touchend', (e) => {
        e.preventDefault();
        toggleMenu();
    });
    
    // Close menu when clicking on overlay
    menuOverlay.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('touchend', closeMenu);
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
        link.addEventListener('touchend', (e) => {
            e.preventDefault();
            link.click();
        });
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Adjust header offset based on screen size
            const headerOffset = window.innerWidth <= 768 ? 70 : 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Form submission handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send the data to a server
        // For now, we'll just show an alert
        alert('Obrigado pela sua mensagem! Entraremos em contacto em breve.\n\n' +
              'Nome: ' + data.name + '\n' +
              'Email: ' + data.email + '\n' +
              'Telefone: ' + data.phone + '\n' +
              'Serviço: ' + data.service + '\n' +
              'Mensagem: ' + data.message);
        
        // Reset form
        this.reset();
        
        // In a real application, you would send this data to your backend:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert('Mensagem enviada com sucesso!');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     alert('Erro ao enviar mensagem. Por favor, tente novamente.');
        // });
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and info cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const infoCards = document.querySelectorAll('.info-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    [...serviceCards, ...infoCards, ...testimonialCards].forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add active state styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Services Banner Carousel
const bannerSlides = document.querySelectorAll('.banner-slide');
let currentSlide = 0;

function showNextBanner() {
    if (bannerSlides.length === 0) return;
    
    // Remove active class from current slide
    bannerSlides[currentSlide].classList.remove('active');
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % bannerSlides.length;
    
    // Add active class to next slide
    bannerSlides[currentSlide].classList.add('active');
}

// Start carousel if banners exist
if (bannerSlides.length > 0) {
    // Set initial active slide
    bannerSlides[0].classList.add('active');
    
    // Change banner every 4 seconds
    setInterval(showNextBanner, 4000);
}

// Quote Calculator - Detailed with Brands and Models
const quoteForm = document.getElementById('quoteForm');
const calculatorResult = document.getElementById('calculatorResult');
const deviceTypeSelect = document.getElementById('deviceType');
const brandSelect = document.getElementById('brand');
const modelSelect = document.getElementById('model');
const brandGroup = document.getElementById('brandGroup');
const modelGroup = document.getElementById('modelGroup');

// Device data structure with brands and models
const deviceData = {
    telemovel: {
        brands: ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OnePlus', 'Google', 'Motorola', 'Nokia'],
        models: {
            'Apple': ['iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17', 'iPhone 17 Air', 'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16', 'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14', 'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 mini', 'iPhone 12', 'iPhone 12 mini', 'iPhone 11', 'iPhone SE (3ª geração)'],
            'Samsung': ['Galaxy S25 Ultra', 'Galaxy S25+', 'Galaxy S25', 'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy Z Fold6', 'Galaxy Z Flip6', 'Galaxy Z Fold5', 'Galaxy Z Flip5', 'Galaxy A55', 'Galaxy A54', 'Galaxy A35', 'Galaxy A34', 'Galaxy A25', 'Galaxy A24', 'Galaxy Note 20'],
            'Xiaomi': ['Xiaomi 15 Pro', 'Xiaomi 15', 'Xiaomi 14 Ultra', 'Xiaomi 14 Pro', 'Xiaomi 14', 'Redmi Note 14 Pro', 'Redmi Note 14', 'Redmi Note 13 Pro', 'Redmi Note 13', 'Redmi 13', 'POCO X6 Pro', 'POCO X6', 'POCO F6', 'POCO F5', 'Mi 13 Pro', 'Mi 13'],
            'Huawei': ['Pura 70 Ultra', 'Pura 70 Pro', 'Pura 70', 'Mate 60 Pro', 'Mate 60', 'P60 Pro', 'P60', 'Nova 12', 'Nova 11', 'Nova 10'],
            'OnePlus': ['OnePlus 13', 'OnePlus 12', 'OnePlus 12R', 'OnePlus 11', 'OnePlus 10 Pro', 'OnePlus 10T', 'OnePlus Nord 4', 'OnePlus Nord 3', 'OnePlus Nord'],
            'Google': ['Pixel 9 Pro XL', 'Pixel 9 Pro', 'Pixel 9', 'Pixel 8a', 'Pixel 8 Pro', 'Pixel 8', 'Pixel 7a', 'Pixel 7 Pro', 'Pixel 7', 'Pixel 6 Pro', 'Pixel 6'],
            'Motorola': ['Edge 50 Ultra', 'Edge 50 Pro', 'Edge 50', 'Edge 40 Pro', 'Edge 40', 'Razr 50 Ultra', 'Razr 50', 'Razr 40', 'Moto G85', 'Moto G84', 'Moto G73'],
            'Nokia': ['G60 5G', 'X30 5G', 'G50', 'X20', '8.3 5G']
        },
        basePrices: {
            'Apple': { ecra: 120, bateria: 65, agua: 150, software: 45, hardware: 80, limpeza: 30, outro: 60 },
            'Samsung': { ecra: 90, bateria: 50, agua: 130, software: 35, hardware: 70, limpeza: 25, outro: 55 },
            'Xiaomi': { ecra: 70, bateria: 40, agua: 100, software: 30, hardware: 60, limpeza: 20, outro: 45 },
            'Huawei': { ecra: 85, bateria: 48, agua: 120, software: 32, hardware: 65, limpeza: 22, outro: 50 },
            'OnePlus': { ecra: 75, bateria: 42, agua: 110, software: 30, hardware: 62, limpeza: 21, outro: 47 },
            'Google': { ecra: 95, bateria: 52, agua: 135, software: 38, hardware: 72, limpeza: 26, outro: 58 },
            'Motorola': { ecra: 65, bateria: 38, agua: 95, software: 28, hardware: 55, limpeza: 18, outro: 42 },
            'Nokia': { ecra: 60, bateria: 35, agua: 90, software: 25, hardware: 50, limpeza: 15, outro: 40 }
        },
        modelMultipliers: {
            'Apple': { 'iPhone 17 Pro Max': 1.4, 'iPhone 17 Pro': 1.35, 'iPhone 17': 1.3, 'iPhone 17 Air': 1.3, 'iPhone 16 Pro Max': 1.3, 'iPhone 16 Pro': 1.25, 'iPhone 16': 1.2, 'iPhone 15 Pro Max': 1.2, 'iPhone 15 Pro': 1.15, 'iPhone 15': 1.1, 'iPhone 14 Pro Max': 1.1, 'iPhone 14 Pro': 1.05, 'iPhone 14': 1.0, 'iPhone 13 Pro Max': 0.95, 'iPhone 13 Pro': 0.9, 'iPhone 13': 0.85, 'iPhone 13 mini': 0.8, 'iPhone 12': 0.8, 'iPhone 12 mini': 0.75, 'iPhone 11': 0.75, 'iPhone SE (3ª geração)': 0.7 },
            'Samsung': { 'Galaxy S25 Ultra': 1.25, 'Galaxy S25+': 1.2, 'Galaxy S25': 1.15, 'Galaxy S24 Ultra': 1.15, 'Galaxy S24+': 1.1, 'Galaxy S24': 1.05, 'Galaxy S23 Ultra': 1.1, 'Galaxy S23+': 1.05, 'Galaxy S23': 1.0, 'Galaxy Z Fold6': 1.35, 'Galaxy Z Flip6': 1.25, 'Galaxy Z Fold5': 1.3, 'Galaxy Z Flip5': 1.2, 'Galaxy A55': 0.9, 'Galaxy A54': 0.85, 'Galaxy A35': 0.85, 'Galaxy A34': 0.8, 'Galaxy A25': 0.8, 'Galaxy A24': 0.75, 'Galaxy Note 20': 0.9 },
            'Xiaomi': { 'Xiaomi 15 Pro': 1.15, 'Xiaomi 15': 1.1, 'Xiaomi 14 Ultra': 1.1, 'Xiaomi 14 Pro': 1.05, 'Xiaomi 14': 1.0, 'Redmi Note 14 Pro': 0.9, 'Redmi Note 14': 0.85, 'Redmi Note 13 Pro': 0.88, 'Redmi Note 13': 0.83, 'Redmi 13': 0.78, 'POCO X6 Pro': 0.9, 'POCO X6': 0.85, 'POCO F6': 0.92, 'POCO F5': 0.85, 'Mi 13 Pro': 1.0, 'Mi 13': 0.95 },
            'Huawei': { 'Pura 70 Ultra': 1.2, 'Pura 70 Pro': 1.15, 'Pura 70': 1.1, 'Mate 60 Pro': 1.15, 'Mate 60': 1.1, 'P60 Pro': 1.05, 'P60': 1.0, 'Nova 12': 0.9, 'Nova 11': 0.85, 'Nova 10': 0.8 },
            'OnePlus': { 'OnePlus 13': 1.15, 'OnePlus 12': 1.1, 'OnePlus 12R': 1.05, 'OnePlus 11': 1.0, 'OnePlus 10 Pro': 0.95, 'OnePlus 10T': 0.9, 'OnePlus Nord 4': 0.85, 'OnePlus Nord 3': 0.8, 'OnePlus Nord': 0.75 },
            'Google': { 'Pixel 9 Pro XL': 1.2, 'Pixel 9 Pro': 1.15, 'Pixel 9': 1.1, 'Pixel 8a': 1.0, 'Pixel 8 Pro': 1.1, 'Pixel 8': 1.05, 'Pixel 7a': 0.95, 'Pixel 7 Pro': 1.0, 'Pixel 7': 0.95, 'Pixel 6 Pro': 0.9, 'Pixel 6': 0.85 },
            'Motorola': { 'Edge 50 Ultra': 1.05, 'Edge 50 Pro': 1.0, 'Edge 50': 0.95, 'Edge 40 Pro': 0.9, 'Edge 40': 0.85, 'Razr 50 Ultra': 1.2, 'Razr 50': 1.15, 'Razr 40': 1.1, 'Moto G85': 0.8, 'Moto G84': 0.75, 'Moto G73': 0.7 },
            'Nokia': { 'G60 5G': 0.8, 'X30 5G': 0.85, 'G50': 0.75, 'X20': 0.7, '8.3 5G': 0.8 }
        }
    },
    computador: {
        brands: ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Razer'],
        models: {
            'Apple': ['MacBook Pro 16" M3', 'MacBook Pro 14" M3', 'MacBook Air 15" M2', 'MacBook Air 13" M2', 'MacBook Pro 13" M2', 'iMac 24" M3', 'Mac Mini M2'],
            'Dell': ['XPS 15', 'XPS 13', 'Inspiron 15', 'Inspiron 14', 'Latitude 5520', 'Alienware m18', 'Alienware x15'],
            'HP': ['Spectre x360', 'Envy 15', 'Pavilion 15', 'Pavilion 14', 'EliteBook 850', 'Omen 17', 'Victus 16'],
            'Lenovo': ['ThinkPad X1 Carbon', 'ThinkPad T14', 'IdeaPad 5', 'IdeaPad 3', 'Legion 5 Pro', 'Yoga 9i', 'Yoga 7i'],
            'ASUS': ['ROG Strix G18', 'ROG Zephyrus G16', 'VivoBook 15', 'VivoBook 14', 'ZenBook 14', 'TUF Gaming A15', 'ROG Flow X13'],
            'Acer': ['Predator Helios 16', 'Nitro 5', 'Aspire 5', 'Aspire 3', 'Swift 3', 'Spin 5', 'ConceptD 7'],
            'MSI': ['Raider GE78', 'Stealth 16', 'Katana 15', 'Crosshair 15', 'Pulse 15', 'Summit E16', 'Creator Z17'],
            'Razer': ['Blade 18', 'Blade 16', 'Blade 15', 'Blade 14', 'Blade Stealth 13']
        },
        basePrices: {
            'Apple': { ecra: 350, bateria: 180, agua: 450, software: 80, hardware: 200, limpeza: 50, outro: 150 },
            'Dell': { ecra: 280, bateria: 150, agua: 380, software: 70, hardware: 180, limpeza: 45, outro: 130 },
            'HP': { ecra: 260, bateria: 140, agua: 360, software: 65, hardware: 170, limpeza: 42, outro: 125 },
            'Lenovo': { ecra: 270, bateria: 145, agua: 370, software: 68, hardware: 175, limpeza: 43, outro: 128 },
            'ASUS': { ecra: 290, bateria: 155, agua: 390, software: 72, hardware: 185, limpeza: 46, outro: 135 },
            'Acer': { ecra: 250, bateria: 135, agua: 350, software: 62, hardware: 165, limpeza: 40, outro: 120 },
            'MSI': { ecra: 300, bateria: 160, agua: 400, software: 75, hardware: 190, limpeza: 48, outro: 140 },
            'Razer': { ecra: 320, bateria: 170, agua: 420, software: 78, hardware: 195, limpeza: 50, outro: 145 }
        },
        modelMultipliers: {
            'Apple': { 'MacBook Pro 16" M3': 1.2, 'MacBook Pro 14" M3': 1.15, 'MacBook Air 15" M2': 1.1, 'MacBook Air 13" M2': 1.05, 'MacBook Pro 13" M2': 1.0, 'iMac 24" M3': 1.1, 'Mac Mini M2': 0.9 },
            'Dell': { 'XPS 15': 1.1, 'XPS 13': 1.05, 'Inspiron 15': 0.85, 'Inspiron 14': 0.8, 'Latitude 5520': 0.95, 'Alienware m18': 1.2, 'Alienware x15': 1.15 },
            'HP': { 'Spectre x360': 1.1, 'Envy 15': 1.0, 'Pavilion 15': 0.85, 'Pavilion 14': 0.8, 'EliteBook 850': 0.95, 'Omen 17': 1.15, 'Victus 16': 1.05 },
            'Lenovo': { 'ThinkPad X1 Carbon': 1.1, 'ThinkPad T14': 1.0, 'IdeaPad 5': 0.9, 'IdeaPad 3': 0.8, 'Legion 5 Pro': 1.15, 'Yoga 9i': 1.05, 'Yoga 7i': 0.95 },
            'ASUS': { 'ROG Strix G18': 1.2, 'ROG Zephyrus G16': 1.15, 'VivoBook 15': 0.85, 'VivoBook 14': 0.8, 'ZenBook 14': 1.0, 'TUF Gaming A15': 1.1, 'ROG Flow X13': 1.15 },
            'Acer': { 'Predator Helios 16': 1.15, 'Nitro 5': 1.0, 'Aspire 5': 0.85, 'Aspire 3': 0.75, 'Swift 3': 0.9, 'Spin 5': 0.95, 'ConceptD 7': 1.1 },
            'MSI': { 'Raider GE78': 1.2, 'Stealth 16': 1.15, 'Katana 15': 1.05, 'Crosshair 15': 1.1, 'Pulse 15': 1.0, 'Summit E16': 1.1, 'Creator Z17': 1.15 },
            'Razer': { 'Blade 18': 1.25, 'Blade 16': 1.2, 'Blade 15': 1.15, 'Blade 14': 1.1, 'Blade Stealth 13': 1.05 }
        }
    },
    tablet: {
        brands: ['Apple', 'Samsung', 'Lenovo', 'Xiaomi', 'Huawei', 'Amazon'],
        models: {
            'Apple': ['iPad Pro 12.9"', 'iPad Pro 11"', 'iPad Air', 'iPad', 'iPad mini'],
            'Samsung': ['Galaxy Tab S9 Ultra', 'Galaxy Tab S9+', 'Galaxy Tab S9', 'Galaxy Tab A9+', 'Galaxy Tab A9'],
            'Lenovo': ['Tab P12 Pro', 'Tab P11 Pro', 'Tab M10 Plus', 'Tab M9'],
            'Xiaomi': ['Pad 6', 'Pad 5', 'Redmi Pad'],
            'Huawei': ['MatePad Pro', 'MatePad 11', 'MatePad SE'],
            'Amazon': ['Fire Max 11', 'Fire HD 10', 'Fire HD 8']
        },
        basePrices: {
            'Apple': { ecra: 200, bateria: 100, agua: 250, software: 50, hardware: 120, limpeza: 35, outro: 90 },
            'Samsung': { ecra: 150, bateria: 80, agua: 200, software: 40, hardware: 100, limpeza: 30, outro: 75 },
            'Lenovo': { ecra: 130, bateria: 70, agua: 180, software: 35, hardware: 90, limpeza: 25, outro: 65 },
            'Xiaomi': { ecra: 120, bateria: 65, agua: 170, software: 32, hardware: 85, limpeza: 23, outro: 60 },
            'Huawei': { ecra: 140, bateria: 75, agua: 190, software: 38, hardware: 95, limpeza: 28, outro: 70 },
            'Amazon': { ecra: 80, bateria: 50, agua: 120, software: 25, hardware: 70, limpeza: 20, outro: 50 }
        },
        modelMultipliers: {
            'Apple': { 'iPad Pro 12.9"': 1.2, 'iPad Pro 11"': 1.15, 'iPad Air': 1.0, 'iPad': 0.9, 'iPad mini': 0.85 },
            'Samsung': { 'Galaxy Tab S9 Ultra': 1.15, 'Galaxy Tab S9+': 1.1, 'Galaxy Tab S9': 1.05, 'Galaxy Tab A9+': 0.85, 'Galaxy Tab A9': 0.8 },
            'Lenovo': { 'Tab P12 Pro': 1.1, 'Tab P11 Pro': 1.0, 'Tab M10 Plus': 0.85, 'Tab M9': 0.75 },
            'Xiaomi': { 'Pad 6': 1.0, 'Pad 5': 0.9, 'Redmi Pad': 0.8 },
            'Huawei': { 'MatePad Pro': 1.1, 'MatePad 11': 1.0, 'MatePad SE': 0.85 },
            'Amazon': { 'Fire Max 11': 0.9, 'Fire HD 10': 0.8, 'Fire HD 8': 0.7 }
        }
    },
    impressora: {
        brands: ['HP', 'Canon', 'Epson', 'Brother', 'Xerox', 'Samsung'],
        models: {
            'HP': ['LaserJet Pro', 'DeskJet Plus', 'OfficeJet Pro', 'Envy Photo', 'Smart Tank'],
            'Canon': ['PIXMA G', 'imageCLASS', 'MAXIFY', 'SELPHY', 'PIXMA TR'],
            'Epson': ['EcoTank', 'WorkForce', 'Expression', 'SureColor', 'Stylus'],
            'Brother': ['HL-L', 'MFC-L', 'DCP-L', 'QL', 'PT'],
            'Xerox': ['VersaLink', 'AltaLink', 'WorkCentre', 'Phaser'],
            'Samsung': ['Xpress', 'ProXpress', 'CLX', 'SCX']
        },
        basePrices: {
            'HP': { ecra: 0, bateria: 0, agua: 120, software: 40, hardware: 80, limpeza: 30, outro: 60 },
            'Canon': { ecra: 0, bateria: 0, agua: 110, software: 38, hardware: 75, limpeza: 28, outro: 58 },
            'Epson': { ecra: 0, bateria: 0, agua: 130, software: 42, hardware: 85, limpeza: 32, outro: 62 },
            'Brother': { ecra: 0, bateria: 0, agua: 115, software: 36, hardware: 78, limpeza: 27, outro: 57 },
            'Xerox': { ecra: 0, bateria: 0, agua: 140, software: 45, hardware: 90, limpeza: 35, outro: 65 },
            'Samsung': { ecra: 0, bateria: 0, agua: 125, software: 41, hardware: 82, limpeza: 31, outro: 61 }
        },
        modelMultipliers: {
            'HP': { 'LaserJet Pro': 1.1, 'DeskJet Plus': 0.9, 'OfficeJet Pro': 1.0, 'Envy Photo': 0.95, 'Smart Tank': 1.05 },
            'Canon': { 'PIXMA G': 1.0, 'imageCLASS': 1.1, 'MAXIFY': 1.05, 'SELPHY': 0.9, 'PIXMA TR': 0.95 },
            'Epson': { 'EcoTank': 1.1, 'WorkForce': 1.05, 'Expression': 0.9, 'SureColor': 1.15, 'Stylus': 0.95 },
            'Brother': { 'HL-L': 1.0, 'MFC-L': 1.05, 'DCP-L': 0.95, 'QL': 0.9, 'PT': 0.85 },
            'Xerox': { 'VersaLink': 1.1, 'AltaLink': 1.15, 'WorkCentre': 1.05, 'Phaser': 1.0 },
            'Samsung': { 'Xpress': 0.95, 'ProXpress': 1.05, 'CLX': 1.0, 'SCX': 0.9 }
        }
    },
    consola: {
        brands: ['Sony', 'Microsoft', 'Nintendo'],
        models: {
            'Sony': ['PlayStation 5', 'PlayStation 5 Digital', 'PlayStation 4 Pro', 'PlayStation 4 Slim', 'PlayStation 4'],
            'Microsoft': ['Xbox Series X', 'Xbox Series S', 'Xbox One X', 'Xbox One S', 'Xbox One'],
            'Nintendo': ['Nintendo Switch OLED', 'Nintendo Switch', 'Nintendo Switch Lite', 'Nintendo Wii U', 'Nintendo 3DS']
        },
        basePrices: {
            'Sony': { ecra: 0, bateria: 0, agua: 150, software: 60, hardware: 120, limpeza: 40, outro: 100 },
            'Microsoft': { ecra: 0, bateria: 0, agua: 145, software: 58, hardware: 115, limpeza: 38, outro: 95 },
            'Nintendo': { ecra: 0, bateria: 0, agua: 120, software: 50, hardware: 100, limpeza: 35, outro: 85 }
        },
        modelMultipliers: {
            'Sony': { 'PlayStation 5': 1.2, 'PlayStation 5 Digital': 1.15, 'PlayStation 4 Pro': 1.0, 'PlayStation 4 Slim': 0.9, 'PlayStation 4': 0.85 },
            'Microsoft': { 'Xbox Series X': 1.2, 'Xbox Series S': 1.1, 'Xbox One X': 1.0, 'Xbox One S': 0.9, 'Xbox One': 0.85 },
            'Nintendo': { 'Nintendo Switch OLED': 1.1, 'Nintendo Switch': 1.0, 'Nintendo Switch Lite': 0.9, 'Nintendo Wii U': 0.8, 'Nintendo 3DS': 0.75 }
        }
    },
    outro: {
        brands: [],
        models: {},
        basePrices: { outro: { ecra: 55, bateria: 38, agua: 95, software: 33, hardware: 57, limpeza: 23, outro: 47 } },
        modelMultipliers: {}
    }
};

const urgencyMultipliers = {
    normal: 1,
    urgente: 1.3,
    express: 1.6
};

// Handle device type selection
if (deviceTypeSelect) {
    deviceTypeSelect.addEventListener('change', function() {
        const deviceType = this.value;
        
        // Reset brand and model
        brandSelect.innerHTML = '<option value="">Selecione a marca</option>';
        modelSelect.innerHTML = '<option value="">Selecione o modelo</option>';
        
        if (deviceType && deviceType !== 'outro' && deviceData[deviceType]) {
            // Show brand and model fields
            brandGroup.style.display = 'block';
            modelGroup.style.display = 'none';
            
            // Populate brands
            const brands = deviceData[deviceType].brands;
            brands.forEach(brand => {
                const option = document.createElement('option');
                option.value = brand;
                option.textContent = brand;
                brandSelect.appendChild(option);
            });
            
            // Make brand required
            brandSelect.required = true;
            modelSelect.required = true;
        } else {
            // Hide brand and model fields for "outro"
            brandGroup.style.display = 'none';
            modelGroup.style.display = 'none';
            brandSelect.required = false;
            modelSelect.required = false;
        }
    });
}

// Handle brand selection
if (brandSelect) {
    brandSelect.addEventListener('change', function() {
        const deviceType = deviceTypeSelect.value;
        const brand = this.value;
        
        // Reset model
        modelSelect.innerHTML = '<option value="">Selecione o modelo</option>';
        
        if (deviceType && brand && deviceData[deviceType] && deviceData[deviceType].models[brand]) {
            // Show model field
            modelGroup.style.display = 'block';
            
            // Populate models
            const models = deviceData[deviceType].models[brand];
            models.forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });
        } else {
            modelGroup.style.display = 'none';
        }
    });
}

// Reset calculator result when form is reset
if (quoteForm) {
    quoteForm.addEventListener('reset', function() {
        calculatorResult.innerHTML = `
            <div class="result-placeholder">
                <div class="result-icon">💰</div>
                <p>Preencha o formulário para calcular o orçamento</p>
            </div>
        `;
        brandGroup.style.display = 'none';
        modelGroup.style.display = 'none';
        brandSelect.required = false;
        modelSelect.required = false;
    });
    
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const deviceType = deviceTypeSelect.value;
        const brand = brandSelect.value;
        const model = modelSelect.value;
        const problemType = document.getElementById('problemType').value;
        const urgency = document.getElementById('urgency').value;
        
        // Validation
        if (!deviceType || !problemType || !urgency) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        if (deviceType !== 'outro') {
            if (!brand) {
                alert('Por favor, selecione a marca do equipamento.');
                return;
            }
            if (!model) {
                alert('Por favor, selecione o modelo do equipamento.');
                return;
            }
        }
        
        // Calculate price
        let basePrice = 0;
        let modelMultiplier = 1;
        
        if (deviceType === 'outro') {
            // Use generic pricing for "outro"
            basePrice = deviceData.outro.basePrices.outro[problemType] || 50;
        } else {
            // Get base price for brand and problem
            const brandPricing = deviceData[deviceType].basePrices[brand];
            if (brandPricing) {
                basePrice = brandPricing[problemType] || 50;
                
                // Apply model multiplier
                const brandModels = deviceData[deviceType].modelMultipliers[brand];
                if (brandModels && brandModels[model]) {
                    modelMultiplier = brandModels[model];
                }
            } else {
                basePrice = 50; // Fallback
            }
        }
        
        // Apply urgency multiplier
        const urgencyMultiplier = urgencyMultipliers[urgency] || 1;
        const finalPrice = Math.round(basePrice * modelMultiplier * urgencyMultiplier);
        
        // Get display names
        const deviceNames = {
            computador: 'Computador',
            telemovel: 'Telemóvel',
            tablet: 'Tablet',
            impressora: 'Impressora',
            consola: 'Consola',
            outro: 'Outro Equipamento'
        };
        
        const problemNames = {
            ecra: 'Ecrã Partido/Danificado',
            bateria: 'Problema com Bateria',
            agua: 'Dano por Água',
            software: 'Problema de Software',
            hardware: 'Problema de Hardware',
            limpeza: 'Limpeza e Manutenção',
            outro: 'Outro Problema'
        };
        
        const urgencyNames = {
            normal: 'Normal (3-5 dias)',
            urgente: 'Urgente (1-2 dias)',
            express: 'Express (Mesmo dia)'
        };
        
        // Display result
        let resultHTML = `
            <div class="result-content">
                <div class="result-title">💰 Orçamento Estimado</div>
                <div class="result-details">
                    <div class="result-item">
                        <span class="result-item-label">Equipamento:</span>
                        <span class="result-item-value">${deviceNames[deviceType]}</span>
                    </div>
        `;
        
        if (deviceType !== 'outro' && brand && model) {
            resultHTML += `
                    <div class="result-item">
                        <span class="result-item-label">Marca:</span>
                        <span class="result-item-value">${brand}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-item-label">Modelo:</span>
                        <span class="result-item-value">${model}</span>
                    </div>
            `;
        }
        
        resultHTML += `
                    <div class="result-item">
                        <span class="result-item-label">Problema:</span>
                        <span class="result-item-value">${problemNames[problemType]}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-item-label">Urgência:</span>
                        <span class="result-item-value">${urgencyNames[urgency]}</span>
                    </div>
                </div>
                <div class="result-total">
                    <div class="result-total-label">Preço Estimado</div>
                    <div class="result-total-value">€${finalPrice}</div>
                </div>
                <p style="text-align: center; margin-top: 1.5rem; opacity: 0.9; font-size: 0.9rem;">
                    * Este é um orçamento estimado. O preço final pode variar após diagnóstico.
                </p>
                <a href="#contacto" class="btn btn-secondary" style="margin-top: 1.5rem; display: block; text-align: center; background: rgba(255,255,255,0.2); border-color: white;">
                    Solicitar Orçamento Detalhado
                </a>
            </div>
        `;
        
        calculatorResult.innerHTML = resultHTML;
        
        // Scroll to result
        calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// Animated Counter for Statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString('pt-PT');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString('pt-PT');
        }
    }, 16);
}

// Observe statistics section
const statsSection = document.querySelector('.statistics');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    if (stat.textContent === '0') {
                        animateCounter(stat, target);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// FAQ Toggle
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active', !isActive);
    });
});


