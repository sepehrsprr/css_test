document.addEventListener('DOMContentLoaded', function() {
    // Get the current page path
    const currentPath = window.location.pathname;
    
    // Hide login/signup buttons based on current page
    if (currentPath.includes('login')) {
        const loginBtn = document.querySelector('.nav-links .login-btn');
        if (loginBtn) {
            loginBtn.parentElement.style.display = 'none';
        }
    } else if (currentPath.includes('signup')) {
        const signupBtn = document.querySelector('.nav-links .signup-btn');
        if (signupBtn) {
            signupBtn.parentElement.style.display = 'none';
        }
    }

    // Form validation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const password = form.querySelector('input[name="password"]');
            const confirmPassword = form.querySelector('input[name="confirm_password"]');
            
            if (confirmPassword && password.value !== confirmPassword.value) {
                e.preventDefault();
                alert('Passwords do not match!');
            }
        });
    }

    // Add password visibility toggle
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'password-toggle';
        toggleBtn.innerHTML = '👁️';
        
        input.parentElement.style.position = 'relative';
        input.parentElement.appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', () => {
            input.type = input.type === 'password' ? 'text' : 'password';
        });
    });
}); 