import express from 'express'
import passport from 'passport'
import { authenticateAdmin, authenticateCustomer, authenticateCustomerOrder } from '../controllers/authController.js';
import { checkNotAuthenticated } from './routes.js';

const router = express.Router();

router.use(passport.session())

router.post('/admin/login', checkNotAuthenticated, authenticateAdmin)

router.post('/customer/login', checkNotAuthenticated, authenticateCustomer)

router.post('/customer/order/login', checkNotAuthenticated, authenticateCustomerOrder)


export default router