import {jest} from '@jest/globals'

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
  
import {
    getAdminLogin,
    getAdminDash,
    getAdminListings,
    getAdminRegister,
    registerAdmin,
    getAdminResource,
    getAdminModifyListing,
    getAdminOrderDetails,
} from '../../controllers/adminController.js'
import User from '../../models/users.js';
import Organization from '../../models/organizations.js';
//import { updateRoute53 } from '../../controllers/organizationController.js';



jest.mock('../../models/organizations.js', () => jest.fn());
jest.mock('../../models/users.js', () => jest.fn());


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
    res.render = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('getAdminDash', () => {
    test('should return Admin dash ejs and send orgname ', async () => {
        const req = mockRequest({}, { organizationName: "Org Name"}, {});
        const res = mockResponse();

        getAdminDash(req, res);
        expect(res.render).toBeCalledWith("admin_dash.ejs", {orgName: req.body.organizationName});
    });

    test('should return admin dash ejs and orgname undefined when req.body.organizationID not set ', async () => {
        const req = mockRequest({}, {}, {});
        const res = mockResponse();

        getAdminDash(req, res);
        expect(res.render).toBeCalledWith("admin_dash.ejs", {orgName: undefined});
    })
  });

  describe('getAdminLogin', () => {
    test('should return Admin Login ejs and send error: failureFlash', async () => {
        const req = {
            failureFlash: "Incorrect Login Information"
        }
        const res = mockResponse();

        getAdminLogin(req, res);
        expect(res.render).toBeCalledWith("login.ejs", {error: req.failureFlash});
    });

    test('should return admin login ejs and error undefined when req.failureFlash not set ', async () => {
        const req = mockRequest({}, {}, {});
        const res = mockResponse();

        getAdminLogin(req, res);
        expect(res.render).toBeCalledWith("login.ejs", {error: undefined});
    })
  });

  describe('getAdminLogin', () => {
    test('should return Admin Login ejs and send error: failureFlash', async () => {
        const req = {
            failureFlash: "Incorrect Login Information"
        }
        const res = mockResponse();

        getAdminLogin(req, res);
        expect(res.render).toBeCalledWith("login.ejs", {error: req.failureFlash});
    });

    test('should return admin login ejs and error undefined when req.failureFlash not set ', async () => {
        const req = mockRequest({}, {}, {});
        const res = mockResponse();

        getAdminLogin(req, res);
        expect(res.render).toBeCalledWith("login.ejs", {error: undefined});
    })
  });

  describe('Test Render of Admin Pages', () => {
    test('shoudl return the admin lists ejs file', async () => {
        const req = mockRequest({}, {}, {});
        const res = mockResponse();

        getAdminListings(req, res);
        expect(res.render).toBeCalledWith('admin_listings.ejs');
    })

    test('should return the admin register ejs file', async () => {
        const req = mockRequest({}, {}, {});
        const res = mockResponse();

        getAdminRegister(req, res);
        expect(res.render).toBeCalledWith('admin_register.ejs');
    })

    test('should return the admin resources ejs file', async () => {
        const req = mockRequest({}, {}, {});
        const res = mockResponse();

        getAdminResource(req, res);
        expect(res.render).toBeCalledWith('admin_resources.ejs');
    })

    test('should return the admin modify listings ejs file', async () => {
        const req = mockRequest({}, {}, {});
        const res = mockResponse();

        getAdminModifyListing(req, res);
        expect(res.render).toBeCalledWith('admin_modify_listing.ejs');
    })

    test('should return the admin order listings ejs file', async () => {
        const req = mockRequest({}, {}, {});
        const res = mockResponse();

        getAdminOrderDetails(req, res);
        expect(res.render).toBeCalledWith('admin_order_details.ejs');
    })
  })

  describe('Test Admin Registeration', () => {
    beforeEach(() => {
        AWS.Route53.mockClear();
    })
    
    afterEach(() => {
       //jest.clearAllMocks();
       jest.restoreAllMocks(); 
    });
    test('should call res.redirect when req.body parameters are set', async () => {
        const req = mockRequest({}, { 
            email: "testadmin@test.com",
            firstname: "First Name",
            lastname: "Last Name",
            password: "password",
            organizationName: "Org Name",
            organizationDomain: "orgdomain"
        }, {})
        const res = mockResponse();

        Organization.create = jest.fn(() => ({
            _id: 1,
            name: "Org Name"
        }));

        User.register = jest.fn((user, pass, callback) => {
            callback(null, 'Success');
        });


        await registerAdmin(req, res);
        expect(Organization.create).toHaveBeenCalledWith({name: req.body.organizationName, domain: req.body.organizationDomain})
        expect(updateRoute53).toHaveBeenCalledWith(req.body.organizationDomain)
        expect(User.register).toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith('/admin/login');
    })

    test('should resspond with 500 if registration fails', async () => {
        const req = mockRequest({}, { 
            email: "testadmin@test.com",
            firstname: "First Name",
            lastname: "Last Name",
            organizationName: "Org Name",
            password: "password"
        }, {})
        const res = mockResponse();

        User.register = jest.fn((user, pass, callback) => {
            callback(new Error('Failed to register'));
        });

        
        await registerAdmin(req, res);
        expect(User.register).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({message: 'Failed to register'});
    })

    test('show throw 500 error if  User.register() throws an error', async () => {
        const req = mockRequest({}, {}, {});
        const res = mockResponse();

        Organization.create = jest.fn({})
        User.register = jest.fn(() => { throw new Error() });

        await registerAdmin(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalled();

    });

    test('show throw 500 error if  Organization.create() throws an error', async () => {
        const req = mockRequest({}, {}, {});
        const res = mockResponse();

        Organization.create = jest.fn(() => { throw new Error() });
        

        await registerAdmin(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalled();

    });
  });