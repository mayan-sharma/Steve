const express = require("express");
const mongoose = require("mongoose");
const products = require("./routes/products");

const app = express();

mongoose
  .connect("mongodb://localhost/ecommerce")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Couldn't connect to database", err));

app.use("/api/products", products);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}...`));
