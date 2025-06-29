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

    // const backToTopButton = document.getElementById('back-to-top-btn');
    // const whatsappButton = document.getElementById('whatsapp-btn');

    // Navbar Hide/Show and Background Change on Scroll
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const homeSection = document.getElementById('home');
        const homeSectionRect = homeSection.getBoundingClientRect();
        const homeSectionBottom = homeSectionRect.bottom;

        // if (window.scrollY > 400) {
        //     backToTopButton.classList.add('show');
        //     whatsappButton.classList.add('show');
        // } else {
        //     backToTopButton.classList.remove('show');
        //     whatsappButton.classList.remove('show');
        // }

        // Change navbar background/shadow based on scroll position relative to home section bottom
        if (homeSectionBottom <= navbar.offsetHeight + 10) { // If home section is scrolled past navbar + a small buffer
            navbar.classList.remove('bg-transparent');
            navbar.classList.add('scrolled'); // Apply solid background and shadow
        } else {
            navbar.classList.add('bg-transparent');
            navbar.classList.remove('scrolled'); // Go back to transparent
        }

        // Hide/Show navbar based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > (navbar.offsetHeight + 50)) {
            navbar.classList.add('hidden-on-scroll');
        } else if (currentScrollY < lastScrollY || currentScrollY <= 0) { // Scrolling up or at the very top
            navbar.classList.remove('hidden-on-scroll');
        }
        lastScrollY = currentScrollY;
    });


    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navbarHeight = navbar.offsetHeight; // Get current navbar height

            const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Intersection Observer for Animations
    const animateElements = document.querySelectorAll('[data-animation]');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.dataset.animation;
                const delay = parseInt(entry.target.dataset.delay) || 0;

                setTimeout(() => {
                    entry.target.classList.add(`${animationType}-active`);
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    animateElements.forEach(element => {
        element.style.opacity = '0';
        const animationType = element.dataset.animation;
        if (animationType === 'fade-in-up') {
            element.style.transform = 'translateY(40px)';
        } else if (animationType === 'slide-in-left') {
            element.style.transform = 'translateX(-40px)';
        } else if (animationType === 'slide-in-right') {
            element.style.transform = 'translateX(40px)';
        }
        observer.observe(element);
    });

    // Initial check for navbar state on page load
    window.dispatchEvent(new Event('scroll'));

    // ===== KODE BARU UNTUK WIDGET DAN TOMBOL AKSI =====

    // Definisikan nomor WA dan pesan default di sini
    const waNumber = '6288232736714'; // GANTI DENGAN NOMOR ANDA!

    // Ambil semua elemen yang diperlukan
    const waChatWindow = document.getElementById('wa-chat-window');
    const waIconBtn = document.getElementById('wa-icon-btn');
    const waCloseBtn = document.getElementById('wa-close-btn');
    const waSendForm = document.getElementById('wa-send-form');
    const waMessageInput = document.getElementById('wa-message-input');
    const backToTopBtn = document.getElementById('back-to-top-btn');

    // Fungsi untuk menampilkan/menyembunyikan tombol berdasarkan scroll
    const toggleVisibility = () => {
        if (window.scrollY > 400) {
            waIconBtn.classList.add('show');
            backToTopBtn.classList.add('show');
        } else {
            waIconBtn.classList.remove('show');
            backToTopBtn.classList.remove('show');
            // Juga sembunyikan jendela chat jika kita scroll ke atas
            waChatWindow.classList.remove('show');
        }
    };
    
    // Terapkan fungsi pada saat scroll
    window.addEventListener('scroll', toggleVisibility);

    // Event listener untuk membuka/menutup jendela chat
    waIconBtn.addEventListener('click', () => {
        waChatWindow.classList.toggle('show');
    });

    waCloseBtn.addEventListener('click', () => {
        waChatWindow.classList.remove('show');
    });

    // Event listener untuk mengirim pesan
    waSendForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah form dari reload halaman
        
        let message = waMessageInput.value.trim();
        if (message === "") {
            // Jika pesan kosong, gunakan pesan default
            message = "Halo, saya mau bertanya tentang produk Anda.";
        }

        const encodedMessage = encodeURIComponent(message);
        const waURL = `https://wa.me/${waNumber}?text=${encodedMessage}`;

        window.open(waURL, '_blank'); // Buka di tab baru
        waMessageInput.value = ''; // Kosongkan input
        waChatWindow.classList.remove('show'); // Tutup jendela chat
    });
});