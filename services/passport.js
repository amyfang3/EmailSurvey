const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Loads 'users' model class
const User = mongoose.model("users");

// Generates identifying piece of info for the user for passport to store into a cookie
// done() first param: error message if needed, second param: identifying piece of info to identify the user in follow-up requests
// user.id is not the google profile id, but the MongoDB-generated id for that particular user (bc we could have multiple sign-in strategies)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Uses identifying token to locate the user in MongoDB
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

// Tells Passport to use Google strategy for authentication
// passes in Google client ID and client secret + route that user will be directed to after user permission is granted
// Google returns relevant information
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true, // Need this to run through Heroku proxy
    },
    async (accessToken, refreshToken, profile, done) => {
      // Checks if user exists in DB
      // Everytime we perform an action against the DB, it's async
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // we already have a record w/ the given profile ID
        done(null, existingUser);
      } else {
        // creates new user and saves to the DB
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
      }
    }
  )
);
