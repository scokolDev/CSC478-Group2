import request from 'supertest';
import express from 'express';
import locationRouter from '../../routers/locationRouter.js';

const app = express();

// Mount locationRouter
app.use('/location', locationRouter);

describe('Location Router', () => {
  test('GET /location should return status 200', async () => {
    const response = await request(app).get('/location');
    expect(response.status).toBe(200);
  });

  test('POST /location should return status 200', async () => {
    const response = await request(app).post('/location').send({ /* provide appropriate request body */ });
    expect(response.status).toBe(200);
  });

  // Add more tests for other routes as needed
});
