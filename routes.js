// Import necessary modules
const express = require('express');
const scheduleController = require('./controllers/scheduleController');
const passport = require('passport')
const methodOverride = require('method-override')
const db = require('mongoose')
const User = require('./models/users')
const LocalStrategy = require('passport-local').Strategy
const path = require('path')



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
    res.redirect('/login')
  });


  router.get('/schedule', checkAuthenticated, (req, res) => {
    // Serve the index.html file
    res.render('index.ejs', {name: req.user.firstName});
  });

// Route handler for Login
router.get('/login', checkNotAuthenticated, (req, res) => {
  // Serve the Login.ejs file
  res.render('login.ejs');
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/schedule',
  failureRedirect: '/login',
  failureFlash: true
}))


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
    res.redirect('/login');
  });
});

// router.get('/script.js', (req, res) => {
//     // Serve the index.html file
//     res.sendFile(__dirname + '/views/script.js');
//   });

// Use scheduleController middleware for '/api/events' routes
router.use('/api/events', scheduleController);

function checkAuthenticated(req, res, next) {
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
module.exports = router;
