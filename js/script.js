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
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const fields = [
                { id: 'name', msg: 'Please enter your name.' },
                { id: 'affiliation', msg: 'Please enter your affiliation.' },
                { id: 'email', msg: 'Please enter a valid email address.', validate: isValidEmail },
                { id: 'phone', msg: 'Please enter your phone number.' },
                { id: 'country', msg: 'Please enter your country.' },
                { id: 'subject', msg: 'Please enter a subject.' },
                { id: 'message', msg: 'Please enter your message.' },
            ];

            for (let field of fields) {
                const value = document.getElementById(field.id).value.trim();
                if (value === '' || (field.validate && !field.validate(value))) {
                    alert(field.msg);
                    return;
                }
            }

            alert('Your message has been sent successfully! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // ======================
    // Registration Form Validation
    // ======================
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value.trim();
            const registrationType = document.getElementById('registrationType').value;
            const specialSessionId = document.getElementById('specialSessionId');
            const studentIdProof = document.getElementById('studentIdProof');
            const affiliation = document.getElementById('affiliation').value.trim();
            const affiliationAddress = document.getElementById('affiliationAddress').value.trim();
            const phoneNumber = document.getElementById('phoneNumber').value.trim();
            const emailId = document.getElementById('emailId').value.trim();
            const mealPreference = document.querySelector('input[name="mealPreference"]:checked');
            const feeSubmitted = document.getElementById('feeSubmitted').value;
            const feeSubmissionProof = document.getElementById('feeSubmissionProof');

            if (!fullName) return alert('Please enter your full name.');
            if (!registrationType) return alert('Please select your registration type.');
            if (registrationType === 'specialSessionPaperPresenter' && (!specialSessionId || !specialSessionId.value.trim()))
                return alert('Please enter your Special Session ID.');
            if (registrationType === 'scholarPaperPresenter' && (!studentIdProof || !studentIdProof.value.trim()))
                return alert('Please upload your Student ID Proof.');
            if (!affiliation) return alert('Please enter your affiliation.');
            if (!affiliationAddress) return alert('Please enter your affiliation address.');
            if (!phoneNumber) return alert('Please enter your phone number.');
            if (!emailId || !isValidEmail(emailId)) return alert('Please enter a valid email address.');
            if (!mealPreference) return alert('Please select your meal preference.');
            if (!feeSubmitted) return alert('Please select the currency in which fee was submitted.');
            if (!feeSubmissionProof || !feeSubmissionProof.value.trim()) return alert('Please upload your fee submission proof.');

          
        });

        const registrationTypeSelect = document.getElementById('registrationType');
        const specialSessionIdDiv = document.getElementById('specialSessionIdDiv');
        const studentIdProofDiv = document.getElementById('studentIdProofDiv');

        if (registrationTypeSelect) {
            registrationTypeSelect.addEventListener('change', function () {
                const value = this.value;
                if (specialSessionIdDiv) {
                    specialSessionIdDiv.style.display = value === 'specialSessionPaperPresenter' ? 'block' : 'none';
                }
                if (studentIdProofDiv) {
                    studentIdProofDiv.style.display = value === 'scholarPaperPresenter' ? 'block' : 'none';
                }
            });
            registrationTypeSelect.dispatchEvent(new Event('change'));
        }
    }

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
