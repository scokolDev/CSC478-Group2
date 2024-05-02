// Import necessary modules
import express from 'express'
import vhost from 'vhost'
import scheduleController from '../controllers/scheduleController.js'
import productRouter from './productRouter.js'
import orderRouter from './orderRouter.js'
import customerRouter from '../routers/customerRouter.js'
import resourceController from '../controllers/resourceController.js'
import organizationRouter from './organizationRouter.js'
import adminRouter from './adminRouter.js'
import locationRouter from './locationRouter.js'
import passport from 'passport'
import methodOverride from 'method-override' 
import User from '../models/users.js'
import { getOrgByDomain } from '../controllers/organizationController.js'
import AWS from 'aws-sdk'
import multer from 'multer';
import fs from 'fs'


// Create a router instance
const router = express.Router();

const s3 = new AWS.S3();
const upload = multer({ dest: 'uploads/' });


router.use(passport.session());

router.use(methodOverride('_method'))


// Route handler for the root path
router.get('/', (req, res, next) => {
    if (req.vhost) {
      req.body.orgdomain = req.vhost[0]
      next()
    } else {
      res.render('index.ejs', {orgname: ''})
    }
    // Serve the index.html file
    
  });

  router.get('/', getOrgByDomain, checkOrderAuthenticated, (req, res) => {
  
    // Serve the index.html file
    
    res.render('test_copy.ejs', {orgname: req.body.organizationName, stripeKey: process.env.STRIPE_PUBLIC_KEY, customerID: req.user._id})
  });

  router.get('/schedule', checkAuthenticated, (req, res) => {
    // Serve the index.html file
    res.render('index-main.ejs', {name: req.user.firstName});
  });

// Route handler for Customer Login
router.get('/login', checkNotAuthenticated, (req, res) => {
  // Serve the Login.ejs file
  res.render('login.ejs');
});

router.post('/login', checkNotAuthenticated, passport.authenticate('user', {
  successRedirect: '/schedule',
  failureRedirect: '/login',
  failureFlash: true
}))



// Route handler for Register
router.get('/register', checkNotAuthenticated,  (req, res) => {
  // Serve the Register.ejs file
  res.render('register.ejs');
});

// Route handler for customer dashboard
router.get('/dashboard', checkAuthenticated,  (req, res) => {
  // Serve the customer_dash.ejs file
  res.render('customer_dash.ejs');
});

// Route handler for customer order details page
router.get('/order_details', checkAuthenticated,  (req, res) => {
  // Serve the customer_order_details.ejs file
  res.render('customer_order_details.ejs');
});


// Route handler for Order Form
router.get('/order',  getVhost, getOrgByDomain, (req, res) => {
  // Serve the Order From ejs file
  res.render('order_form.ejs', {orgname: req.body.organizationName});
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
        //res.send(err)
        res.status(500).json({message: err.message})
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
router.use('/api/products', productRouter);
router.use('/api/orders', orderRouter);
router.use('/api/customers', customerRouter);
router.use('/api/resources', resourceController);
router.use('/api/organizations', organizationRouter);
router.use('/api/locations', locationRouter);

router.use('/admin', adminRouter)
router.use('/customer', customerRouter)



// An endpoint for uploading files
router.post('/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    const params = {
        Bucket: 'csc478-group2-sba-bucket', // replace with your bucket name
        Key: file.originalname, // File name you want to save as
        Body: fs.createReadStream(file.path)
    };

    s3.upload(params, function (err, data) {
        if (err) {
            return res.status(500).send(err);
        }

        res.send({ message: 'File uploaded successfully', data });
    });
});

export function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

export function checkOrderAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.render('test.ejs', {orgname: req.body.organizationName, stripeKey: process.env.STRIPE_PUBLIC_KEY})
}

export function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/schedule')
  }
  next()
}

export function getVhost(req, res, next) {
  if (req.vhost) {
    req.body.orgdomain = req.vhost[0]
    next()
  } else {
    res.status(404).json({messaage: "Subdomain not found."})
  }
  // Serve the index.html file
  
};

// Export the router
export default router;
