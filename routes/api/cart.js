const Cart = require("../../models/cart");
const Product = require("../../models/product");
const express = require("express");
const router = express.Router();
const asyncHandler = require("../../middleware/error");
const auth = require("../../middleware/auth");

//route: /api/cart/:id POST
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

//route: /api/cart/display POST
router.get("/display", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ user: userId }).populate("products");
    return res.status(200).json({ message: "Products", cart });
  } catch (err) {
    asyncHandler(res, err);
  }
});

//route: /api/cart/id=123  DELETE
//to remove one instance of that product
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

// route: api/cart/deleteAll:id=123   DELETE
//to delete all instances of that product
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
