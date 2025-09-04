// Main JavaScript file for ICSTAIS2026 Conference Website

document.addEventListener('DOMContentLoaded', function () {
    // ======================
    // Mobile Menu Toggle
    // ======================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Handle dropdown menus in mobile view
    dropdowns.forEach((dropdown) => {
        const parentLink = dropdown.querySelector('a');
        parentLink.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                const submenu = this.nextElementSibling;
                if (submenu && submenu.classList.contains('dropdown-menu')) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
            dropdowns.forEach((dropdown) => dropdown.classList.remove('active'));
        }
    });

    // ======================
    // Back to Top Button
    // ======================
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton?.classList.add('show');
        } else {
            backToTopButton?.classList.remove('show');
        }
    });

    backToTopButton?.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ======================
    // Smooth scrolling for anchor links
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth',
                });
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle?.classList.remove('active');
                }
            }
        });
    });

    // ======================
    // Newsletter Form Validation
    // ======================
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const emailValue = emailInput.value.trim();

            if (emailValue === '') {
                alert('Please enter your email address.');
                return;
            }
            if (!isValidEmail(emailValue)) {
                alert('Please enter a valid email address.');
                return;
            }

            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }

    // ======================
    // Contact Form Validation
    // ======================



    // ======================
    // Registration Form Validation
    // ======================

    // ======================
    // Utility Functions
    // ======================
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ======================
    // Active menu item highlighting
    // ======================
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});
