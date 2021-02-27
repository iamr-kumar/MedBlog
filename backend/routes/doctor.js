const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

router.get("/get-tagged-posts", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.category != "Doctor") {
      return res.status(401).json({ comment: "User not authorized!" });
    }
    let doc = { doctor: user.id };
    if (req.query.verified) doc.verified = req.query.verified;
    const posts = await Post.find(doc).sort({ date: -1 });
    res.send(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
});

router.post("/find-doctor", auth, async (req, res) => {
  const docPattern = new RegExp("^" + req.body.query);
  try {
    const foundDoc = await User.find({
      name: { $regex: docPattern, $options: "i" },
      // category: "doctor",
    });
    res.json({ doc: foundDoc });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "Not found!" });
  }
});

module.exports = router;
