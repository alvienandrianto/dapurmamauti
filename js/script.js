document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    let lastScrollY = window.scrollY; // Track last scroll position

    // Mobile Menu Toggle
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a navigation link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Navbar Hide/Show and Background Change on Scroll
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const homeSectionHeight = document.getElementById('home').offsetHeight;

        // Change navbar background/shadow after scrolling past home section or a certain threshold
        // The navbar will become solid/semi-transparent after scrolling down from the initial transparent state
        if (currentScrollY > (homeSectionHeight * 0.1)) { // Example: 10% of home section height
            navbar.classList.remove('initial-transparent');
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('initial-transparent');
            navbar.classList.remove('scrolled');
        }

        // Hide/Show navbar based on scroll direction
        // This makes the navbar slide up/down
        if (currentScrollY > lastScrollY && currentScrollY > navbar.offsetHeight) {
            // Scrolling down and scrolled past the initial navbar height
            navbar.classList.add('hidden-on-scroll');
            navbar.classList.remove('scrolled'); // Ensure it becomes fully hidden
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up
            navbar.classList.remove('hidden-on-scroll');
            // If scrolling up, and not in the transparent 'home' zone, re-add 'scrolled'
            if (currentScrollY > (homeSectionHeight * 0.1)) {
                 navbar.classList.add('scrolled');
            }
        }
        lastScrollY = currentScrollY;
    });


    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Calculate offset for fixed navbar
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navbarHeight = navbar.offsetHeight; // Get current navbar height

            // Adjust scroll position to account for fixed navbar
            const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Simple Intersection Observer for Animations (using the idea from your reference)
    // Elements will animate when they enter the viewport
    const animateElements = document.querySelectorAll('.animate-fade-in-up, .animate-slide-in-left, .animate-slide-in-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply animation. The CSS handles the opacity: 0 and transform: initial state.
                // We just need to remove the initial opacity to allow animation to play.
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)'; // Or translateX(0) for slide effects
                // To make sure animation only plays once, remove the animation class after it has started
                // A better approach for single-play animations is to remove the specific animation classes from the element
                // which will be handled by the CSS 'forwards' and 'opacity:0' combined with this JS.
                // For simplicity, we just stop observing here.
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
    });

    animateElements.forEach(element => {
        // Initially hide elements to ensure animation plays on scroll
        element.style.opacity = '0';
        // Add transform properties based on animation type
        if (element.classList.contains('animate-fade-in-up')) {
            element.style.transform = 'translateY(20px)';
        } else if (element.classList.contains('animate-slide-in-left')) {
            element.style.transform = 'translateX(-20px)';
        } else if (element.classList.contains('animate-slide-in-right')) {
            element.style.transform = 'translateX(20px)';
        }
        observer.observe(element);
    });

    // Optional: Auto-fill placeholder images with theme color (for testing)
    // REMOVE THIS BLOCK if you are using actual images!
    document.querySelectorAll('img[src^="https://via.placeholder.com"]').forEach(img => {
        // Only modify if it's a placeholder image
        if (img.src.includes('via.placeholder.com')) {
            const url = new URL(img.src);
            const params = new URLSearchParams(url.search);
            params.set('bg', '4CAF50'); // Greenish color
            params.set('fg', 'FFFFFF'); // White text
            img.src = `${url.origin}${url.pathname}?${params.toString()}`;
        }
    });
});