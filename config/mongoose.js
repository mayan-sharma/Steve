const mongoose = require("mongoose");
const mongoURI =
  "mongodb://ritika:ritika@cluster0-shard-00-00-uohi0.mongodb.net:27017,cluster0-shard-00-01-uohi0.mongodb.net:27017,cluster0-shard-00-02-uohi0.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
// "mongodb+srv://ritika:ritika@cluster0-uohi0.mongodb.net/test?retryWrites=true&w=majority";

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
