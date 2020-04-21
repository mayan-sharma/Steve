const { Product, validateProduct } = require("../../models/product");
const errorHandler = require("../../middleware/error");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort("name");
    res.json(products);
  } catch (err) {
    errorHandler(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
    });

    await product.save();
    res.json(product);
  } catch (err) {
    errorHandler(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
      },
      { new: true }
    );

    if (!product) return res.status(400).send("Product not found!");
    res.json(product);
  } catch (err) {
    errorHandler(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return res.status(404).send("Product not found!");
    res.json(product);
  } catch (err) {
    errorHandler(err);
  }
});

module.exports = router;
