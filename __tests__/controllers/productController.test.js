import {jest} from '@jest/globals';
import Product from '../../models/products.js';
import * as productController from '../../controllers/productController.js';

jest.mock('../../models/products.js', jest.fn());

const mockRequest = (userData, body, params, query) => {
    return {
        user: userData,
        body,
        params,
        query
    }
}

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

describe('Test getProducts method', () => {
    test('shold return 200 and the products object', async () => {
        const req = mockRequest({ organizationID: 1}, {}, {}, {});
        const res = mockResponse();

        const mockProducts = [{ _id: 1, name: "Test Product"}]

        Product.find = jest.fn(() => (mockProducts));

        await productController.getProducts(req, res);
        expect(req.query.organizationID).toEqual(1);
        expect(Product.find).toHaveBeenCalledWith(req.query)
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockProducts);
    })

    test('shold return 200 and the products object if req.body.organizationID is set and req.user is undefined', async () => {
        const req = mockRequest(undefined, {organizationID: 1}, {}, {});
        const res = mockResponse();

        const mockProducts = [{ _id: 1, name: "Test Product", organizationID: 1}]

        Product.find = jest.fn(() => (mockProducts));

        await productController.getProducts(req, res);
        expect(req.query.organizationID).toEqual(1);
        expect(Product.find).toHaveBeenCalledWith(req.query)
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockProducts);
    })

    test('shold return 500 if Product.find throws an error', async () => {
        const req = mockRequest({organizationID: 1}, {}, {}, {});
        const res = mockResponse();

        const mockProducts = [{ _id: 1, name: "Test Product", organizationID: 1}]

        Product.find = jest.fn(() => { throw new Error('Random Error')});

        await productController.getProducts(req, res);
        expect(req.query.organizationID).toEqual(1);
        expect(Product.find).toHaveBeenCalledWith(req.query)
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: "Random Error"});
    })
})

describe('Test createProduct method', () => {
    test('shold return 200 and the product object', async () => {
        const req = mockRequest({ organizationID: 1}, {}, {}, {});
        const res = mockResponse();

        const mockProduct = [{ _id: 1, name: "Test Product", organizationID: 1}]

        Product.create = jest.fn(() => (mockProduct));

        await productController.createProduct(req, res);
        expect(req.body.organizationID).toEqual(1);
        expect(Product.create).toHaveBeenCalledWith(req.body)
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockProduct);
    })

    test('shold return 500 if Product.find throws an error', async () => {
        const req = mockRequest({organizationID: 1}, {}, {}, {});
        const res = mockResponse();

        const mockProducts = [{ _id: 1, name: "Test Product", organizationID: 1}]

        Product.create = jest.fn(() => { throw new Error('Random Error')});

        await productController.createProduct(req, res);
        expect(req.body.organizationID).toEqual(1);
        expect(Product.create).toHaveBeenCalledWith(req.body)
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: "Random Error"});
    })
})

describe('Test Returing Products By ID', () => {
    test('should return 200 if req.params.id is set', async () => {
        const req = mockRequest({ organizationID: 1}, {}, { id: 1});
        const res = mockResponse();

        const mockedProduct = {_id: 1, name: "Test Product", organizationID: 1}
        Product.findById = jest.fn(() => (mockedProduct));
        const {id} = req.params
        await productController.getProductByID(req, res);
        expect(Product.findById).toBeCalledWith(id);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(mockedProduct);
    });

    test('should return 404 if Product.findById returns an empty object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Product.findById = jest.fn(() => (undefined));
        const {id} = req.params
        await productController.getProductByID(req, res);
        expect(Product.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({message: `cannot find any product with ID ${id}`});
    });

    test('should return 401 if req.user.organizationID not set Product.findById returns an object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Product.findById = jest.fn(() => ({ organizationID: 1000 }));
        const {id} = req.params
        await productController.getProductByID(req, res);
        expect(Product.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to access product ${id}`});
    });

    test('should return 401 if req.user.organizationID not match  Product.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1000});
        const res = mockResponse();

        Product.findById = jest.fn(() => ({ _id: 1000, organizationID: 1000 }));
        const {id} = req.params
        await productController.getProductByID(req, res);
        expect(Product.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to access product ${id}`});
    });

    test('should return 401 if product.organizationID not defined  Product.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1});
        const res = mockResponse();

        Product.findById = jest.fn(() => ({ _id: 1}));
        const {id} = req.params
        await productController.getProductByID(req, res);
        expect(Product.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to access global products ${id}`});
    });

    test('should return 500 if Product.findById throws and error', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Product.findById = jest.fn(() => {
            throw new Error()
    });

        await productController.getProductByID(req, res);
        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalled();
    });

  });

  describe('Test Updating Products', () => {
    
    test('should return 200 if req.user.organizationID and req.params.id is set', async () => {
        const req = mockRequest({ organizationID: 1}, { 
            _id: 1,
            name: "New Name"}, { id: 1});
        const res = mockResponse();
        const mockUpdatedProduct = { _id: 1, name: "New Name", organizationID: 1};
        Product.findByIdAndUpdate = jest.fn(() => ({}));
        Product.findById = jest.fn(() => (mockUpdatedProduct));
        const {id} = req.params
        await productController.updateProduct(req, res);
        expect(Product.findById).toBeCalledWith(id);
        expect(Product.findByIdAndUpdate).toBeCalledWith(id, req.body)
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(mockUpdatedProduct);
    });

    test('should return 404 if Product.findById returns an empty object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Product.findById = jest.fn(() => (undefined));
        const {id} = req.params
        await productController.updateProduct(req, res);
        expect(Product.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({message: `cannot find any product with ID ${id}`});
    });

    test('should return 401 if req.user.organizationID not set Product.findById returns an object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Product.findById = jest.fn(() => ({ organizationID: 1000 }));
        const {id} = req.params
        await productController.updateProduct(req, res);
        expect(Product.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to update product ${id}`});
    });

    test('should return 401 if req.user.organizationID not match  Product.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1000});
        const res = mockResponse();

        Product.findById = jest.fn(() => ({ _id: 1000, organizationID: 1000 }));
        const {id} = req.params
        await productController.updateProduct(req, res);
        expect(Product.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to update product ${id}`});
    });

    test('should return 401 if product.organizationID not defined  Product.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1});
        const res = mockResponse();

        Product.findById = jest.fn(() => ({ _id: 1}));
        const {id} = req.params
        await productController.updateProduct(req, res);
        expect(Product.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to update global products ${id}`});
    });

    test('should return 500 if Product.findById throws and error', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Product.findById = jest.fn(() => {
            throw new Error()
    });

        await productController.updateProduct(req, res);
        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalled();
    });

  });

  describe('productController.deleteProduct', () => {
    test('should return 200 if req.user.organizationID and req.params.id is set', async () => {
        const req = mockRequest({ organizationID: 1}, {}, { id: 1});
        const res = mockResponse();
        const mockProduct = {_id: 1, name: "Product Name", organizationID: 1};
        Product.findByIdAndDelete = jest.fn(() => (mockProduct));
        Product.findById = jest.fn(() => (mockProduct));
        const {id} = req.params
        await productController.deleteProduct(req, res);
        expect(Product.findById).toBeCalledWith(id);
        expect(Product.findByIdAndDelete).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(mockProduct);
    });

    test('should return 404 if Product.findById returns an empty object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Product.findById = jest.fn(() => (undefined));
        const {id} = req.params
        await productController.deleteProduct(req, res);
        expect(Product.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({message: `cannot find any product with ID ${id}`});
    });

    test('should return 401 if req.user.organizationID not set Product.findById returns an object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Product.findById = jest.fn(() => ({ organizationID: 1000 }));
        const {id} = req.params
        await productController.deleteProduct(req, res);
        expect(Product.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to delete product ${id}`});
    });

    test('should return 401 if req.user.organizationID not match  Product.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1000});
        const res = mockResponse();

        Product.findById = jest.fn(() => ({ _id: 1000, organizationID: 1000 }));
        const {id} = req.params
        await productController.deleteProduct(req, res);
        expect(Product.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to delete product ${id}`});
    });

    test('should return 401 if product.organizationID not defined  Product.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1});
        const res = mockResponse();

        Product.findById = jest.fn(() => ({ _id: 1}));
        const {id} = req.params
        await productController.deleteProduct(req, res);
        expect(Product.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to delete global products ${id}`});
    });

    test('should return 500 if Product.findById throws and error', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Product.findById = jest.fn(() => {
            throw new Error()
    });

        await productController.deleteProduct(req, res);
        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalled();
    });

  });


  describe('Test the returnProductsByID Method', () => {
    test('should return a product object if id is valid', async () => {
        const id = 1
        const mockProduct = {_id: 1, name: "Test Product", organizationID: 1}

        Product.findById = jest.fn(() => (mockProduct));
        const returnValue = await productController.returnProductByID(id)
        expect(Product.findById).toHaveBeenCalledWith(id);
        expect(returnValue).toEqual(mockProduct);
    })

    test('should return undefined if id is invalid', async () => {
        const id = 1000
        const mockProduct = {_id: 1, name: "Test Product", organizationID: 1}

        Product.findById = jest.fn(() => (undefined));
        const returnValue = await productController.returnProductByID(id)
        expect(Product.findById).toHaveBeenCalledWith(id);
        expect(returnValue).toEqual(undefined);
    })

    test('should return error if Product.find throws an error', async () => {
        const id = 1000
        const mockProduct = {_id: 1, name: "Test Product", organizationID: 1}

        Product.findById = jest.fn(() => { throw new Error('Random Error')});
        const returnValue = await productController.returnProductByID(id)
        expect(Product.findById).toHaveBeenCalledWith(id);
        expect(returnValue).toEqual("Random Error");
    })
  })