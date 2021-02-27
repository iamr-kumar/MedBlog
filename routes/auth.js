const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const auth = require("./../middleware/auth");

router.post(
  "/",
  [
    check("email", "Enter a valid email").isEmail(),
    check("password", "password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
          category: user.category,
        },
      };

      // Return jsonwebtoken
      jwt.sign(
        payload,
        "my-secret-key",
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            return res.json({ token });
          }
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error!");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    // console.log(req.user.id);
    const user = await User.findById(req.user.id).select("-password");
    // console.log(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
