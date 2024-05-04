import request from 'supertest';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import router from '../../routers/router'; // Update this path to the actual path of your router file

// Create an instance of an express app
const app = express();

// Use session middleware required for passport sessions
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// Use the router
app.use(router);

describe('Authentication Routes', () => {
    describe('POST /admin/login', () => {
        it('should authenticate admin', async () => {
            const response = await request(app)
                .post('/admin/login')
                .send({ username: 'admin', password: 'adminpass' }); // Adjust payload as necessary

            // Check for successful redirection or authentication status
            expect(response.status).toBe(302); // Assuming redirection happens on successful login
            expect(response.headers.location).toBe('/path-after-successful-login'); // Adjust the redirection path as necessary
        });
    });

    describe('POST /customer/login', () => {
        it('should authenticate customer', async () => {
            const response = await request(app)
                .post('/customer/login')
                .send({ username: 'customer', password: 'customerpass' }); // Adjust payload as necessary

            // Check for successful redirection or authentication status
            expect(response.status).toBe(302); // Assuming redirection happens on successful login
            expect(response.headers.location).toBe('/path-after-successful-login'); // Adjust the redirection path as necessary
        });
    });
});
