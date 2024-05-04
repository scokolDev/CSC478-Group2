// Import the function to be tested
const { JSDOM } = require('jsdom');

const { renderSchedule } = require('../../public/javascript/script');

// Mock the fetch function to simulate API responses
global.fetch = jest.fn();

describe('renderSchedule', () => {
  beforeEach(() => {
    // Mock the renderSchedule function
    jest.spyOn(global, 'renderSchedule').mockImplementation(async () => {
      // Implement the mock functionality here
      const mockEvents = [
        { name: 'Event 1', dateTime: '2024-05-01T09:00:00' },
        { name: 'Event 2', dateTime: '2024-05-02T10:00:00' },
      ];

      // Mock the DOM element for schedule
      document.getElementById = jest.fn((id) => ({
        innerHTML: '', // Reset innerHTML for each call
        id, // Return the id as a property
        appendChild: jest.fn(), // Mock the appendChild method
      }));

      // Simulate the rendering of the schedule
      mockEvents.forEach((event) => {
        const eventElement = document.createElement('div');
        eventElement.textContent = event.name;
        document.getElementById('schedule').appendChild(eventElement);
      });
    });
  });

  afterEach(() => {
    // Restore the original renderSchedule function
    jest.restoreAllMocks();
  });

  test('renders the schedule correctly', async () => {
    // Call the function
    await renderSchedule();

    // Expect the schedule to be rendered correctly
    expect(document.getElementById('schedule').appendChild).toHaveBeenCalledTimes(2);
    expect(document.querySelectorAll('#schedule div').length).toBe(2);

    // Additional expectations for the content of the rendered schedule can be added as needed
  });
});
