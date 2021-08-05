// Mongoose model class
const mongoose = require("mongoose");
const { Schema } = mongoose; // destructuring

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
});

// creates a new collection called users, if it doesn't already exist
mongoose.model("users", userSchema);
