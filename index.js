const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User"); // make sure models folder is defined since passport uses models
require("./services/passport");

// Connects to MongoDB database hosted on MongoDB Atlas
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

// tells express to enable middlewares, including cookies and body-parser
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // how long cookies will last, in ms (30 days)
    keys: [keys.cookieKey], // encrypts our cookie
  })
);

// tells passport to enable cookies
app.use(passport.initialize());
app.use(passport.session());

// passes in app object into function within routes
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

// the port that Heroku tells app to listen to, using environment variables (production) or 5000 (development)
const PORT = process.env.PORT || 5000;
app.listen(PORT);
