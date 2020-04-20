const mongoose = require('mongoose');
// const mongoURI = todo;

const connectDb = async ()=>{
    try{
        await mongoose.connect(mongoURI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Mongodb connected.. ');
    } catch(err) {
      
        console.log(`Error in connecting to db ${err}`);
        process.exit(1);
        
    }
}

module.exports = connectDb;