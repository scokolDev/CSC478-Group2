import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

// Import the modules
import express from 'express'
import vhost from 'vhost'
import bodyParser from 'body-parser'
import routes from './routers/routes.js'
import flash from 'express-flash'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

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

app.use(express.static(path.join(__dirname, 'public')));

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// Define a route handler for the root path
app.use(vhost('*.localhost', routes));
app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

