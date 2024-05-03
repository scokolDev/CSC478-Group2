import {jest} from '@jest/globals'

import Organization from '../../models/organizations.js';

import { createOrg, getOrgs, getOrgbyID, updateOrg, getOrgName, getOrgByDomain, deleteOrg} from '../../controllers/organizationController.js';
//import { updateRoute53 } from '../../controllers/organizationController.js';

jest.mock('../../models/organizations.js', () => jest.fn());

const mockRequest = (userData, body, params) => {
    return {
        user: userData,
        body,
        params
    }
}

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };


  jest.mock('aws-sdk', () => {
    const route53Mock = {
      changeResourceRecordSets: jest.fn().mockImplementation((params, callback) => {
        callback(null, 'Success');
      }),
    };
    return {
      Route53: jest.fn(() => route53Mock),
    };
  });
import AWS from 'aws-sdk';
console.log(jest.isMockFunction(AWS.Route53));

describe('createOrg', () => {
    test('should return 200 if proper data is set', async () => {
        const req = mockRequest({}, {
            organizationName: "Org Name",
            organizationDomain: "orgdomain"
        }, {});
        const res = mockResponse();

        Organization.create = jest.fn(() => ({
            _id: 1,
            name: "Org Name",
            domain: "orgdomain"
    
        }));
        await createOrg(req, res);
        expect(Organization.create).toHaveBeenCalledWith(req.body);
        // Assert that Route53 changeResourceRecordSets() was called with the correct parameters
        expect(AWS.Route53).toHaveBeenCalled();
        expect(AWS.Route53().changeResourceRecordSets).toHaveBeenCalledWith(expect.any(Object), expect.any(Function));
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({_id: 1, name: "Org Name", domain: "orgdomain"});
    });

    test('should return 500 if Organization.create() throws an Error.', async () => {
        const req = mockRequest();
        const res = mockResponse();

        Organization.create = jest.fn(() => {
            throw new Error("This is an error message.");
        })

        await createOrg(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: "This is an error message."});
    });
});

describe('getOrgs', () => {
    test('should return 200 when data is returned', async () => {
        const req = mockRequest();
        const res = mockResponse();

        Organization.find = jest.fn(() => ({
            _id: 1, 
            name: "Org Name", 
            domain: "orgdomain"

        }));
        await getOrgs(req, res);
        expect(Organization.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({_id: 1, name: "Org Name", domain: "orgdomain"});
    });

    test('should return 200 when no data is returned', async () => {
        const req = mockRequest();
        const res = mockResponse();

        Organization.find = jest.fn(() => ({}));
        await getOrgs(req, res);
        expect(Organization.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({});
    });

    test('should return 500 if Organization.create() throws an Error.', async () => {
        const req = mockRequest();
        const res = mockResponse();

        Organization.find = jest.fn(() => {
            throw new Error("This is an error message.");
        })

        await getOrgs(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: "This is an error message."});
    });
});

describe('getOrgbyID', () => {
    test('should return 200 req.params is set', async () => {
        const req = mockRequest({}, {}, {id: 1});
        const res = mockResponse();

        Organization.findById = jest.fn(() => ({
            _id: 1, 
            name: "Org Name", 
            domain: "orgdomain"

        }));
        const { id } = req.params;
        await getOrgbyID(req, res);
        expect(Organization.findById).toHaveBeenCalledWith(id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({_id: 1, name: "Org Name", domain: "orgdomain"});
    });

    test('should return 200 and No Data when ID is not found', async () => {
        const req = mockRequest({}, {}, {id: 1000});
        const res = mockResponse();

        Organization.findById = jest.fn(() => ({}));
        const { id } = req.params;
        await getOrgbyID(req, res);
        expect(Organization.findById).toHaveBeenCalledWith(id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({});
    });

    test('should return 500 when no ID is provided', async () => {
        const req = mockRequest();
        const res = mockResponse();

        Organization.findById = jest.fn(() => ({}));
        await getOrgs(req, res);
        expect(Organization.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalled();
    });

    test('should return 500 if Organization.create() throws an Error.', async () => {
        const req = mockRequest();
        const res = mockResponse();

        Organization.findById = jest.fn(() => {
            throw new Error();
        })

        await getOrgbyID(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalled();
    });
});

describe('updateOrg', () => {
    test('should return 200 req.params is set', async () => {
        const req = mockRequest({}, { 
            name: "Org Name1",
            domain: "orgdomain1"
        }, {id: 1});
        const res = mockResponse();

        Organization.findByIdAndUpdate = jest.fn(() => ({
            _id: 1, 
            name: "Org Name1", 
            domain: "orgdomain1"

        }));
        const { id } = req.params;
        await updateOrg(req, res);
        expect(Organization.findByIdAndUpdate).toHaveBeenCalledWith(id, req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({_id: 1, name: "Org Name1", domain: "orgdomain1"});
    });

    test('should return 200 and No Data when ID is not found', async () => {
        const req = mockRequest({}, {}, {id: 1000});
        const res = mockResponse();

        Organization.findByIdAndUpdate = jest.fn(() => ({}));
        const { id } = req.params;
        await updateOrg(req, res);
        expect(Organization.findByIdAndUpdate).toHaveBeenCalledWith(id, req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({});
    });

    test('should return 500 if Organization.create() throws an Error.', async () => {
        const req = mockRequest();
        const res = mockResponse();

        Organization.findByIdAndUpdate = jest.fn(() => {
            throw new Error();
        })

        await updateOrg(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalled();
    });
});

describe('deleteOrg', () => {
    test('should return 200 req.params is set', async () => {
        const req = mockRequest({}, {}, {id: 1});
        const res = mockResponse();

        Organization.findByIdAndDelete = jest.fn(() => ({
            _id: 1, 
            name: "Org Name", 
            domain: "orgdomain"

        }));
        const { id } = req.params;
        await deleteOrg(req, res);
        expect(Organization.findByIdAndDelete).toHaveBeenCalledWith(id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({_id: 1, name: "Org Name", domain: "orgdomain"});
    });

    test('should return 200 and No Data when ID is not found', async () => {
        const req = mockRequest({}, {}, {id: 1001});
        const res = mockResponse();

        Organization.findByIdAndDelete = jest.fn(() => ({}));
        const { id } = req.params;
        await deleteOrg(req, res);
        expect(Organization.findByIdAndDelete).toHaveBeenCalledWith(id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({});
    });

    test('should return 500 if Organization.create() throws an Error.', async () => {
        const req = mockRequest();
        const res = mockResponse();

        Organization.findByIdAndDelete = jest.fn(() => {
            throw new Error();
        })

        await deleteOrg(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalled();
    });
});

describe('getOrgByName', () => {
    test('should return req.body.organizationName when req.user.organizationID is valid', async () => {
        const req = mockRequest({ organizationID: 1}, {}, {});
        const res = mockResponse();

        Organization.findById = jest.fn(() => ({
            name: "Org Name" 

        }));
        
        await getOrgName(req, res, () => {});
        expect(Organization.findById).toHaveBeenCalledWith(req.user.organizationID);
        expect(req.body.organizationName).toEqual("Org Name");
    });

    test('should not set req.body.organizationName when ID is not found', async () => {
        const req = mockRequest({ organizationID: 1001 }, {}, {});
        const res = mockResponse();

        Organization.findById = jest.fn(() => ({}));
        await getOrgName(req, res, () => {});
        expect(Organization.findById).toHaveBeenCalledWith(req.user.organizationID);
        expect(req.body.organizationName).toBeUndefined();
    });
});

describe('getOrgByDomain', () => {
    test('should set req.body.organizationName and req.body.organizationID when req.body.orgdomain is valid', async () => {
        const req = mockRequest({}, { orgdomain: "orgdomain"}, {});
        const res = mockResponse();

        Organization.findOne = jest.fn(() => ({
            name: "Org Name",
            _id: 1

        }));
        
        await getOrgByDomain(req, res, () => {});
        expect(Organization.findOne).toHaveBeenCalledWith({domain: req.body.orgdomain});
        expect(req.body.organizationName).toEqual("Org Name");
        expect(req.body.organizationID).toEqual(1);
    });

    test('should return 400 set when orgdomain is not found', async () => {
        const req = mockRequest({}, { orgdomain: "unknown"}, {});
        const res = mockResponse();

        Organization.findOne = jest.fn(() => (false));
        await getOrgByDomain(req, res, () => {});
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({message: "Page not found"});
    });

    test('should return 400 when findOne returns null when orgdomain is not found', async () => {
        const req = mockRequest({}, { orgdomain: "unknown"}, {});
        const res = mockResponse();

        Organization.findOne = jest.fn(() => (null));
        await getOrgByDomain(req, res, () => {});
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({message: "Page not found"});
    });
});


// describe('updateRoute53', () => {
//     test('should output data via console.log when orgdmain is set', async () => {
//         const req = mockRequest({}, {}, {});
//         const res = mockResponse();
//         const domain = "orgdomain"
//         route53.changeResourceRecordSets = jest.fn(() => ({
//             domain: "orgdomain"
//         }));
        
//         updateRoute53(domain);
//         expect(route53.changeResourceRecordSets).toHaveBeenCalledWith(domain);
//         expect(console.log).toHaveBeenCalled();
//     });

    // test('should return 400 set when orgdomain is not found', async () => {
    //     const req = mockRequest({}, { orgdomain: "unknown"}, {});
    //     const res = mockResponse();

    //     Organization.findOne = jest.fn(() => (false));
    //     await getOrgByDomain(req, res, () => {});
    //     expect(res.status).toHaveBeenCalledWith(404);
    //     expect(res.json).toHaveBeenCalledWith({message: "Page not found"});
    // });

    // test('should return 400 when findOne returns null when orgdomain is not found', async () => {
    //     const req = mockRequest({}, { orgdomain: "unknown"}, {});
    //     const res = mockResponse();

    //     Organization.findOne = jest.fn(() => (null));
    //     await getOrgByDomain(req, res, () => {});
    //     expect(res.status).toHaveBeenCalledWith(404);
    //     expect(res.json).toHaveBeenCalledWith({message: "Page not found"});
    // });
// });