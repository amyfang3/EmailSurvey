// Determines production or development environment and returns respective credentials
// Heroku will define an environment variable NODE_ENV when running on Heroku
if (process.env.NODE_ENV === "production") {
  // in production - return prod set of keys
  module.exports = require("./prod");
} else {
  // in development - return dev keys
  module.exports = require("./dev");
}
