import {jest} from '@jest/globals'

jest.mock('../../controllers/organizationController.js', () => ({
    updateRoute53: jest.fn(() => 'orgdomain'),
}));

console.log(jest.isMockFunction(updateRoute53)); // Should log true if it's mocked

import { registerAdmin } from '../../controllers/adminController.js';
import User from '../../models/users.js';
import Organization from '../../models/organizations.js';
import { updateRoute53 } from '../../controllers/organizationController.js';

jest.mock('../../models/organizations.js', () => jest.fn());
jest.mock('../../models/users.js', () => jest.fn());

const req = {
    body: {
        organizationName: "Org Name",
        organizationDomain: "orgdomain",
        email: "user@test.com",
        password: "password",
        firstname: "First Name",
        lastname: "Last Name",

    }
};

const res = {
    status: jest.fn((x) => x),
    redirect: jest.fn((x) => x)
}

beforeEach(() => {
    jest.clearAllMocks();
  });

it('should send a redirect when a user is created successfully', async () => {
    Organization.create = jest.fn(() => ({
        _id: 1,
        name: "Org Name",
        domain: "orgdomain"

    }));

    User.register = jest.fn(() => ({
        _id: 1,
        email: "user@test.com",
        firstName: "First Name",
        lastName: "Last Name",
        salt: "Generated Salt",
        hash: "Generated Hash"
    }))
    
    await registerAdmin(req, res);
    expect(updateRoute53).toHaveBeenCalledWith('orgdomain');
    expect(res.status).toHaveBeenCalled();
    
});


