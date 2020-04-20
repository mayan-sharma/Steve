const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDb = require('./config/mongoose');

const passport = require('passport');
const passportJwt = require('./config/passport-jwt-strategy');

const app = express();

//connecting to database
connectDb();

//body parser
app.use(bodyParser.json());

app.use(passport.initialize());

//use routes
app.use('/api',require('./routes/api'));

const PORT = process.env.PORT||8000;
app.listen(PORT, (err)=>{
    if(err){
        console.log(`Error in running server on port ${PORT}`);
    }else{
        console.log(`Server running on port ${PORT}`);
    }
})