require("dotenv").config();
require("express-async-errors"); // express async errors is a middleware that handles all the errors thrown by the async functions instead of adding try catch blocks in every async function

const express = require ("express");
const app = express();

// database 
const connectDB = require("./db/connect");

// middlewares 
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');


app.use(express.json()) // this is a middleware that parses the incoming request with JSON payloads and is based on body-parser so we don't need to install body-parser separately

app.get('/',(req,res)=>{
    res.send('e-commerce-api');
})


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


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