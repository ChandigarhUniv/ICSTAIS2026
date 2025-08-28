// Main JavaScript file for ICSTAIS2026 Conference Website

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
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
        const parentLink = dropdown.querySelector('a'); // dropdown ka parent link

        parentLink.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                const submenu = this.nextElementSibling;
                if (submenu && submenu.classList.contains('dropdown-menu')) {
                    e.preventDefault(); // parent link page open na kare
                    dropdown.classList.toggle('active');
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
            }

            // Close all dropdowns
            dropdowns.forEach((dropdown) => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    if (backToTopButton) {
        backToTopButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Smooth scrolling for anchor links
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

                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileToggle) {
                        mobileToggle.classList.remove('active');
                    }
                }
            }
        });
    });

    // Newsletter Form Validation
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

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const affiliation = document.getElementById('affiliation').value.trim();
            const paperId = document.getElementById('paperId').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const country = document.getElementById('country').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '') {
                alert('Please enter your name.');
                return;
            }

            if (affiliation === '') {
                alert('Please enter your affiliation.');
                return;
            }

            if (email === '' || !isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (phone === '') {
                alert('Please enter your phone number.');
                return;
            }

            if (country === '') {
                alert('Please enter your country.');
                return;
            }

            if (subject === '') {
                alert('Please enter a subject.');
                return;
            }

            if (message === '') {
                alert('Please enter your message.');
                return;
            }

            alert('Your message has been sent successfully! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Registration Form Validation
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

            if (fullName === '') {
                alert('Please enter your full name.');
                return;
            }

            if (registrationType === '') {
                alert('Please select your registration type.');
                return;
            }

            if (
                registrationType === 'specialSessionPaperPresenter' &&
                (!specialSessionId || specialSessionId.value.trim() === '')
            ) {
                alert('Please enter your Special Session ID.');
                return;
            }

            if (
                registrationType === 'scholarPaperPresenter' &&
                (!studentIdProof || studentIdProof.value.trim() === '')
            ) {
                alert('Please upload your Student ID Proof.');
                return;
            }

            if (affiliation === '') {
                alert('Please enter your affiliation.');
                return;
            }

            if (affiliationAddress === '') {
                alert('Please enter your affiliation address.');
                return;
            }

            if (phoneNumber === '') {
                alert('Please enter your phone number.');
                return;
            }

            if (emailId === '' || !isValidEmail(emailId)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (!mealPreference) {
                alert('Please select your meal preference.');
                return;
            }

            if (feeSubmitted === '') {
                alert('Please select the currency in which fee was submitted.');
                return;
            }

            if (!feeSubmissionProof || feeSubmissionProof.value.trim() === '') {
                alert('Please upload your fee submission proof.');
                return;
            }

            alert('Registration submitted successfully! Please wait for confirmation.');
            registrationForm.reset();
        });

        const registrationTypeSelect = document.getElementById('registrationType');
        const specialSessionIdDiv = document.getElementById('specialSessionIdDiv');
        const studentIdProofDiv = document.getElementById('studentIdProofDiv');

        if (registrationTypeSelect) {
            registrationTypeSelect.addEventListener('change', function () {
                const value = this.value;

                if (specialSessionIdDiv) {
                    specialSessionIdDiv.style.display =
                        value === 'specialSessionPaperPresenter' ? 'block' : 'none';
                }

                if (studentIdProofDiv) {
                    studentIdProofDiv.style.display =
                        value === 'scholarPaperPresenter' ? 'block' : 'none';
                }
            });

            registrationTypeSelect.dispatchEvent(new Event('change'));
        }
    }

    // Utility function to validate email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Active menu item highlighting based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
        link.classList.remove('active');

        if (
            link.getAttribute('href') === currentPage ||
            (link.getAttribute('href').includes('pages/') &&
                currentPage.includes('html') &&
                link.getAttribute('href').split('/').pop() === currentPage)
        ) {
            link.classList.add('active');
        }
    });
});
