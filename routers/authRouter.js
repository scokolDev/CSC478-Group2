import express from 'express'
import passport from 'passport'
import { authenticateAdmin, authenticateCustomer, authenticateCustomerOrder } from '../controllers/authController.js';
import { checkCustomerNotAuthenticated, checkAdminNotAuthenticated } from './routes.js';

const router = express.Router();

router.use(passport.session())

// Route Handler for Admin authentication
// (Requirement 1.4.0)
router.post('/admin/login', checkAdminNotAuthenticated, authenticateAdmin)

// Route Handler for Customer authentication
// (Requirement 6.2.0)
router.post('/customer/login', checkCustomerNotAuthenticated, authenticateCustomer)

router.post('/customer/order/login', checkCustomerNotAuthenticated, authenticateCustomerOrder)


export default router