// Import necessary modules
import passport from 'passport'
import User from '../models/users.js'
import Customer from '../models/customers.js'



export const authenticateCustomer = passport.authenticate('customer', {
    successRedirect: '/customer/dashboard',
    failureRedirect: '/customer/login',
    failureFlash: true
  })

 export const authenticateAdmin = passport.authenticate('user', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login',
    failureFlash: true
  })