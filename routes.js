// Import necessary modules
const express = require('express');
const scheduleController = require('./controllers/scheduleController');
const bcrypt = require('bcrypt');
const passport = require('passport')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)


const users = []

// Create a router instance
const router = express.Router();

router.use(passport.initialize())
router.use(passport.session())
router.use(methodOverride('_method'))

// Route handler for the root path
router.get('/', (req, res) => {
    // Serve the index.html file
    res.redirect('/login')
  });


  router.get('/schedule', checkAuthenticated, (req, res) => {
    // Serve the index.html file
    res.render('index.ejs', {name: req.user.name});
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
  const { name, email, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    users.push({
      id: Date.now().toString(),
      name: name,
      email: email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  } 
})

router.delete('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

router.get('/script.js', (req, res) => {
    // Serve the index.html file
    res.sendFile(__dirname + '/views/script.js');
  });

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
