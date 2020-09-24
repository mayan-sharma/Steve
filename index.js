const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDb = require("./config/mongoose");
const expressValidator = require("express-validator");
const path = require("path");

const app = express();

//connecting to database
connectDb();

//body parser
app.use(bodyParser.json());

//use validator
// app.use(expressValidator);

//use routes
app.use("/api", require("./routes/api"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error in running server on port ${PORT}`);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
