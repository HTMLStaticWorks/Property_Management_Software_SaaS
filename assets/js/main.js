document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    
    // Check local storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        root.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            root.setAttribute('data-theme', 'dark');
            updateThemeIcon('dark');
        }
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = root.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }

    // 1b. RTL Toggle
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    
    // Check local storage for RTL
    const currentDir = localStorage.getItem('dir');
    if (currentDir === 'rtl') {
        root.setAttribute('dir', 'rtl');
    } else {
        root.setAttribute('dir', 'ltr'); // default
    }
    
    if (rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', () => {
            const isRtl = root.getAttribute('dir') === 'rtl';
            const newDir = isRtl ? 'ltr' : 'rtl';
            
            root.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    }
    
    // 2. Sticky Navbar
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
    
    // 3. Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    const navbarContainer = document.querySelector('.navbar .container');
    
    // Group theme and rtl toggles
    if (navActions) {
        let wrapper = navActions.querySelector('.theme-rtl-wrapper');
        if (!wrapper) {
            const themeToggle = document.getElementById('theme-toggle');
            const rtlToggle = document.getElementById('rtl-toggle');
            wrapper = document.createElement('div');
            wrapper.className = 'theme-rtl-wrapper';
            if (themeToggle) wrapper.appendChild(themeToggle);
            if (rtlToggle) {
                rtlToggle.style.marginLeft = '0';
                wrapper.appendChild(rtlToggle);
            }
            navActions.insertBefore(wrapper, navActions.firstChild);
        }
    }
    
    function handleMobileNav() {
        if (!navActions || !navLinks || !navbarContainer) return;
        
        if (window.innerWidth <= 1024) {
            if (navActions.parentElement !== navLinks) {
                navActions.classList.add('mobile-active');
                let li = navLinks.querySelector('.mobile-actions-container');
                if (!li) {
                    li = document.createElement('li');
                    li.className = 'mobile-actions-container';
                    li.style.width = '100%';
                    navLinks.appendChild(li);
                }
                li.appendChild(navActions);
            }
        } else {
            const containerLi = navLinks.querySelector('.mobile-actions-container');
            if (containerLi) {
                navActions.classList.remove('mobile-active');
                navbarContainer.appendChild(navActions);
                containerLi.remove();
            }
        }
    }
    
    handleMobileNav();
    window.addEventListener('resize', handleMobileNav);
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
    
    // 4. Initialize AOS Animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
