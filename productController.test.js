import * as productController from '../../controllers/productController';
import Product from '../../models/products';

// Mock the Product model
jest.mock('../../models/products');

describe('Product Controller', () => {
  describe('getProducts', () => {
    it('should return all products for the organization', async () => {
      const mockReq = { user: { organizationID: 'org_id' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockProducts = [/* mock products array */];

      // Mock the Product.find() method to resolve with the mock products array
      Product.find.mockResolvedValueOnce(mockProducts);

      // Call the getProducts function with mock request and response objects
      await productController.getProducts(mockReq, mockRes);

      // Assert that Product.find() was called with the correct organization ID
      expect(Product.find).toHaveBeenCalledWith({ organizationID: 'org_id' });
      // Assert that response status was set to 200
      expect(mockRes.status).toHaveBeenCalledWith(200);
      // Assert that response json was called with the mock products array
      expect(mockRes.json).toHaveBeenCalledWith(mockProducts);
    });

    // Add more tests for different scenarios
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const mockReq = { user: { organizationID: 'org_id' }, body: { /* mock product data */ } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockProduct = { /* mock product object */ };

      // Mock the Product.create() method to resolve with the mock product object
      Product.create.mockResolvedValueOnce(mockProduct);

      // Call the createProduct function with mock request and response objects
      await productController.createProduct(mockReq, mockRes);

      // Assert that Product.create() was called with the correct request body
      expect(Product.create).toHaveBeenCalledWith(mockReq.body);
      // Assert that response status was set to 200
      expect(mockRes.status).toHaveBeenCalledWith(200);
      // Assert that response json was called with the created product object
      expect(mockRes.json).toHaveBeenCalledWith(mockProduct);
    });

    // Add more tests for different scenarios
  });

  describe('getProductByID', () => {
    it('should return the product with the given ID', async () => {
      const mockReq = { params: { id: 'product_id' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockProduct = { /* mock product object */ };

      // Mock the Product.findById() method to resolve with the mock product object
      Product.findById.mockResolvedValueOnce(mockProduct);

      // Call the getProductByID function with mock request and response objects
      await productController.getProductByID(mockReq, mockRes);

      // Assert that Product.findById() was called with the correct product ID
      expect(Product.findById).toHaveBeenCalledWith('product_id');
      // Assert that response status was set to 200
      expect(mockRes.status).toHaveBeenCalledWith(200);
      // Assert that response json was called with the found product object
      expect(mockRes.json).toHaveBeenCalledWith(mockProduct);
    });

    // Add more tests for different scenarios
  });

  describe('returnProductByID', () => {
    it('should return the product with the given ID', async () => {
      const mockProduct = { /* mock product object */ };

      // Mock the Product.findById() method to resolve with the mock product object
      Product.findById.mockResolvedValueOnce(mockProduct);

      // Call the returnProductByID function with a mock product ID
      const result = await productController.returnProductByID('product_id');

      // Assert that Product.findById() was called with the correct product ID
      expect(Product.findById).toHaveBeenCalledWith('product_id');
      // Assert that the result matches the mock product object
      expect(result).toEqual(mockProduct);
    });

    // Add more tests for different scenarios
  });
});