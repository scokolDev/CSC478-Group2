import * as locationController from '../../controllers/locationController';
import Location from '../../models/locations';

// Mock the Location model
jest.mock('../../models/locations');

describe('Location Controller', () => {
  describe('createLoc', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Clear all mock calls after each test
    });

    it('should create a new location successfully', async () => {
      // Mock request object
      const mockReq = { body: { /* mock request body */ } };
      // Mock response object with jest.fn()
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      // Mock location object
      const mockLoc = { /* mock location object */ };
      // Mock the Location.create() method to resolve with the mock location object
      Location.create.mockResolvedValueOnce(mockLoc);

      // Call the createLoc function with mock request and response objects
      await locationController.createLoc(mockReq, mockRes);

      // Assert that Location.create() was called with the correct request body
      expect(Location.create).toHaveBeenCalledWith(mockReq.body);
      // Assert that response status was set to 200
      expect(mockRes.status).toHaveBeenCalledWith(200);
      // Assert that response json was called with the created location object
      expect(mockRes.json).toHaveBeenCalledWith(mockLoc);
    });

    it('should handle error when creating a location', async () => {
      // Mock request object
      const mockReq = { body: { /* mock request body */ } };
      // Mock response object with jest.fn()
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      // Mock error message
      const errorMessage = 'Error creating location';
      // Mock the Location.create() method to reject with an error
      Location.create.mockRejectedValueOnce(new Error(errorMessage));

      // Call the createLoc function with mock request and response objects
      await locationController.createLoc(mockReq, mockRes);

      // Assert that Location.create() was called with the correct request body
      expect(Location.create).toHaveBeenCalledWith(mockReq.body);
      // Assert that response status was set to 500 (internal server error)
      expect(mockRes.status).toHaveBeenCalledWith(500);
      // Assert that response json was called with the error message
      expect(mockRes.json).toHaveBeenCalledWith({ message: errorMessage });
    });

    // Add more test cases for different scenarios
  });

  // Add similar test cases for other controller functions (getLocs, getLocbyID, updateLoc, deleteLoc)
});
