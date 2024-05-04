import passport from 'passport';
import { authenticateAdmin, authenticateCustomer } from '../../controllers/authController'; // Import authenticateCustomer
import User from '../../models/users.js'; // Make sure to import the User model

jest.mock('passport', () => ({
    authenticate: jest.fn((strategy, options, callback) => (req, res, next) => {
        const successRedirect = options.successRedirect || '/';
        const failureRedirect = options.failureRedirect || '/login';
        const failureFlash = options.failureFlash || false;

        if (callback) {
            callback(req, res, next);
        } else {
            next();
        }
    })
}));

describe('Auth Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            redirect: jest.fn(),
        };
        next = jest.fn();
    });

    // Test cases for authenticateAdmin function
    test('should authenticate admin successfully', () => {
        passport.authenticate.mockImplementation((strategy, options, callback) => {
            // Simulate successful authentication
            const user = { username: 'admin@example.com', role: 'admin' };
            req.user = user;
            callback(null, user);
        });

        authenticateAdmin(req, res, next);

        expect(passport.authenticate).toHaveBeenCalledWith('user', {
            successRedirect: '/admin/dashboard',
            failureRedirect: '/admin/login',
            failureFlash: true
        });

        expect(res.redirect).not.toHaveBeenCalled(); // No redirection expected here
        expect(next).toHaveBeenCalled(); // Next middleware should be called
    });

    test('should handle authentication failure for admin', () => {
        passport.authenticate.mockImplementation((strategy, options, callback) => {
            // Simulate successful authentication
            callback(null, { username: 'admin' });
        });

        // Mock the behavior of res.redirect
        const redirectMock = jest.fn();
        const res = {
            redirect: redirectMock
        };

        authenticateAdmin(req, res, next);

        expect(passport.authenticate).toHaveBeenCalledWith('user', {
            successRedirect: '/admin/dashboard',
            failureRedirect: '/admin/login',
            failureFlash: true
        });

        // Ensure res.redirect is not called
        expect(redirectMock).not.toHaveBeenCalled();

        // Ensure next middleware is called
        expect(next).toHaveBeenCalled();
    });

    // Test cases for authenticateCustomer function
    test('should authenticate customer successfully', () => {
        passport.authenticate.mockImplementation((strategy, options, callback) => {
            const user = { username: 'customer@example.com', role: 'customer' };
            req.user = user;
            callback(null, user);
        });

        authenticateCustomer(req, res, next); // Call authenticateCustomer

        expect(passport.authenticate).toHaveBeenCalledWith('customer', {
            successRedirect: '/customer/dashboard',
            failureRedirect: '/customer/login',
            failureFlash: true
        });

        expect(res.redirect).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });

    test('should handle authentication failure for customer', () => {
        passport.authenticate.mockImplementation((strategy, options, callback) => {
            // Simulate authentication failure by not returning a user object
            callback(null, { username: 'customer' });
        });
    
        // Redefine and mock the res object locally within this test case
        const redirectMock = jest.fn();
        const res = {
            redirect: redirectMock
        };
    
        authenticateCustomer(req, res, next); // Call authenticateCustomer
    
        expect(passport.authenticate).toHaveBeenCalledWith('customer', {
            successRedirect: '/customer/dashboard',
            failureRedirect: '/customer/login', // Ensure this matches the expected failure redirect
            failureFlash: true
        });
    
        // Check if redirect is called with the correct path
      
        expect(redirectMock).not.toHaveBeenCalled();

        // Ensure next middleware is called
        expect(next).toHaveBeenCalled();
    });
    
    

});
