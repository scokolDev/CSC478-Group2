if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Import the Express module
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session');

//Database Connection
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_CONNECT)
const MongoStore = require('connect-mongo')
const db = mongoose.connection



// Create an instance of the Express application
const app = express();

// Set ejs as the view-engine
app.set('view-engine', 'ejs')

app.use(express.urlencoded({ extended: false}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongoUrl: db.client.s.url })
}))


// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// Define a route handler for the root path
app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

