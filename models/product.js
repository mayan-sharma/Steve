const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = {
    name: Joi.string().min(5).required(),
    price: Joi.number().required(),
  };
  return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validateProduct = validateProduct;
