require("dotenv").config();
const express = require ("express");
const app = express();

// database 
const connectDB = require("./db/connect");







const port = process.env.PORT || 3000;

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI); // since it is returning a promise we need to await and pass the url
        app.listen(port, console.log(`Server is running on port ${port}...`));
    }catch(err){
        console.log(err);
    }
}

start();