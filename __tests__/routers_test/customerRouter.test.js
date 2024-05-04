import request from 'supertest';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import customerRouter from '../../routers/customerRouter.js';

const app = express();

// Mock passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Mock session middleware
app.use(session({
  secret: 'testsecret',
  resave: false,
  saveUninitialized: true
}));

// Mount customerRouter
app.use('/customer', customerRouter);

describe('Customer Router', () => {
  test('GET /customer/login should return status 200', async () => {
    const response = await request(app).get('/customer/login');
    expect(response.status).toBe(200);
  });

  test('GET /customer/dashboard should return status 302 when not authenticated', async () => {
    const response = await request(app).get('/customer/dashboard');
    expect(response.status).toBe(302);
  });

  // Add more tests for other routes as needed
});
