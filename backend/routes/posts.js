const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

router.get("/all", async (req, res) => {
  try {
    const foundPosts = await Post.find({}).sort({ date: -1 });
    res.json({ posts: foundPosts });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error!" });
  }
});

router.get("/search-post/:id", async (req, res) => {
  const illness = req.params.id;
  const illnessReg = new RegExp(illness);
  try {
    const foundPosts = await Post.find({
      illness: { $regex: illnessReg, $options: "i" },
    });
    res.json({ posts: foundPosts });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error!" });
  }
});

router.get("/:post", async (req, res) => {
  try {
    let post = await Post.findById(req.params.post);
    if (!post) return res.status(404).send({ msg: "No post found" });
    res.json({ post });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error!");
  }
});

router.put("/:post/like", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Already liked!" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error!");
  }
});

router.put("/:post/unlike", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }
    const index = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(index, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error!");
  }
});

router.post(
  "/:post/comment",
  [auth, [check("text", "Comment cannot be blank").not().isEmpty()]],
  async (req, res) => {
    const user = req.user.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const { name } = await User.findById(req.user.id);
      const post = await Post.findById(req.params.post);
      const newComment = {
        user: req.user.id,
        name: name,
        text: req.body.text,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error!");
    }
  }
);

router.delete("/:post/:comment", auth, async (req, res) => {
  const post = await Post.findById(req.params.post);
  const comment = post.comments.find(
    (comment) => comment.id == req.params.comment
  );
  console.log(comment);
  if (!comment) {
    return res.status(404).json({ msg: "Comment not found!" });
  }
  if (
    comment.user.toString() == req.user.id ||
    post.user.toString() == req.user.id
  ) {
    const index = post.comments
      .map((comment) => comment.id.toString())
      .indexOf(comment.id);
    console.log(index);
    post.comments.splice(index, 1);
    await post.save();
    return res.json(post.comments);
  }
  res.status(401).json({ comment: "User not authorized!" });
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

      const { title, text, illness, docId, doctor } = req.body;
      const post = new Post({
        title,
        user: user._id,
        name: user.name,
        text,
        illness,
        docId,
        doctor,
      });
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

router.put("/:post/verify", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.category != "Doctor") {
      return res.status(401).json({ comment: "User not authorized!" });
    }
    const post = await Post.findById(req.params.post);
    if (post.doctor != req.user.id) {
      return res
        .status(401)
        .json({ comment: "Only Tagged Doctor Can verify the post" });
    }
    post.verified = true;
    post.save();
    res.send(post);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
