const User = require("../../models/user");
const Cart = require("../../models/cart");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

// route: api/user/login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign({ id: user._id }, "secretForNow", {
      expiresIn: "20s",
    });

    res.status(200).json({
      message: "logged in successfully",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
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

    const newUser = await User.create(req.body);
    const newUserCart = await Cart.create({user: newUser._id});

    const token = jwt.sign({ id: newUser._id }, "secretForNow", {
      expiresIn: "20s",
    });

    res.status(200).json({
      message: "User created",
      token,
      user: newUser,
      cart: newUserCart
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
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
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});
module.exports = router;
