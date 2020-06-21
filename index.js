const express = require('express'); // Getting our underlying app library, on top of nodejs
const mongoose = require('mongoose'); // Library to handle database template configration and communication
const cookieSession = require('cookie-session'); // Used to encrypt the oauth cookies
const passport = require('passport');
const keys = require('./config/keys');
const path = require('path'); // Default module from Express, direct links got Internal Server Error without
require('./models/User');
require('./services/passport');

// Connecting to Database using Mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
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

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Defining port and tell app to listen to incoming requests
const PORT = process.env.PORT || 5000;
app.listen(PORT);
