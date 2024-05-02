// Import necessary modules
import supertest from 'supertest';
import router from '../../controllers/scheduleController'; // Import the router directly
// Create a test suite for scheduleController
describe('scheduleController', () => {
  // Test GET '/'
  describe('GET /', () => {
    it('should return an array of events', async () => {
      // Send a GET request to the '/api/events' endpoint
      const response = await supertest(app).get('/api/events');

      // Assert that the response status is 200
      expect(response.status).toBe(200);
      
      // Assert that the response body is an array
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test POST '/'
  describe('POST /', () => {
    it('should create a new event', async () => {
      // Define a mock event object
      const newEvent = {
        name: 'Test Event',
        dateTime: '2024-05-01T12:00:00Z'
      };

      // Send a POST request to the '/api/events' endpoint with the mock event object
      const response = await supertest(app)
        .post('/api/events')
        .send(newEvent);

      // Assert that the response status is 201
      expect(response.status).toBe(201);
      
      // Assert that the response body matches the created event
      expect(response.body).toMatchObject(newEvent);
    });
  });
});
