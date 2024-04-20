import express from 'express'
import passport from 'passport'
import { authenticateAdmin, authenticateCustomer } from '../controllers/authController.js';
import { checkNotAuthenticated } from './routes.js';

const router = express.Router();

router.use(passport.session())

router.post('/admin/login', checkNotAuthenticated, authenticateAdmin)

router.post('/customer/login', checkNotAuthenticated, authenticateCustomer)


export default router