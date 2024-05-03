import express from 'express'
import passport from 'passport'
import User from '../models/users.js'
import { checkAdminNotAuthenticated, checkAdminAuthenticated} from './routes.js'
import { getOrgName } from '../controllers/organizationController.js'
import {
    getAdminLogin,
    getAdminDash,
    getAdminListings,
    getAdminRegister,
    registerAdmin,
    getAdminResource,
    getAdminModifyListing,
    getAdminOrderDetails,
    getAdminOrders,
} from '../controllers/adminController.js'

import Organization from '../models/organizations.js'




const router = express.Router();

router.use(passport.session())


// Get the Admin Login Page
// (Requirement 1.4.0)
router.get('/login', checkAdminNotAuthenticated, getAdminLogin);
  
// Route handler for Admin Dashboard
// (Requirement 1.0.0)
router.get('/dashboard', checkAdminAuthenticated, getOrgName, getAdminDash);

// Route handler for Admin Listings
// (Requirement 1.1.0)
router.get('/listings', checkAdminAuthenticated, getAdminListings);

// Route handler for Admin Resources
// (Requirement 3.0.0)
router.get('/resources', checkAdminAuthenticated, getAdminResource);

// Route handler for Modify Listings
// (Requirement 3.2.0)
router.get('/modify_listing', checkAdminAuthenticated, getAdminModifyListing);

// Route Handler for Order Details 
// (Requirement 1.0.4)
router.get('/order_details', checkAdminAuthenticated, getAdminOrderDetails);

// Route Handle for Admin Orders
// (Requirement 1.0.1)
router.get('/orders', checkAdminAuthenticated, getAdminOrders);

// Route Handler for displaing the Admin Registration Page
router.get('/register', checkAdminNotAuthenticated,  getAdminRegister);

// Route Handler for processing Admin registration data
// (Requirement 1.4.1)
router.post('/register', checkAdminNotAuthenticated, registerAdmin)


  
export default router