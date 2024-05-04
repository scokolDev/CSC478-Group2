// Import the function to be tested
const { saveById } = require('../../public/javascript/admin_resource');


// Define resourceCounter in the global scope
global.resourceCounter = 0;

// Mock the necessary variables and functions used in admin_resources.js
const mockResourceHolder = {
  appendChild: jest.fn()
};
global.document.getElementById = jest.fn().mockReturnValue(mockResourceHolder);

// Mock the fetch function to simulate API responses
global.fetch = jest.fn();
fetch.mockResolvedValueOnce({ ok: true }); // Mock successful PUT request

describe('saveById', () => {
  test('should send a PUT request if resource exists', async () => {
    // Mock resource data
    const resourceId = 'resource123';
    const resourceElement = {
      getElementsByClassName: jest.fn().mockReturnValueOnce([{ value: 'Test Resource' }, { value: '10' }])
      // Mock other methods as needed
    };
    document.getElementById.mockReturnValueOnce(resourceElement);

    // Call saveById
    await saveById(resourceId);

    // Expect fetch to be called with PUT method
    expect(fetch).toHaveBeenCalledWith(`/api/resources/${resourceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Resource',
        totalQuantity: '10',
        // Add more properties as needed
      }),
    });
  });

  // You can add more tests here to cover different scenarios, such as POST request, error handling, etc.
});
