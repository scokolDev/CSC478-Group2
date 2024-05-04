import request from 'supertest';
import express from 'express';
import customerRouter from '../../routers/customerRouter.js';

const app = express();

// Mount customerRouter
app.use('/customer', customerRouter);

describe('Customer Router', () => {
  test('GET /customer should return status 200', async () => {
    const response = await request(app).get('/customer');
    expect(response.status).toBe(200);
  });

  test('GET /customer/login should return status 200', async () => {
    const response = await request(app).get('/customer/login');
    expect(response.status).toBe(200);
  });

  // Add more tests for other routes as needed
});
