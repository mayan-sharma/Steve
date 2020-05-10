const Cart = require("../../models/cart");
const { Product } = require("../../models/product");
const express = require("express");
const router = express.Router();
// const passport = require("passport");
const asyncHandler = require("../../middleware/error");
const auth = require("../../middleware/auth");

//route: /api/cart/:id POST
router.post("/:id", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ user: userId });
    cart.products.push(req.params.id);
    await cart.save();
    res.json({
      message: "Product added to cart",
      cart,
    });
  } catch (err) {
    asyncHandler(err);
  }
});

//route: /api/cart/display POST
router.get("/display", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ user: userId }).populate("products");
    return res.status(200).json({ message: "Products", cart });
  } catch (err) {
    asyncHandler(err);
  }
});

//route: /api/cart/?product_id=123&cart_id=231  DELETE
//to remove all instances of that product
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
    asyncHandler(err);
  }
});
module.exports = router;
