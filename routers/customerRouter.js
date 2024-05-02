import express from 'express'
import passport from 'passport'
import Customer from '../models/customers.js'
import { checkNotAuthenticated, checkAuthenticated, getVhost } from './routes.js'
import { getOrgByDomain } from '../controllers/organizationController.js'
import {
    // authenticateCustomer,
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



// router.post('/login', checkNotAuthenticated, authenticateCustomer)

router.get('/login', checkNotAuthenticated, getCustomerLogin);

router.get('/order/login', checkNotAuthenticated, getCustomerOrderLogin);
  
router.get('/dashboard', checkAuthenticated, getCustomerDash);

router.get('/orders', checkAuthenticated, getCustomerOrders);

router.get('/modify_order', checkAuthenticated, getCustomerModifyOrder);

router.get('/register', checkNotAuthenticated,  getCustomerRegister);

router.post('/register', checkNotAuthenticated, getVhost, getOrgByDomain, registerCustomer)

router.get('/', getCustomers)
router.get('/:id', getCustomerByID)
router.put('/:id', updateCustomer)
router.delete('/:id', deleteCustomer)

  
  
export default router