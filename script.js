// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = 70;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .future-card, .timeline-item, .profile-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    const heroHeight = hero ? hero.offsetHeight : 0;
    
    if (hero && scrolled < heroHeight) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Button Hover Effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Card Hover Effects
document.querySelectorAll('.about-card, .future-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #B5A084 0%, #C4B896 100%);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Menu Styles
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: white;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 50px;
            transition: left 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

// Add mobile menu styles to head
const style = document.createElement('style');
style.textContent = mobileMenuStyles;
document.head.appendChild(style);

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #B5A084 0%, #C4B896 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.8s ease;
    `;
    
    // Create loading text
    const loadingText = document.createElement('div');
    loadingText.textContent = 'たのしくなる仕組みをつくろう';
    loadingText.style.cssText = `
        font-family: 'Inter', 'Noto Sans JP', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
        margin-bottom: 40px;
        letter-spacing: -0.02em;
        opacity: 0.9;
        animation: fadeInOut 2s ease-in-out infinite;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 60px;
        height: 60px;
        border: 4px solid rgba(255, 255, 255, 0.2);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1.2s linear infinite;
        box-shadow: 0 4px 20px rgba(181, 160, 132, 0.3);
    `;
    
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        width: 200px;
        height: 3px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 2px;
        margin-top: 30px;
        overflow: hidden;
    `;
    
    const progressFill = document.createElement('div');
    progressFill.style.cssText = `
        width: 0%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 2px;
        transition: width 0.3s ease;
        animation: progress 1.5s ease-in-out forwards;
    `;
    
    progressBar.appendChild(progressFill);
    preloader.appendChild(loadingText);
    preloader.appendChild(spinner);
    preloader.appendChild(progressBar);
    document.body.appendChild(preloader);
    
    // Add animations
    const animations = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeInOut {
            0%, 100% { opacity: 0.9; }
            50% { opacity: 0.6; }
        }
        
        @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
        }
    `;
    
    const animationStyle = document.createElement('style');
    animationStyle.textContent = animations;
    document.head.appendChild(animationStyle);
    
    // Hide preloader after content is loaded
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 800);
    }, 1500);
});

// App Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('appModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalAppName = document.getElementById('modalAppName');
    const modalDescription = document.getElementById('modalDescription');
    const appIcons = document.querySelectorAll('.app-icon');
    
    // App data
    const appData = {
        'star-task': {
            name: '星にタスクを',
            description: '個人向けのタスク管理アプリです。 従来の横長のガントチャートとは異なり、スマートフォンでも見やすい"縦型デザイン"でタスクの進捗を一目で把握できます。',
            image: 'images/1.png'
        },
        'chiikusa': {
            name: 'ちいくさ日記',
            description: '毎日1分、簡単日記で草生やし。簡単なメモからAIが日記を生成してくれるから、誰でも簡単に日記が付けられます。GitHub連携でアップロードすれば、草も生やせます。',
            image: 'images/2.png'
        },
        'flowcodelinks': {
            name: 'FlowCodeLinks',
            description: 'コードの流れを掴み、ファイル間の繋がりを分かりやすくする。新しいコードリーディング体験を提供します。',
            image: 'images/3.png'
        }
    };
    
    // Show modal
    function showModal(appKey) {
        const app = appData[appKey];
        if (app) {
            modalTitle.textContent = 'アプリ紹介';
            modalAppName.textContent = app.name;
            modalDescription.textContent = app.description;
            modalImage.src = app.image;
            modalImage.alt = app.name;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Hide modal
    function hideModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    appIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const appKey = this.getAttribute('data-app');
            showModal(appKey);
        });
    });
    
    modalClose.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', hideModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideModal();
        }
    });
});
