const mongoose = require("mongoose");
const { check } = require("express-validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    isAdmin: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

const validateUser = [
  check('name', 'Name must have more than 3 characters').not().escape().isEmpty().isLength({min: 3}),
  check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
  check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({min: 5}),
];

exports.User = User;
exports.validateUser = validateUser;