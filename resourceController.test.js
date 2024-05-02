// Import the getResource function from the resourceController module
import { getResources } from '../../controllers/resourceController.js';
import Resource from '../../models/resources.js';
import router from express.Router();

// Mock the Resource model
jest.mock('../../models/resources.js');

describe('Resource Controller', () => {
  describe('getResources', () => {
    it('should return all resources for the organization', async () => {
      // Mock the Resource.find() method to resolve with an array of mock resources
      const mockResources = [{ name: 'Resource 1' }, { name: 'Resource 2' }];
      Resource.find.mockResolvedValueOnce(mockResources);

      // Mock the request object with organizationID
      const mockReq = { user: { organizationID: 'org_id' }, query: {} };

      // Mock the response object's methods
      const mockStatus = jest.fn().mockReturnThis();
      const mockJson = jest.fn();

      // Call the getResources function directly
      await getResources(mockReq, { status: mockStatus, json: mockJson });

      // Assert that Resource.find() was called with the correct query
      expect(Resource.find).toHaveBeenCalledWith(mockReq.query);
      // Assert that response status was set to 200
      expect(mockStatus).toHaveBeenCalledWith(200);
      // Assert that response json was called with the array of mock resources
      expect(mockJson).toHaveBeenCalledWith(mockResources);
    });

    // Add more tests for different scenarios
  });

  // Add tests for other controller functions (createResource, getResourceByID, updateResource, deleteResource)
});
