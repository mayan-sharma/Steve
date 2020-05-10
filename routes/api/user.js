const User = require("../../models/user");
const Cart = require("../../models/cart");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const asyncHandler = require("../../middleware/error");
const router = express.Router();
const auth = require("../../middleware/auth");

// route: api/user/login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).json({
        message: "Invalid username or password",
      });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "secretForNow",
      {
        expiresIn: "3600s",
      }
    );

    return res.status(200).json({
      message: "logged in successfully",
      token,
      user,
    });
  } catch (err) {
    asyncHandler(err);
  }
});

//route: api/user/register
router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(422).json({
        message: "User already exists",
      });
    }

    // hashing password
    let newUser = await User.create(req.body);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();

    const newUserCart = await Cart.create({ user: newUser._id });

    return res.status(200).json({
      message: "User created",
      user: newUser,
      cart: newUserCart,
    });
  } catch (err) {
    asyncHandler(err);
  }
});

//route: api/user
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      message: "all users",
      users,
    });
  } catch (err) {
    asyncHandler(err);
  }
});

// route: api/user/verify
router.get("/verify", auth, async (req, res) => {
  try {
    res.status(200).json({ message: "User verified", user: req.user });
  } catch (err) {
    asyncHandler(err);
  }
});

module.exports = router;
