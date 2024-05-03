import express from 'express'
import passport from 'passport'
import { checkNotAuthenticated, checkAuthenticated, getVhost } from './routes.js'
import { getOrgByDomain } from '../controllers/organizationController.js'
import {
    getCustomerLogin,
    getCustomerOrderLogin,
    getCustomerDash,
    getCustomerOrders,
    getCustomerModifyOrder,
    getCustomerRegister,
    registerCustomer,
    getCustomerByID,
    updateCustomer,
    deleteCustomer,
    getCustomers,
    getDomain
} from '../controllers/customerController.js'

const router = express.Router();


router.use(passport.session())


// Route handler for serving the Customer login page
// (Requirement 6.2.0)
router.get('/login', checkNotAuthenticated, getCustomerLogin);


router.get('/order/login', checkNotAuthenticated, getCustomerOrderLogin);
  
// Route handler for Customer Dashboard
// (Requirement 6.0.0)
router.get('/dashboard', checkAuthenticated, getCustomerDash);

// Route Handler for Customer Orders
// (Requirement 6.0.1)
router.get('/orders', checkAuthenticated, getCustomerOrders);

// Route Handler for Modify Customer Order page
// (Requirement 6.0.4)
router.get('/modify_order', checkAuthenticated, getCustomerModifyOrder);

// Route Handler for Customer Registration Page
// (Requirement 6.2.1)
router.get('/register', checkNotAuthenticated,  getCustomerRegister);

// Route Handler for processing Customer Registration Data
// (Requirement 6.2.1)
router.post('/register', checkNotAuthenticated, getVhost, getOrgByDomain, registerCustomer)

// Route Handler for Customer Model API Operations
router.get('/', getCustomers)
router.get('/:id', getCustomerByID)
router.put('/:id', updateCustomer)
router.delete('/:id', deleteCustomer)

  
  
export default router