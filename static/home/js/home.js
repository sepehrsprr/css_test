document.addEventListener('DOMContentLoaded', function() {
    const startPlanButton = document.getElementById('startPlanButton');
    
    startPlanButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Make a fetch request to check authentication status
        fetch('/check-auth/')
            .then(response => response.json())
            .then(data => {
                if (data.isAuthenticated) {
                    window.location.href = '/questionnaire/';
                } else {
                    window.location.href = '/accounts/login/';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Fallback to login page if there's an error
                window.location.href = '/accounts/login/';
            });
    });
}); 