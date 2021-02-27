const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

router.get("/getpost", async (req, res) => {
  let user = await User.findById(req.params.user);
  res.send(user.posts);
});
router.post(
  "/add-post",
  [
    auth,
    [
      check("text", "Body is required").not().isEmpty(),
      check("illness", "Cant Post if not suffering").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const user = await User.findById(req.user.id);
      if (!user)
        return res.status(400).json({ errors: [{ msg: "User not found!" }] });

      const { title, text, illness, doctor } = req.body;
      const post = new Post({ title, user: user._id, text, illness, doctor });
      // await user.posts.push(post);
      // user.posts.push(post._id);
      await post.save();
      res.json(post);
      // await user.save();
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error!");
    }
  }
);

module.exports = router;
