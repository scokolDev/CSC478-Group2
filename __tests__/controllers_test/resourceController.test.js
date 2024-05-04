import {jest} from '@jest/globals'
import * as resourceController from '../../controllers/resourceController.js'
import Resource from '../../models/resources.js'
import organizations from '../../models/organizations.js';

jest.mock('../../models/resources.js', () => jest.fn());

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


describe('Get Resources Tests', () => {
    test('should return 200 and the resource object', async () => {
        const req = mockRequest({ organizationID: 1}, {}, {}, {});
        const res = mockResponse();

        const resources = [{ _id: 1, name: "Test Resource"}]

        Resource.find = jest.fn(() => (resources));

        await resourceController.getResources(req, res);
        expect(req.query.organizationID).toEqual(1);
        expect(Resource.find).toHaveBeenCalledWith(req.query)
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(resources);

    })

    test('should return 200 and the resource object if req.user not defined', async () => {
        const req = mockRequest(undefined, {organizationID: 1}, {}, {});
        const res = mockResponse();

        const resources = [{ _id: 1, name: "Test Resource"}]

        Resource.find = jest.fn(() => (resources));

        await resourceController.getResources(req, res);
        expect(req.query.organizationID).toEqual(1);
        expect(Resource.find).toHaveBeenCalledWith(req.query)
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(resources);

    })

    test('should return 200  if req.user not defined and req.body.organizationID not defined', async () => {
        const req = mockRequest(undefined, {}, {}, {});
        const res = mockResponse();

        const resources = [{ _id: 1, name: "Test Resource"}]

        Resource.find = jest.fn(() => (resources));

        await resourceController.getResources(req, res);
        expect(req.query.organizationID).toEqual(undefined);
        expect(Resource.find).toHaveBeenCalledWith(req.query)
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(resources);

    })

    test('should return 200  if req.user not defined and req.body.organizationID not defined', async () => {
        const req = mockRequest(undefined, {}, {}, {});
        const res = mockResponse();

        const resources = [{ _id: 1, name: "Test Resource"}]

        Resource.find = jest.fn(() => (resources));

        await resourceController.getResources(req, res);
        expect(req.query.organizationID).toEqual(undefined);
        expect(Resource.find).toHaveBeenCalledWith(req.query)
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(resources);

    })

    test('should return 500  if Resource.find throws an error', async () => {
        const req = mockRequest(undefined, {}, {}, {});
        const res = mockResponse();

        const resources = [{ _id: 1, name: "Test Resource"}]

        Resource.find = jest.fn(() => { throw new Error('Some error')});

        await resourceController.getResources(req, res);
        expect(req.query.organizationID).toEqual(undefined);
        expect(Resource.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: 'Some error'});

    })
})


describe('Resource Create Tests', () => {
    test('should return 200 and the new resource object', async () => {
        const req = mockRequest({ organizationID: 1}, {}, {}, {});
        const res = mockResponse();

        const resources = [{ _id: 1, name: "Test Resource"}]

        Resource.create = jest.fn(() => (resources));

        await resourceController.createResource(req, res);
        expect(req.body.organizationID).toEqual(1);
        expect(Resource.create).toHaveBeenCalledWith(req.body)
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(resources);

    })


    test('should return 500  if Resource.create throws an error', async () => {
        const req = mockRequest({ organizationID: 1}, {}, {}, {});
        const res = mockResponse();

        const resources = [{ _id: 1, name: "Test Resource"}]

        Resource.create = jest.fn(() => { throw new Error('Some error')});

        await resourceController.createResource(req, res);
        expect(req.query.organizationID).toEqual(undefined);
        expect(Resource.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: 'Some error'});

     })
})

describe('Test Getting Returing Resources By ID', () => {
    test('should return 200 if req.params.id is set', async () => {
        const req = mockRequest({ organizationID: 1}, {}, { id: 1});
        const res = mockResponse();

        const mockedResource = {_id: 1, name: "Test Resource", organizationID: 1}
        Resource.findById = jest.fn(() => (mockedResource));
        const {id} = req.params
        await resourceController.getResourceByID(req, res);
        expect(Resource.findById).toBeCalledWith(id);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(mockedResource);
    });

    test('should return 404 if Resource.findById returns an empty object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Resource.findById = jest.fn(() => (undefined));
        const {id} = req.params
        await resourceController.getResourceByID(req, res);
        expect(Resource.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({message: `cannot find any resource with ID ${id}`});
    });

    test('should return 401 if req.user.organizationID not set Resource.findById returns an object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Resource.findById = jest.fn(() => ({ organizationID: 1000 }));
        const {id} = req.params
        await resourceController.getResourceByID(req, res);
        expect(Resource.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to access resource ${id}`});
    });

    test('should return 401 if req.user.organizationID not match  Resource.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1000});
        const res = mockResponse();

        Resource.findById = jest.fn(() => ({ _id: 1000, organizationID: 1000 }));
        const {id} = req.params
        await resourceController.getResourceByID(req, res);
        expect(Resource.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to access resource ${id}`});
    });

    test('should return 401 if resource.organizationID not defined  Resource.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1});
        const res = mockResponse();

        Resource.findById = jest.fn(() => ({ _id: 1}));
        const {id} = req.params
        await resourceController.getResourceByID(req, res);
        expect(Resource.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to access global resources ${id}`});
    });

    test('should return 500 if Resource.findById throws and error', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Resource.findById = jest.fn(() => {
            throw new Error()
    });

        await resourceController.getResourceByID(req, res);
        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalled();
    });

  });

  describe('Test Updating Resources', () => {
    
    test('should return 200 if req.user.organizationID and req.params.id is set', async () => {
        const req = mockRequest({ organizationID: 1}, { 
            _id: 1,
            name: "New Name"}, { id: 1});
        const res = mockResponse();
        const mockUpdatedResource = { _id: 1, name: "New Name", organizationID: 1};
        Resource.findByIdAndUpdate = jest.fn(() => ({}));
        Resource.findById = jest.fn(() => (mockUpdatedResource));
        const {id} = req.params
        await resourceController.updateResource(req, res);
        expect(Resource.findById).toBeCalledWith(id);
        expect(Resource.findByIdAndUpdate).toBeCalledWith(id, req.body)
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(mockUpdatedResource);
    });

    test('should return 404 if Resource.findById returns an empty object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Resource.findById = jest.fn(() => (undefined));
        const {id} = req.params
        await resourceController.updateResource(req, res);
        expect(Resource.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({message: `cannot find any resource with ID ${id}`});
    });

    test('should return 401 if req.user.organizationID not set Resource.findById returns an object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Resource.findById = jest.fn(() => ({ organizationID: 1000 }));
        const {id} = req.params
        await resourceController.updateResource(req, res);
        expect(Resource.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to modify resource ${id}`});
    });

    test('should return 401 if req.user.organizationID not match  Resource.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1000});
        const res = mockResponse();

        Resource.findById = jest.fn(() => ({ _id: 1000, organizationID: 1000 }));
        const {id} = req.params
        await resourceController.updateResource(req, res);
        expect(Resource.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to modify resource ${id}`});
    });

    test('should return 401 if resource.organizationID not defined  Resource.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1});
        const res = mockResponse();

        Resource.findById = jest.fn(() => ({ _id: 1}));
        const {id} = req.params
        await resourceController.updateResource(req, res);
        expect(Resource.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to modify global resources ${id}`});
    });

    test('should return 500 if Resource.findById throws and error', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Resource.findById = jest.fn(() => {
            throw new Error()
    });

        await resourceController.updateResource(req, res);
        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalled();
    });

  });

  describe('resourceController.deleteResource', () => {
    test('should return 200 if req.user.organizationID and req.params.id is set', async () => {
        const req = mockRequest({ organizationID: 1}, {}, { id: 1});
        const res = mockResponse();
        const mockResource = {_id: 1, name: "Resource Name", organizationID: 1};
        Resource.findByIdAndDelete = jest.fn(() => (mockResource));
        Resource.findById = jest.fn(() => (mockResource));
        const {id} = req.params
        await resourceController.deleteResource(req, res);
        expect(Resource.findById).toBeCalledWith(id);
        expect(Resource.findByIdAndDelete).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(mockResource);
    });

    test('should return 404 if Resource.findById returns an empty object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Resource.findById = jest.fn(() => (undefined));
        const {id} = req.params
        await resourceController.deleteResource(req, res);
        expect(Resource.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({message: `cannot find any resource with ID ${id}`});
    });

    test('should return 401 if req.user.organizationID not set Resource.findById returns an object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Resource.findById = jest.fn(() => ({ organizationID: 1000 }));
        const {id} = req.params
        await resourceController.deleteResource(req, res);
        expect(Resource.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to delete resource ${id}`});
    });

    test('should return 401 if req.user.organizationID not match  Resource.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1000});
        const res = mockResponse();

        Resource.findById = jest.fn(() => ({ _id: 1000, organizationID: 1000 }));
        const {id} = req.params
        await resourceController.deleteResource(req, res);
        expect(Resource.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to delete resource ${id}`});
    });

    test('should return 401 if resource.organizationID not defined  Resource.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1});
        const res = mockResponse();

        Resource.findById = jest.fn(() => ({ _id: 1}));
        const {id} = req.params
        await resourceController.deleteResource(req, res);
        expect(Resource.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to delete global resources ${id}`});
    });

    test('should return 500 if Resource.findById throws and error', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Resource.findById = jest.fn(() => {
            throw new Error()
    });

        await resourceController.deleteResource(req, res);
        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalled();
    });

  });