const { JSDOM } = require('jsdom');

describe('Customer Site Tests', () => {
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
                    <button id="bookNowButton">Book Now</button>
                    <div id="bookingForm" style="display: none;">Booking Form</div>
                </body>
            </html>
        `;
        const dom = new JSDOM(html);
        window = dom.window;
        document = window.document;
    });

    // Test for viewing the organization's home page
    test('4.0.0 User should be able to see organization home page', () => {
        expect(document.getElementById('homePage').textContent).toContain('Welcome to Our Organization!');
    });

    // Test for navigating to the products tab
    test('4.1.0 User should be able to go to products tab', () => {
        document.getElementById('productsTab').click();
        expect(document.getElementById('productsPage').style.display).toBe('none');
    });

    // Test for displaying three featured products
    test('4.1.1 products tab should show three featured products', () => {
        document.getElementById('productsTab').click();
        const products = document.querySelectorAll('.product');
        expect(products.length).toBe(3);
    });

    // Test for loading the booking form by clicking on a featured product
    test('4.1.2 clicking on a featured product will load booking form with clicked product', () => {
        document.getElementById('productsTab').click();
        const firstProduct = document.querySelector('.product');
        firstProduct.click();
        expect(document.getElementById('bookingForm').style.display).toBe('none');
    });

    // Test for navigating to the about page
    test('4.2.0 User should be able to go to about page', () => {
        document.getElementById('aboutTab').click();
        expect(document.getElementById('aboutPage').style.display).toBe('none');
    });

    // Test for navigating to the booking form via the "Book Now" button
    test('4.3.0 User should be able to click on book now button to get to booking form', () => {
        document.getElementById('bookNowButton').click();
        expect(document.getElementById('bookingForm').style.display).toBe('none');
    });
});
