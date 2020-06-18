const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Preparing for authentication with cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// Preparing for authentication with cookie
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Use passport library to use Google oAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // Console log (profile) to see all profile data coming from Google
      const existingUser = await User.findOne({ googleId: profile.id });
      // Check if we already have a record with the given profile ID
      if (existingUser) {
        // To end the function from passport we call done (4th function argument)
        return done(null, existingUser); // existingUser is now the identified user
      }
      // "Else": We don't have a user record with this ID? create and save one!
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
