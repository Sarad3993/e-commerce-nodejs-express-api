const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong,try again later",
  };
  
  // Mongoose validation error 
  // validation error occurs when we try to create a new item with invalid data i.e data sent by user in the request body doesn't match the schema defined in the model
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST;
    // 400 --> BAD_REQUEST
  }

  // Mongoose duplicate key error
  // duplicate key error occurs when we try to create a new item with a value that already exists in the database for a unique field like email
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
    // 400 --> BAD_REQUEST
  }
  
  // Mongoose cast error
  // cast error occurs when we pass an invalid id in the url parameter
  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
    // 404 --> NOT_FOUND
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};


module.exports = errorHandlerMiddleware;
