const { Product } = require("../../models/product");
const asyncHandler = require("../../middleware/error");
const admin = require("../../middleware/admin");
const auth = require("../../middleware/auth");
const express = require("express");
// const passport = require("passport");
const router = express.Router();

// route: /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort("name");
    return res.json({ message: "Products", products });
  } catch (err) {
    asyncHandler(err);
  }
});

// route: /api/products
router.post("/", [auth, admin], async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
    });

    await product.save();
    return res.json({ message: "Product added", product });
  } catch (err) {
    asyncHandler(err);
  }
});

// route: /api/products/:id
router.put("/:id", [auth, admin], async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
      },
      { new: true }
    );

    if (!product) return res.status(400).send("Product not found!");
    return res.json({ message: "Product updated", product });
  } catch (err) {
    asyncHandler(err);
  }
});

// route: /api/products/:id
router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return res.status(404).send("Product not found!");
    return res.json({ message: "Product deleted", product });
  } catch (err) {
    asyncHandler(err);
  }
});

module.exports = router;
