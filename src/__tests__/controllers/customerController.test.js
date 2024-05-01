import {jest} from '@jest/globals'



import {
    getCustomers,
    getCustomerLogin,
    getCustomerDash,
    getCustomerOrders,
    getCustomerModifyOrder,
    getCustomerRegister,
    registerCustomer,
    getCustomerByID,
    updateCustomer,
    deleteCustomer,
    getDomain
} from '../../controllers/customerController.js'

jest.mock('../../models/customers.js', () => ({
    __esModule: true,
    Customer: {
        register: jest.fn()
    }   
}));
import Customer from '../../models/customers.js'

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

  describe('getCustomers', () => {
    test('should return 200 if req.user.organizationID is set', async () => {
        const req = mockRequest({ organiationID: 1}, {}, {});
        const res = mockResponse();

        Customer.find = jest.fn(() => ({
            _id: 1,
            firtName: "First Name",
            lastName: "Last Name",
            organizationID: 1,
            hash: "hash",
            salt: "salt",
            email: "testcustomer@test.com",
        }));

        await getCustomers(req, res);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({ 
            _id: 1,
            firtName: "First Name",
            lastName: "Last Name",
            organizationID: 1,
            hash: "hash",
            salt: "salt",
            email: "testcustomer@test.com"})
    });

    test('should return 200 if Customer.find returns an empty object', async () => {
        const req = mockRequest({ organiationID: 1000}, {}, {});
        const res = mockResponse();

        Customer.find = jest.fn(() => ({}));

        await getCustomers(req, res);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({});
    });

    test('should return 200 if Customer.find throws and error', async () => {
        const req = mockRequest({ organiationID: 1000}, {}, {});
        const res = mockResponse();

        Customer.find = jest.fn(() => {
            throw new Error()
    });

        await getCustomers(req, res);
        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalled();
    });

  });

  describe('getCustomerByID', () => {
    test('should return 200 if req.params.id is set', async () => {
        const req = mockRequest({ organizationID: 1}, {}, { id: 1});
        const res = mockResponse();

        Customer.findById = jest.fn(() => ({
            _id: 1,
            firtName: "First Name",
            lastName: "Last Name",
            organizationID: 1,
            hash: "hash",
            salt: "salt",
            email: "testcustomer@test.com",
        }));
        const {id} = req.params
        await getCustomerByID(req, res);
        expect(Customer.findById).toBeCalledWith(id);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({ 
            _id: 1,
            firtName: "First Name",
            lastName: "Last Name",
            organizationID: 1,
            hash: "hash",
            salt: "salt",
            email: "testcustomer@test.com"})
    });

    test('should return 404 if Customer.findById returns an empty object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Customer.findById = jest.fn(() => (undefined));
        const {id} = req.params
        await getCustomerByID(req, res);
        expect(Customer.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({message: `cannot find any customer with ID ${id}`});
    });

    test('should return 401 if req.user.organizationID not set Customer.findById returns an object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Customer.findById = jest.fn(() => ({ organizationID: 1000 }));
        const {id} = req.params
        await getCustomerByID(req, res);
        expect(Customer.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to access customer ${id}`});
    });

    test('should return 401 if req.user.organizationID not match  Customer.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1000});
        const res = mockResponse();

        Customer.findById = jest.fn(() => ({ _id: 1000, organizationID: 1000 }));
        const {id} = req.params
        await getCustomerByID(req, res);
        expect(Customer.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to access customer ${id}`});
    });

    test('should return 401 if customer.organizationID not defined  Customer.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1});
        const res = mockResponse();

        Customer.findById = jest.fn(() => ({ _id: 1}));
        const {id} = req.params
        await getCustomerByID(req, res);
        expect(Customer.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to access global customers ${id}`});
    });

    test('should return 500 if Customer.findById throws and error', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Customer.findById = jest.fn(() => {
            throw new Error()
    });

        await getCustomerByID(req, res);
        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalled();
    });

  });

  describe('updateCustomer', () => {
    test('should return 200 if req.user.organizationID and req.params.id is set', async () => {
        const req = mockRequest({ organizationID: 1}, { 
            _id: 1,
            firtName: "First Name",
            lastName: "Last Name",
            organizationID: 1,
            hash: "hash",
            salt: "salt",
            email: "testcustomer@test.com"}, { id: 1});
        const res = mockResponse();

        Customer.findByIdAndUpdate = jest.fn(() => (req.body));
        Customer.findById = jest.fn(() => ({
            _id: 1,
            firtName: "First Name Updated",
            lastName: "Last Name Updated",
            organizationID: 1,
            hash: "hash",
            salt: "salt",
            email: "testcustomer@test.com",
        }));
        const {id} = req.params
        await updateCustomer(req, res);
        expect(Customer.findByIdAndUpdate).toBeCalledWith(id, req.body)
        expect(Customer.findById).toBeCalledWith(id);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({ 
            _id: 1,
            firtName: "First Name Updated",
            lastName: "Last Name Updated",
            organizationID: 1,
            hash: "hash",
            salt: "salt",
            email: "testcustomer@test.com"})
    });

    test('should return 404 if Customer.findById returns an empty object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Customer.findById = jest.fn(() => (undefined));
        const {id} = req.params
        await updateCustomer(req, res);
        expect(Customer.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({message: `cannot find any customer with ID ${id}`});
    });

    test('should return 401 if req.user.organizationID not set Customer.findById returns an object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Customer.findById = jest.fn(() => ({ organizationID: 1000 }));
        const {id} = req.params
        await updateCustomer(req, res);
        expect(Customer.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to update customer ${id}`});
    });

    test('should return 401 if req.user.organizationID not match  Customer.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1000});
        const res = mockResponse();

        Customer.findById = jest.fn(() => ({ _id: 1000, organizationID: 1000 }));
        const {id} = req.params
        await updateCustomer(req, res);
        expect(Customer.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to update customer ${id}`});
    });

    test('should return 401 if customer.organizationID not defined  Customer.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1});
        const res = mockResponse();

        Customer.findById = jest.fn(() => ({ _id: 1}));
        const {id} = req.params
        await updateCustomer(req, res);
        expect(Customer.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to update global customers ${id}`});
    });

    test('should return 500 if Customer.findById throws and error', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Customer.findById = jest.fn(() => {
            throw new Error()
    });

        await updateCustomer(req, res);
        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalled();
    });

  });

  describe('deleteCustomer', () => {
    test('should return 200 if req.user.organizationID and req.params.id is set', async () => {
        const req = mockRequest({ organizationID: 1}, {}, { id: 1});
        const res = mockResponse();

        Customer.findByIdAndDelete = jest.fn(() => ({ id: 1}));
        Customer.findById = jest.fn(() => ({
            _id: 1,
            firtName: "First Name",
            lastName: "Last Name",
            organizationID: 1,
            hash: "hash",
            salt: "salt",
            email: "testcustomer@test.com",
        }));
        const {id} = req.params
        await deleteCustomer(req, res);
        expect(Customer.findByIdAndDelete).toBeCalledWith(id)
        expect(Customer.findById).toBeCalledWith(id);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({ 
            _id: 1,
            firtName: "First Name",
            lastName: "Last Name",
            organizationID: 1,
            hash: "hash",
            salt: "salt",
            email: "testcustomer@test.com"})
    });

    test('should return 404 if Customer.findById returns an empty object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Customer.findById = jest.fn(() => (undefined));
        const {id} = req.params
        await deleteCustomer(req, res);
        expect(Customer.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({message: `cannot find any customer with ID ${id}`});
    });

    test('should return 401 if req.user.organizationID not set Customer.findById returns an object', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Customer.findById = jest.fn(() => ({ organizationID: 1000 }));
        const {id} = req.params
        await deleteCustomer(req, res);
        expect(Customer.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to delete customer ${id}`});
    });

    test('should return 401 if req.user.organizationID not match  Customer.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1000});
        const res = mockResponse();

        Customer.findById = jest.fn(() => ({ _id: 1000, organizationID: 1000 }));
        const {id} = req.params
        await deleteCustomer(req, res);
        expect(Customer.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to delete customer ${id}`});
    });

    test('should return 401 if customer.organizationID not defined  Customer.findById returns an object', async () => {
        const req = mockRequest({organizationID: 1}, {}, { id: 1});
        const res = mockResponse();

        Customer.findById = jest.fn(() => ({ _id: 1}));
        const {id} = req.params
        await deleteCustomer(req, res);
        expect(Customer.findById).toBeCalledWith(id)
        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({message: `Not authorized to delete global customers ${id}`});
    });

    test('should return 500 if Customer.findById throws and error', async () => {
        const req = mockRequest({}, {}, { id: 1000});
        const res = mockResponse();

        Customer.findById = jest.fn(() => {
            throw new Error()
    });

        await deleteCustomer(req, res);
        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalled();
    });

  });

  describe('getCustomerDash', () => {
    test('should return customer dash ejs and send firstName ', async () => {
        const req = mockRequest({ firstName: "First Name"}, {}, {});
        const res = mockResponse();

        getCustomerDash(req, res);
        expect(res.render).toBeCalledWith("customer_dash.ejs", {firstName: req.user.firstName});
    });

    test('should return customer dash ejs and firstName undefined when req.user.firstName not set ', async () => {
        const req = mockRequest({}, {}, {});
        const res = mockResponse();

        getCustomerDash(req, res);
        expect(res.render).toBeCalledWith("customer_dash.ejs", {firstName: undefined});
    })
  });

    describe('getCustomerLogin', () => {
    test('should return customer_login.ejs and send failureFlash as undefined', async () => {
        const req = mockRequest({}, {}, {});
        const res = mockResponse();

        getCustomerLogin(req, res);
        expect(res.render).toBeCalledWith("customer_login.ejs", {message: undefined});
    });

    test('should return customer_login.ejs and send failureFlash message', async () => {
        const req = {
            failureFlash: "Incorrect Login",
        }
        const res = mockResponse();

        getCustomerLogin(req, res);
        expect(res.render).toBeCalledWith("customer_login.ejs", {message: "Incorrect Login"});
    });
  });

  describe('getCustomerOrders', () => {
    test('should return customer_orders.ejs', async () => {
        const req = mockRequest({}, {}, {});
        const res = mockResponse();

        getCustomerOrders(req, res);
        expect(res.render).toBeCalledWith("customer_orders.ejs");
    });
  });

  describe('getCustomerModifyOrder', () => {
    test('should return customer_modify_order.ejs', async () => {
        const req = mockRequest({}, {}, {});
        const res = mockResponse();

        getCustomerModifyOrder(req, res);
        expect(res.render).toBeCalledWith("customer_modify_order.ejs");
    });
  });

  describe('getCustomerRegister', () => {
    test('should return customer_register.ejs', async () => {
        const req = mockRequest({}, {}, {});
        const res = mockResponse();

        getCustomerRegister(req, res);
        expect(res.render).toBeCalledWith("customer_register.ejs");
    });
  });

  describe('getDomain', () => {
    test('should set req.body.orgdomain if req.vhost is defined', async () => {
        const req = {
            vhost: ['orgdomain'],
            body: {}
        };
        const res = mockResponse();

        getDomain(req, res);
        expect(req.body.orgdomain).toEqual("orgdomain");
    });

    test('should set req.body.orgdomain undefined if req.vhost is not defined', async () => {
        const req = {
            body: {}
        };
        const res = mockResponse();

        getDomain(req, res);
        expect(req.body.orgdomain).toEqual(undefined);
    });
  });

  describe('registerCustomer', () => {
    afterEach(() => {
       jest.clearAllMocks(); 
    });
    test('should call res.redirect when req.body parameters are set', async () => {
        const req = mockRequest({}, { 
            email: "testcustomer@test.com",
            firstname: "First Name",
            lastname: "Last Name",
            organizationID: "1",
            password: "password"
        }, {})
        const res = mockResponse();

        Customer.register = jest.fn((cust, pass, callback) => {
            callback(null, 'Success');
        });


        await registerCustomer(req, res);
        expect(Customer.register).toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith('/customer/login');
    })

    test('should resspond with 500 if registration fails', async () => {
        const req = mockRequest({}, { 
            email: "testcustomer@test.com",
            firstname: "First Name",
            lastname: "Last Name",
            organizationID: "1",
            password: "password"
        }, {})
        const res = mockResponse();

        Customer.register = jest.fn((cust, pass, callback) => {
            callback(new Error('Failed to register'));
        });
        

        
        await registerCustomer(req, res);
        expect(Customer.register).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({message: 'Failed to register'});
    })

    test('show throw 500 error if User.register() throws an error', async () => {
        const req = mockRequest({}, {}, {});
        const res = mockResponse();

        Customer.register = jest.fn(() => { throw new Error() });

        await registerCustomer(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalled();

    });
  });