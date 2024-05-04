import request from 'supertest';
import express from 'express';
import router from '../../routers/productRouter';


const app = express();
app.use(express.json());
app.use('/', router);

describe('GET /', () => {
  it('responds with status 200 and renders index.ejs', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('index.ejs'); // Assuming 'index.ejs' is rendered
  });

  // Add more test cases as needed
});