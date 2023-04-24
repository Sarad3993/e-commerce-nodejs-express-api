require("dotenv").config(); // dotenv is a package that helps us to load the environment variables from the .env file to the process.env object. It is useful because we can store the sensitive information like the database url, jwt secret, etc in it. if we invoke here then we don't need to invoke it in every file separately
require("express-async-errors"); // express async errors is a middleware that handles all the errors thrown by the async functions instead of adding try catch blocks in every async function

const express = require ("express");
const app = express();

// rest of the packages 
const morgan = require("morgan"); // morgan is a middleware that logs the requests to the console i.e it logs the method, url, status code, response time in the console for every request made to the server. It is useful because it helps us to identify we are hitting this route so bascially helps us to debug our application

const cookieParser = require("cookie-parser");

// database 
const connectDB = require("./db/connect");

// routers 
const authRouter = require('./routes/authRoutes');

// middlewares 
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');


app.use(morgan('tiny')) // tiny is the format of the logs that we want to see in the console i.e method, url, status code, response time etc. 

app.use(express.json()) // this is a middleware that parses the incoming request with JSON payloads and is based on body-parser so we don't need to install body-parser separately

app.use(cookieParser(process.env.JWT_SECRET)); // signing the token with the secret key i.e process.env.JWT_SECRET


app.get('/',(req,res)=>{
    res.send("e-commerce-api");
})

app.get("/api/v1", (req, res) => {
//   console.log(req.cookies);
  console.log(req.signedCookies); 
 res.send("e-commerce-api");
});

app.use('/api/v1/auth',authRouter);


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