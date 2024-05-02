import * as orderController from '../../controllers/orderController';
import Order from '../../models/orders';

// Mock the Order model
jest.mock('../../models/orders');

// Mock the behavior of dotenv.config()
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('Order Controller', () => {
  describe('getOrders', () => {
    it('should return orders belonging to the organization', async () => {
      const mockReq = { user: { organizationID: 'organizationID' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockOrders = [{ /* mock order object */ }];

      Order.find.mockResolvedValueOnce(mockOrders);

      await orderController.getOrders(mockReq, mockRes);

      expect(Order.find).toHaveBeenCalledWith({ organizationID: 'organizationID' });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockOrders);
    });

    // Add more tests for different scenarios
  });

  // Add tests for other controller functions (createOrder, getOrderById, updateOrder, deleteOrder)
});
