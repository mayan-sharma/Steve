const express = require("express");

const Cart = require("../../models/cart");
const Product = require("../../models/product");
const asyncHandler = require("../../middleware/error");
const auth = require("../../middleware/auth");

const router = express.Router();

/**
 * @method POST
 * @route /api/cart/:id
 * @Authorization Bearer <Token>
 */
router.post("/:id", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ user: userId });
    cart.products.push(req.params.id);
    let product = await Product.findById(req.params.id);
    await cart.save();
    res.json({
      message: "Product added to cart",
      cart,
      product,
    });
  } catch (err) {
    asyncHandler(res, err);
  }
});

/**
 * @method GET
 * @route /api/cart/display
 * @Authorization Bearer <Token>
 */
router.get("/display", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ user: userId }).populate("products");
    return res.status(200).json({ message: "Products", cart });
  } catch (err) {
    asyncHandler(res, err);
  }
});

/**
 * @method DELETE
 * @route /api/cart/:id
 * @Authorization Bearer <Token>
 */
router.delete("/:id", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    let cart = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $pull: { products: req.params.id },
      }
    );
    let product = await Product.findById(req.params.id);
    return res.status(200).json({
      message: "Product deleted",
      product,
    });
  } catch (err) {
    asyncHandler(res, err);
  }
});

/**
 * @method DELETE
 * @route /api/cart/deleteAll/:id
 * @Authorization Bearer <Token>
 */
router.delete("/deleteAll/:id", auth, async (req, res) => {
  try {
    let cart = await Cart.findByIdAndUpdate(
      { user: req.user.id },
      {
        $pull: { products: req.params.id },
      }
    );
    let product = await Product.findById(req.params.id);
    return res.status(200).json({
      message: "Product deleted",
      product,
    });
  } catch (err) {
    asyncHandler(res, err);
  }
});

module.exports = router;
