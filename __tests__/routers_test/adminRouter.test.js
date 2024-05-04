// __test__/routers_test/adminRouter.test.js
import { checkNotAuthenticated } from '../../routers/routes.js';
import db from 'mongoose';
import express from 'express'
describe('Admin Router', () => {
  it('should pass a simple test', () => {
    const value = 42;
    expect(value).toBe(42);
  });

  describe('checkNotAuthenticated', () => {
    it('should call next() if user is not authenticated', () => {
      const mockReq = {
        isAuthenticated: () => false,
      };
      const mockRes = {};
      const mockNext = jest.fn();

      checkNotAuthenticated(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should redirect to /schedule if user is authenticated', () => {
      const mockReq = {
        isAuthenticated: () => true,
      };
      const mockRes = {
        redirect: jest.fn(),
      };
      const mockNext = jest.fn();

      checkNotAuthenticated(mockReq, mockRes, mockNext);

      expect(mockRes.redirect).toHaveBeenCalledWith('/schedule');
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
