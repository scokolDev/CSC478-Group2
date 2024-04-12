document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle visibility of serviceContainer
    function toggleServiceContainer() {
        var serviceContainer = document.getElementById('serviceContainer');
        if (serviceContainer.style.display === 'none' || serviceContainer.style.display === '') {
            serviceContainer.style.display = 'block';
        } else {
            serviceContainer.style.display = 'none';
        }
    }

    // Event listener for the "Services" button
    document.getElementById('servicesLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('aboutInfo').style.display = 'none';
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('proApplicationForm').style.display = 'none';
        document.getElementById('serviceContainer').style.display = 'block';
        document.getElementById('home').style.display = 'none'; // Hide the home section
        document.getElementById('reviews').style.display = 'none'; // Hide the testimonials section
    });

    // Handle click events for service boxes
    document.querySelectorAll('.service-box').forEach(function(box) {
        box.addEventListener('click', function() {
            // Add your functionality here
            alert('You selected ' + box.textContent);
        });
    });

    // Event listener for other navigation links
    document.querySelectorAll('nav a:not(#servicesLink)').forEach(function(link) {
        link.addEventListener('click', function() {
            // Hide serviceContainer, home, and testimonials sections when other navigation links are clicked
            document.getElementById('serviceContainer').style.display = 'none';
            document.getElementById('home').style.display = 'none';
            document.getElementById('reviews').style.display = 'none';
        });
    });

    // Event listener for signing in
    document.getElementById('signInLink').addEventListener('click', function(event) {
        event.preventDefault();
        var email = prompt("Enter your email:");
        var password = prompt("Enter your password:");
        if (email && password) {
            alert('You entered email: ' + email + ' and password: ' + password);
        }
    });

    // Event listener for reloading the page on clicking "Home" link
    document.getElementById('homeLink').addEventListener('click', function() {
        location.reload();
    });

    // Event listener for displaying the about section
    document.getElementById('aboutLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('aboutInfo').style.display = 'block';
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('proApplicationForm').style.display = 'none';
        document.getElementById('serviceContainer').style.display = 'none';
        document.getElementById('home').style.display = 'none'; // Hide the home section
        document.getElementById('reviews').style.display = 'none'; // Hide the testimonials section
        document.getElementById('.book-now-button').style.display = 'none'; // Hide the testimonials section
    });

    // Event listener for displaying the contact form
    document.getElementById('contactLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('aboutInfo').style.display = 'none';
        document.getElementById('contactForm').style.display = 'block';
        document.getElementById('proApplicationForm').style.display = 'none';
        document.getElementById('serviceContainer').style.display = 'none';
        document.getElementById('home').style.display = 'none'; // Hide the home section
        document.getElementById('reviews').style.display = 'none'; // Hide the testimonials section
        document.getElementById('.book-now-button').style.display = 'none'; // Hide the testimonials section
    });

    // Event listener for displaying the pro application form
    document.getElementById('proApplicationLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('aboutInfo').style.display = 'none';
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('proApplicationForm').style.display = 'block';
        document.getElementById('serviceContainer').style.display = 'none';
        document.getElementById('home').style.display = 'none'; // Hide the home section
        document.getElementById('reviews').style.display = 'none'; // Hide the testimonials section
        document.getElementById('.book-now-button').style.display = 'none'; // Hide the testimonials section
    });

   // Function to toggle visibility of bookingForm
function toggleBookingForm() {
    var bookingForm = document.getElementById('bookingFormContainer');
    if (bookingForm.style.display === 'none' || bookingForm.style.display === '') {
        // Hide all other forms and sections
        document.getElementById('aboutInfo').style.display = 'none';
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('proApplicationForm').style.display = 'none';
        document.getElementById('serviceContainer').style.display = 'none';
        document.getElementById('home').style.display = 'none';
        document.getElementById('reviews').style.display = 'none';

        // Display only the booking form
        bookingForm.style.display = 'block';
    } else {
        // Hide the booking form
        bookingForm.style.display = 'none';
    }
}


    // Event listener for clicking the "Book Now" button
    document.querySelector('.book-now-button').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default action of the button
        toggleBookingForm(); // Toggle the visibility of the booking form
    });

    var bookingForm = document.getElementById('bookingForm');
    var paymentFormContainer = document.getElementById('paymentFormContainer');

    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Hide booking form and show payment form
        bookingForm.style.display = 'none';
        paymentFormContainer.style.display = 'block';
    });

    var paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Process payment (you can add your payment processing logic here)
        // Once payment is processed successfully, you may redirect the user to a confirmation page or perform other actions.
        alert('Payment processed successfully!');
        location.reload();    });
});
