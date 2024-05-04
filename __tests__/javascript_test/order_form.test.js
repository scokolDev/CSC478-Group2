// Import the function to be tested
const { updateProducts, updateResources } = require('../../public/javascript/order_form');
const { JSDOM } = require('jsdom');

// Mock the fetch function to simulate API responses
global.fetch = jest.fn();

describe('updateProducts', () => {
  test('updates the products list correctly', async () => {
    // Mock data for products
    const mockProducts = [
      { name: 'Product 1' },
      { name: 'Product 2' }
    ];

    // Mock fetch response for products
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockProducts) });

    // Mock the DOM elements
    document.getElementById = jest.fn((id) => ({
      innerHTML: '', // Reset innerHTML for each call
      id, // Return the id as a property
      appendChild: jest.fn() // Mock appendChild method
    }));

    // Call the updateProducts function
    await updateProducts();

    // Expect the products list to be updated correctly
    expect(document.getElementById('Products').appendChild).toHaveBeenCalledTimes(2);
    expect(document.getElementById('Products').appendChild).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ value: 'Product 1', textContent: 'Product 1' })
    );
    expect(document.getElementById('Products').appendChild).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ value: 'Product 2', textContent: 'Product 2' })
    );
  });
});

// Similarly, you can create tests for updateResources and productList change event.
// Mock the fetch function and test if the resource list is updated correctly when a product is selected.
// Mock the DOM elements and simulate the productList change event to test if the resource list updates accordingly.
