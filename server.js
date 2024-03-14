import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

// Import the modules
import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes.js'
import passport from 'passport'
import flash from 'express-flash'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'


//Database Connection
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_CONNECT)
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

