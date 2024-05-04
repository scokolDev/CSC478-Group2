import request from 'supertest';
import express from 'express';
import orderRouter from '../../routers/orderRouter.js';

const app = express();

// Mount orderRouter
app.use('/order', orderRouter);

describe('Order Router', () => {
  test('GET /order should return status 200', async () => {
    const response = await request(app).get('/order');
    expect(response.status).toBe(200);
  });

  test('POST /order should return status 200', async () => {
    const response = await request(app).post('/order').send({ /* provide appropriate request body */ });
    expect(response.status).toBe(200);
  });

  // Add more tests for other routes as needed
});
