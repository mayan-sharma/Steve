const { Product, validateProduct } = require("../models/product");
const express = require("express");

const router = express.router();

router.get("/", async (req, res) => {
  const products = await Product.find().sort("name");
  res.json(products);
});

router.post("/", async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  await product.save();
  res.json(product);
});

router.put("/:id", async (req, res) => {
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
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) return res.status(404).send("Product not found!");

  res.json(product);
});

module.exports = router;
