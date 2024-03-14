document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('servicesLink').addEventListener('click', function(event) {
        event.preventDefault();
        // Toggle the visibility of service boxes
        var serviceContainer = document.getElementById('serviceContainer');
        if (serviceContainer.style.display === 'none' || serviceContainer.style.display === '') {
            serviceContainer.style.display = 'block';
        } else {
            serviceContainer.style.display = 'none';
        }
    });

    // Handle click events for service boxes
    document.querySelectorAll('.service-box').forEach(function(box) {
        box.addEventListener('click', function() {
            // Add your functionality here
            alert('You selected ' + box.textContent);
        });
    });

    document.querySelectorAll('nav a:not(#servicesLink)').forEach(function(link) {
        link.addEventListener('click', function() {
            document.getElementById('serviceContainer').style.display = 'none'; // Hide services container
            document.getElementById('aboutInfo').style.display = 'none'; // Hide about section
        });
    });

    document.getElementById('signInLink').addEventListener('click', function(event) {
        event.preventDefault();
        var email = prompt("Enter your email:");
        var password = prompt("Enter your password:");
        if (email && password) {
            alert('You entered email: ' + email + ' and password: ' + password);
        }
    });

    document.getElementById('homeLink').addEventListener('click', function() {
        location.reload();
    });

    document.getElementById('aboutLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('aboutInfo').style.display = 'block';
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('proApplicationForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'none';
    });

    document.getElementById('contactLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('aboutInfo').style.display = 'none';
        document.getElementById('contactForm').style.display = 'block';
        document.getElementById('proApplicationForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'none';
    });

    document.getElementById('proApplicationLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('aboutInfo').style.display = 'none';
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('proApplicationForm').style.display = 'block';
    });

    document.getElementById('loginLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('aboutInfo').style.display = 'none';
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('proApplicationForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    });
});



