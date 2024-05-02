// Mock fetch function
global.fetch = jest.fn();

// Import the function to be tested
const { saveById } = require('./yourFileName');

describe('saveById function', () => {
  // Test case for saving a new resource
  it('should save a new resource', async () => {
    // Mock successful response when resource doesn't exist
    fetch.mockResolvedValueOnce({
      ok: false, // Assuming the response.ok flag is false for a resource that doesn't exist
    });

    // Call the function with some test parameters
    await saveById('temp123');

    // Assert that the correct fetch call is made
    expect(fetch).toHaveBeenCalledWith('/api/resources/temp123', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Resource Name', // Assuming a default value for name
        totalQuantity: '1', // Assuming a default value for totalQuantity
        availableQuantity: '1', // Assuming a default value for availableQuantity
        availability: [], // Assuming a default value for availability
        start: undefined, // Assuming a default value for start
        end: undefined, // Assuming a default value for end
        recurrence: 'test', // Assuming a default value for recurrence
      }),
    });

    // Reset the mock
    fetch.mockReset();
  });

  // Test case for updating an existing resource
  it('should update an existing resource', async () => {
    // Mock successful response when resource exists
    fetch.mockResolvedValueOnce({
      ok: true, // Assuming the response.ok flag is true for a resource that exists
    });

    // Call the function with some test parameters
    await saveById('existingResource123');

    // Assert that the correct fetch call is made
    expect(fetch).toHaveBeenCalledWith('/api/resources/existingResource123', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Resource Name', // Assuming a default value for name
        totalQuantity: '1', // Assuming a default value for totalQuantity
        availableQuantity: '1', // Assuming a default value for availableQuantity
        availability: [], // Assuming a default value for availability
        start: undefined, // Assuming a default value for start
        end: undefined, // Assuming a default value for end
        recurrence: 'test', // Assuming a default value for recurrence
      }),
    });

    // Reset the mock
    fetch.mockReset();
  });
});
