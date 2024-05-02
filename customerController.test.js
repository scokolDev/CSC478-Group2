// Import necessary modules
import * as customerController from '../../controllers/customerController';
import Customer from '../../models/customers';
jest.mock('vhost');

// Mock the express module
jest.mock('express', () => ({
  Router: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    use: jest.fn(),
  })),
}));

// Mock the Customer model
jest.mock('../../models/customers');

describe('Customer Controller', () => {
  describe('getCustomers', () => {
    it('should return all customers', async () => {
      const mockReq = { user: { organizationID: '123' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockCustomers = [{ name: 'Customer 1' }, { name: 'Customer 2' }];
      Customer.find.mockResolvedValueOnce(mockCustomers);

      await customerController.getCustomers(mockReq, mockRes);

      expect(Customer.find).toHaveBeenCalledWith({ organizationID: '123' });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockCustomers);
    });

    // Add more tests for different scenarios
  });

  // Add tests for other controller functions
});
