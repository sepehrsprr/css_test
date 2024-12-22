document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Get the current page path
    const currentPath = window.location.pathname;
    
    // Hide login/signup buttons based on current page
    if (currentPath.includes('login.html')) {
        // Hide login button if we're on login page
        const loginBtn = document.querySelector('.nav-links .login-btn');
        if (loginBtn) {
            loginBtn.parentElement.style.display = 'none';
        }
    } else if (currentPath.includes('signup.html')) {
        // Hide signup button if we're on signup page
        const signupBtn = document.querySelector('.nav-links .signup-btn');
        if (signupBtn) {
            signupBtn.parentElement.style.display = 'none';
        }
    }

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
});
