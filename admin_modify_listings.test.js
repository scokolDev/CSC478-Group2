import { JSDOM } from 'jsdom';
import { updatePreview } from '../../public/javascript/admin_modify_listing.js'; // Import the function to test

let PresetAppointmentArray = [];
PresetAppointmentArray.push({"service": "house cleaning", "image": "/img/cleaningThumbnail.jpg", "description": "full house cleaning", "price" : 50, "active" : true, "serviceID": "12345"});
// ... rest of the code ...
describe('updatePreview function', () => {
  let dom; // Variable to hold the JSDOM instance

  // Set up the DOM before each test
  beforeEach(() => {
    // Create a new JSDOM instance
    dom = new JSDOM('<!DOCTYPE html><div id="previewBox"></div>');
    // Set the global variables used in the script
    global.document = dom.window.document;
    global.previewBox = dom.window.document.getElementById('previewBox');
  });

  // Clean up the DOM after each test
  afterEach(() => {
    // Reset the global variables
    delete global.document;
    delete global.previewBox;
    // Reset the JSDOM instance
    dom.window.close();
  });

  // Test cases
  test('should update the preview box with provided information', () => {
    // Call the function with some sample data
    updatePreview('Service Name', '/img/cleaningThumbnail.jpg', 'Description of the service', '50');

    // Assert that the preview box contains the correct elements and information
    const previewElement = document.querySelector('.listing');
    expect(previewElement).toBeTruthy(); // Assert that the preview element exists
    expect(previewElement.querySelector('img').getAttribute('src')).toBe('/img/cleaningThumbnail.jpg'); // Assert the image source
    expect(previewElement.querySelector('div:nth-child(2)').textContent).toBe('Service Name'); // Assert the service name
    expect(previewElement.querySelector('div:nth-child(3)').textContent).toBe('Description of the service'); // Assert the description
    expect(previewElement.querySelector('div:nth-child(4)').textContent).toBe('$50'); // Assert the price
  });
});
