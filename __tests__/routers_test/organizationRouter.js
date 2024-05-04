import request from 'supertest';
import express from 'express';
import organizationRouter from '../../routers/organizationRouter.js';

const app = express();

// Mount organizationRouter
app.use('/organization', organizationRouter);

describe('Organization Router', () => {
  test('GET /organization should return status 200', async () => {
    const response = await request(app).get('/organization');
    expect(response.status).toBe(200);
  });

  test('POST /organization should return status 200', async () => {
    const response = await request(app).post('/organization').send({ /* provide appropriate request body */ });
    expect(response.status).toBe(200);
  });

  // Add more tests for other routes as needed
});
