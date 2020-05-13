const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://ritika:ritika@cluster0-uohi0.mongodb.net/test?retryWrites=true&w=majority";

const connectDb = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("Mongodb connected.. ");
  } catch (err) {
    console.log(`Error in connecting to db ${err}`);
    process.exit(1);
  }
};

module.exports = connectDb;
