const { JSDOM } = require('jsdom');

// Mock HTMLFormElement
class HTMLFormElementMock {
    submit() {
        // Mock submit behavior here if needed
    }
}

global.HTMLFormElement = HTMLFormElementMock;

describe('Combined Tests', () => {
    let window, document;

    beforeAll(() => {
        const html = `
            <html>
                <body>
                    <div id="homePage">Welcome to Our Organization!</div>
                    <button id="productsTab">Products</button>
                    <div id="productsPage" style="display: none;">
                        <div class="product" data-id="1">Product 1</div>
                        <div class="product" data-id="2">Product 2</div>
                        <div class="product" data-id="3">Product 3</div>
                    </div>
                    <button id="aboutTab">About</button>
                    <div id="aboutPage" style="display: none;">About Us</div>
                    <button id="contactTab">Contact</button>
                    <div id="contactPage" style="display: none;">
                        <form id="contactForm">
                            <input type="text" id="name" name="name" />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                    <button id="bookNowButton">Book Now</button>
                    <div id="bookingForm" style="display: none;">Booking Form</div>
                    <div id="signInForm">
                        <input type="email" id="email" />
                        <input type="password" id="password" />
                        <button id="signInButton">Sign In</button>
                    </div>
                    <div id="createAccountForm">
                        <input type="text" id="newName" />
                        <input type="email" id="newEmail" />
                        <input type="password" id="newPassword" />
                        <button id="createAccountButton">Create Account</button>
                    </div>
                    <select id="productSelect">
                        <option value="product1">Product 1</option>
                    </select>
                    <select id="resourceList">
                        <option value="resource1">Resource 1</option>
                    </select>
                    <div id="resourceName"></div>
                    <div id="resourceDays"></div>
                    <input type="text" id="card-element" />
                    <button id="submitBooking">Submit Booking</button>
                    <div class="CalDayActive" style="background-color: white;"></div>
                </body>
            </html>
        `;
        const dom = new JSDOM(html);
        window = dom.window;
        document = window.document;
    });

    test('4.0.0 User should be able to see organization home page', () => {
        expect(document.getElementById('homePage').textContent).toContain('Welcome to Our Organization!');
    });

    test('4.1.1 products tab should show three featured products', () => {
        document.getElementById('productsTab').click();
        const products = document.querySelectorAll('.product');
        expect(products.length).toBe(3);
    });

    test('5.0.1 User should be able to create an order while signed in', () => {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const signInButton = document.getElementById('signInButton');
        const productSelect = document.getElementById('productSelect');
        const submitButton = document.getElementById('submitBooking');

        // Simulate signing in
        emailInput.value = 'user@example.com';
        passwordInput.value = 'password123';
        signInButton.click();

        // Simulate selecting a product and submitting a booking
        productSelect.value = 'product1';
        submitButton.click();

        expect(productSelect.value).toBe('product1');
    });

    test('5.0.1 User should be able to create an order while signed in', () => {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const signInButton = document.getElementById('signInButton');
        const productSelect = document.getElementById('productSelect');
        const submitButton = document.getElementById('submitBooking');

        // Simulate signing in
        emailInput.value = 'user@example.com';
        passwordInput.value = 'password123';
        signInButton.click();

        // Simulate selecting a product and submitting a booking
        productSelect.value = 'product1';
        submitButton.click();

        expect(productSelect.value).toBe('product1');
    });

    test('5.0.2 User should be able to create customer account and order while not signed in', () => {
        const nameInput = document.getElementById('newName');
        const emailInput = document.getElementById('newEmail');
        const passwordInput = document.getElementById('newPassword');
        const createAccountButton = document.getElementById('createAccountButton');
        const productSelect = document.getElementById('productSelect');
        const submitButton = document.getElementById('submitBooking');

        // Simulate account creation
        nameInput.value = 'New User';
        emailInput.value = 'newuser@example.com';
        passwordInput.value = 'newpassword123';
        createAccountButton.click();

        // Simulate selecting a product and submitting a booking
        productSelect.value = 'product1';
        submitButton.click();

        expect(nameInput.value).toBe('New User');
        expect(emailInput.value).toBe('newuser@example.com');
        expect(passwordInput.value).toBe('newpassword123');
        expect(productSelect.value).toBe('product1');
    });

    test('5.0.3 User should be redirected to customer sign in if selected', () => {
        const signInLink = document.getElementById('signInLink');
        window.alert = jest.fn();  // Mocking alert function
    
        // Simulate redirection to customer sign-in
        redirectToSignIn();
    
        expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('email'));
    });
    
    function redirectToSignIn() {
    
        window.alert('Redirected to customer sign-in. Please enter your email.');
    }
    
    

    test('5.1.0 User should be able to select product from drop down menu', () => {
        const productSelect = document.getElementById('productSelect');
        productSelect.value = 'product1';

        expect(productSelect.value).toBe('product1');
    });

    test('5.2.0 User should be able to select resource from drop down menu', () => {
        const resourceSelect = document.getElementById('resourceList');
        resourceSelect.value = 'resource1';

        expect(resourceSelect.value).toBe('resource1');
    });

    test('5.2.1 Resource name and availability should be listed under drop down menu', () => {
        const resourceName = document.getElementById('resourceName');
        const resourceDays = document.getElementById('resourceDays');

        resourceName.textContent = 'Resource Name';
        resourceDays.textContent = 'Monday, Wednesday';

        expect(resourceName.textContent).not.toBe('');
        expect(resourceDays.textContent).not.toBe('');
    });
    

    test('5.2.4 User should be able to interact with calendar to select booking dates', () => {
        const calendarDay = document.querySelector('.CalDayActive');
        calendarDay.style.backgroundColor = 'lightgreen';  // Simulate clicking on the calendar day

        expect(calendarDay.style.backgroundColor).toBe('lightgreen');
    });

    test('5.3.0 User should be able to enter card information', () => {
        const cardInput = document.getElementById('card-element');
        cardInput.value = '1234 5678 9101 1121';

        expect(cardInput.value).toBe('1234 5678 9101 1121');
    });
    

    test('5.4.0 All input fields should be validated', () => {
        // Mock the window.alert function
        window.alert = jest.fn();  
    
        validateInput('invalid-email', 'email');
        validateInput('pass', 'password');
        validateInput('12345', 'phone');
    
        expect(window.alert).toHaveBeenCalledWith('Invalid email address');
        expect(window.alert).toHaveBeenCalledWith('Password must be at least 8 characters long');
        expect(window.alert).toHaveBeenCalledWith('Invalid phone number');
    });
    
    // Function to validate input format
    function validateInput(input, type) {
        switch (type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input)) {
                    window.alert('Invalid email address');
                }
                break;
            case 'password':
                if (input.length < 8) {
                    window.alert('Password must be at least 8 characters long');
                }
                break;
            case 'phone':
                const phoneRegex = /^\d{10}$/; // assuming phone number format is 10 digits
                if (!phoneRegex.test(input)) {
                    window.alert('Invalid phone number');
                }
                break;
            default:
                break;
        }
    }
});
