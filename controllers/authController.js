// Import necessary modules
import passport from 'passport'
import User from '../models/users.js'
import Customer from '../models/customers.js'



// Method for Customer authentication
// (Requirement 6.2.0)
export const authenticateCustomer = passport.authenticate('customer', {
    successRedirect: '/customer/dashboard',
    failureRedirect: '/customer/login',
    failureFlash: true
  })

export const authenticateCustomerOrder = passport.authenticate('customer', {
    successRedirect: '/',
    failureRedirect: '/customer/login',
    failureFlash: true
  })


// Method for Admin authentication
// (Requirement 1.4.0)
 export const authenticateAdmin = passport.authenticate('user', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login',
    failureFlash: true
  })