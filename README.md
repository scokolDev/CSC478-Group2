<h1>SBA (Service Booking App)</h1>

<h2>A Simple app for booking services</h2>

# Installation

<code>npm install body-parser connect-mongo ejs express express-flash express-session fullcalendar method-override mongoose passport passport-local-monogoose</code><br>
<code>npm install nodemon dotenv --save-dev </code>

# Create .env file
<code>
SESSION_SECRET= express-session secret<br>
MONGODB_USER= mongodb user<br>
MONGODB_PASS= mongodb password<br>
MONGODB_CONNECT= connect url
</code>

# Start the App
<code>npm run devStart</code>

# Adding Additional front end pages
<p>Convert all <code>html</code> pages to ejs and add them to the <code>./views</code> folder</p>
<p>Place all javascript and css files in the respective folders in <code>./public</code></p>