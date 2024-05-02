// Import the necessary modules
import { JSDOM } from 'jsdom';

// Import the function you want to test
import { initAppointments } from '../../public/javascript/admin_listings.js';

// Set up the DOM environment before each test suite
beforeEach(() => {
  const dom = new JSDOM('<!DOCTYPE html><html><body><div id="activelistingsWrapper"></div><div id="inactivelistingsWrapper"></div></body></html>');
  global.document = dom.window.document;
});

// Clean up the DOM environment after each test suite
afterEach(() => {
  delete global.document;
});

// Write your test cases
test('initAppointments should add service listings to active and inactive containers', () => {
    // Create DOM containers
    const activeContainer = document.getElementById('activelistingsWrapper');
    const inactiveContainer = document.getElementById('inactivelistingsWrapper');

    // Mock appointment arrays
    const activeAppointments = [
        { service: 'House Cleaning', image: '/img/cleaningThumbnail.jpg', description: 'full house cleaning', price: 50, active: true, serviceID: '12345' },
        // Add more active appointments as needed
    ];

    const inactiveAppointments = [
        { service: 'Painting', image: '/img/paintingThumbnail.jpg', description: 'slightly longer description', price: 100, active: false, serviceID: '12346' },
        // Add more inactive appointments as needed
    ];

    // Call the function
    initAppointments(activeContainer, inactiveContainer, activeAppointments.concat(inactiveAppointments));

    // Assert that service listings are added to the containers
    expect(activeContainer.querySelectorAll('.listing').length).toBe(activeAppointments.length);
    expect(inactiveContainer.querySelectorAll('.listing').length).toBe(inactiveAppointments.length);
    
    // Add more specific checks if needed, like verifying the content of each listing.
});
