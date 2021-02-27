const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

router.get("/:user/getpost", async (req, res) => {
  let user = await await User.findById(req.params.user);
  res.send(user.posts);
});
router.post(
  "/addpost",
  [auth,
    [check("text", "Body is required").not().isEmpty(),
    check("illness", "Cant Post if not suffering").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    let user = await await User.findById(req.user.id);
    if (!user)
      return res.status(400).json({ errors: [{ msg: "Invalid User ID" }] });

    const { text, illness, doctor } = req.body;
    try {
      let post = new Post({
        text,
        illness,
        doctor,
      });
      await user.posts.push(post);
      await user.save();
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error!");
    }
  }
);

module.exports = router;
