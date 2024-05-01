import express from 'express'
import passport from 'passport'
import { checkNotAuthenticated, checkAuthenticated} from './routes.js'

import {
    // authenticateCustomer,
    getCustomerLogin,
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
  
router.get('/dashboard', checkAuthenticated, getCustomerDash);

router.get('/orders', checkAuthenticated, getCustomerOrders);

router.get('/modify_order', checkAuthenticated, getCustomerModifyOrder);

router.get('/register', checkNotAuthenticated,  getCustomerRegister);

router.post('/register', checkNotAuthenticated, registerCustomer)

router.get('/', getCustomers)
router.get('/:id', getCustomerByID)
router.put('/:id', updateCustomer)
router.delete('/:id', deleteCustomer)

  
  
export default router