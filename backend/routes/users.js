const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// @route POST api/users
// @desc Register user
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check(
      "password",
      "Password length must be atleast 8 characters!"
    ).isLength({ min: 8 }),
    check("category", "Category is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password, category } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        category,
        password,
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // save user
      await user.save();
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
      console.log(err);
      res.status(500).send("Server Error!");
    }
  }
);

module.exports = router;
