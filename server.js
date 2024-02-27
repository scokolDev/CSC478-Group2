if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Import the Express module
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const bcrypt = require('bcrypt');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')



// Create an instance of the Express application
const app = express();

// Set ejs as the view-engine
app.set('view-engine', 'ejs')

app.use(express.urlencoded({ extended: false}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))


// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// Define a route handler for the root path
app.use(routes);

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
