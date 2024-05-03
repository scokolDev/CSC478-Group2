import express from 'express'
import passport from 'passport'
import { authenticateAdmin, authenticateCustomer } from '../controllers/authController.js';
import { checkNotAuthenticated } from './routes.js';

const router = express.Router();

router.use(passport.session())

// Route Handler for Admin authentication
// (Requirement 1.4.0)
router.post('/admin/login', checkNotAuthenticated, authenticateAdmin)

// Route Handler for Customer authentication
// (Requirement 6.2.0)
router.post('/customer/login', checkNotAuthenticated, authenticateCustomer)


export default router