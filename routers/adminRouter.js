import express from 'express'
import passport from 'passport'
import User from '../models/users.js'
import { checkNotAuthenticated, checkAuthenticated} from './routes.js'
import { getOrgName } from '../controllers/organizationController.js'
import {
    authenticateAdmin,
    getAdminLogin,
    getAdminDash,
    getAdminListings,
    getAdminRegister,
    registerAdmin,
    getAdminResource,
    getAdminModifyListing,
    getAdminOrderDetails,
} from '../controllers/adminController.js'

import Organization from '../models/organizations.js'
import LocalStrategy from 'passport-local'




const router = express.Router();
passport.use(new LocalStrategy({usernameField: 'email'}, User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());
router.use(passport.initialize())
router.use(passport.session())



router.post('/login', checkNotAuthenticated, authenticateAdmin)

router.get('/login', checkNotAuthenticated, getAdminLogin);
  
  // Route handler for Admin Dashboard
  router.get('/dashboard', checkAuthenticated, getOrgName, getAdminDash);
  
  // Route handler for Admin Listings
  router.get('/listings', checkAuthenticated, getAdminListings);

  // Route handler for Admin Resources
  router.get('/resources', checkAuthenticated, getAdminResource);

  // Route handler for Admin Resources
  router.get('/modify_listing', checkAuthenticated, getAdminModifyListing);

  router.get('/order_details', checkAuthenticated, getAdminOrderDetails);

  router.get('/register', checkNotAuthenticated,  getAdminRegister);
  
  router.post('/register', checkNotAuthenticated, registerAdmin)


  
// export function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next()
//     }
  
//     res.redirect('/login')
//   }
  
// export function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return res.redirect('/schedule')
//     }
//     next()
//   }
  
export default router