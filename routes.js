// Import necessary modules
import express from 'express'
import scheduleController from './controllers/scheduleController.js'
import productController from './controllers/productController.js'
import orderController from './controllers/orderController.js'
import customerController from './controllers/customerController.js'
import resourceController from './controllers/resourceController.js'
import passport from 'passport'
import methodOverride from 'method-override' 
import db from 'mongoose'
import User from './models/users.js'
import LocalStrategy from 'passport-local'
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
// Create a router instance
const router = express.Router();

passport.use(new LocalStrategy({usernameField: 'email'}, User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());
router.use(passport.initialize())
router.use(passport.session())
router.use(methodOverride('_method'))
router.use(express.static(path.join(__dirname, 'public')));

// Route handler for the root path
router.get('/', (req, res) => {
    // Serve the index.html file
    res.render('test.ejs')
  });


  router.get('/schedule', checkAuthenticated, (req, res) => {
    // Serve the index.html file
    res.render('index.ejs', {name: req.user.firstName});
  });

// Route handler for Customer Login
router.get('/login', checkNotAuthenticated, (req, res) => {
  // Serve the Login.ejs file
  res.render('login.ejs');
});

// Route handler for Admin Login
router.get('/admin/login', checkNotAuthenticated, (req, res) => {
  // Serve the Login.ejs file
  res.render('admin_login.ejs');
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/schedule',
  failureRedirect: '/login',
  failureFlash: true
}))

router.post('/admin/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/admin/dashboard',
  failureRedirect: '/admin/login',
  failureFlash: true
}))

// Route handler for Admin Dashboard
router.get('/admin/dashboard', checkAuthenticated, (req, res) => {
  // Serve the Login.ejs file
  res.render('admin_dash.ejs');
});

// Route handler for Admin Listings
router.get('/admin/listings', checkAuthenticated, (req, res) => {
  // Serve the Login.ejs file
  res.render('admin_listings.ejs');
});


// Route handler for Register
router.get('/register', checkNotAuthenticated,  (req, res) => {
  // Serve the Register.ejs file
  res.render('register.ejs');
});

router.post('/register', checkNotAuthenticated, async (req, res) => {
    User.register(
      new User({
        username: req.body.email,
        email: req.body.email,
        firstName: req.body.firstname,
        lastName: req.body.lastname
    }), req.body.password, function (err, msg) {
      if (err) {
        res.send(err)
        //res.redirect('/register')
      } else {
        res.redirect('/login')
      }
    })
})

router.delete('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


// Use scheduleController middleware for '/api/events' routes
router.use('/api/events', scheduleController);

//Use middleware for '/api/{controller}'
router.use('/api/products', productController);
router.use('/api/orders', orderController);
router.use('/api/customers', customerController);
router.use('/api/resources', resourceController);

export function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/schedule')
  }
  next()
}

// Export the router
export default router;
