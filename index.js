const express = require('express'); // Getting our underlying app library, on top of nodejs
const mongoose = require('mongoose'); // Library to handle database template configration and communication
const cookieSession = require('cookie-session'); // Used to encrypt the oauth cookies
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// Connecting to Database using Mongoose
mongoose.connect(keys.mongoURI);

// Defining underlying express as app framework
const app = express();

// Telling express to consider our Middleware
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // Has to be given in miliseconds, which is equal to 30 days
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Setting our routes to our express app
require('./routes/authRoutes')(app);

// Defining port and tell app to listen to incoming requests
const PORT = process.env.PORT || 5000;
app.listen(PORT);
