<h1>SBA (Service Booking App)</h1>

<h2>A Simple app for booking services</h2>

# Installation

<code>npm install body-parser connect-mongo ejs express express-flash express-session fullcalendar method-override mongoose passport passport-local-monogoose</code>
<code>npm install nodemon dotenv</code>

# Create .env file
<code>
SESSION_SECRET=<express-session secret>
MONGODB_USER=<mongodb user>
MONGODB_PASS=<mongodb password>
MONGODB_CONNECT=<connect url>
</code>

# Start the App
<code>npm run devStart</code>

# Adding Additional front end pages
<p>Convert all html pages to ejs and add them to the ./views folder</p>
<p>Place all javascript and css files in the respective folders in .public</p>