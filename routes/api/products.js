const express = require("express");
const { check } = require("express-validator");

const Product = require("../../models/product");
const admin = require("../../middleware/admin");
const auth = require("../../middleware/auth");
const validate = require("../../middleware/validate");
const asyncHandler = require("../../middleware/error");

const router = express.Router();

/**
 * @method GET
 * @route /api/products/
 * @Authorization None
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort("name");
    return res.json({ message: "Products", products });
  } catch (err) {
    asyncHandler(res, err);
  }
});

/**
 * @method GET
 * @route /api/products/:id
 * @Authorization None
 */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.json({ message: "Product", product });
  } catch (err) {
    asyncHandler(res, err);
  }
});

/**
 * @method POST
 * @route /api/products
 * @Authorization Bearer <Token>, Admin
 */
router.post(
  "/",
  [auth, admin],
  validate([
    check("name", "Name must have more than 3 characters")
      .not()
      .isEmpty()
      .escape()
      .isLength({ min: 3 }),
    check("price", "Price must be a decimal value").not().isEmpty().isDecimal(),
  ]),
  async (req, res) => {
    try {
      const product = new Product({
        name: req.body.name,
        price: req.body.price,
      });

      await product.save();
      return res.json({ message: "Product added", product });
    } catch (err) {
      asyncHandler(res, err);
    }
  }
);

/**
 * @method PUT
 * @route /api/products/:id
 * @Authorization Bearer <Token>, Admin
 */
router.put(
  "/:id",
  [auth, admin],
  validate([
    check("name", "Name must have more than 3 characters")
      .not()
      .isEmpty()
      .escape()
      .isLength({ min: 3 }),
    check("price", "Price must be a decimal value").not().isEmpty().isDecimal(),
  ]),
  async (req, res) => {
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
      asyncHandler(res, err);
    }
  }
);

/**
 * @method DELETE
 * @route /api/products/:id
 * @Authorization Bearer <Token>, Admin
 */
router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return res.status(404).send("Product not found!");
    return res.json({ message: "Product deleted", product });
  } catch (err) {
    asyncHandler(res, err);
  }
});

module.exports = router;
