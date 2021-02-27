const mongoose = require("mongoose");
const Post = require("./Post");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
