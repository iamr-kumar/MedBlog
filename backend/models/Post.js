const mongoose = require("mongoose");
const User = require("./User");
const PostSchema = new mongoose.Schema({
  text: { type: String},
  verified: { type: Boolean, default: false },
  illness: { type: String, required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId,
rel: "User"},
  date: { type: Date, default: Date.now },
  likes: [{ user: { type: mongoose.Schema.Types.ObjectId, rel: "User" } }],
  comment: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, rel: "User" },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now}
    },
  ],
});

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
