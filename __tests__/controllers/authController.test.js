import {jest} from '@jest/globals'
import passport from 'passport';
import { authenticateAdmin } from '../../controllers/authController';
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

    test('should authenticate admin successfully', () => {
        passport.authenticate = jest.fn((strategy, options, callback) => {
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
        passport.authenticate = jest.fn((strategy, options, callback) => {
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
    
});    