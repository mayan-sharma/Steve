require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI.toString();

const connectDb = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Mongodb connected.. ");
  } catch (err) {
    console.log(`Error in connecting to db ${err}`);
    process.exit(1);
  }
};

module.exports = connectDb;
