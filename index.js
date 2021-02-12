const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDb = require("./config/mongoose");
const expressValidator = require("express-validator");
const path = require("path");
const cors = require('cors');

const app = express();

//connecting to database
connectDb();

// enable cors
app.use(cors());

//body parser
app.use(bodyParser.json());

//use validator
// app.use(expressValidator);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
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
