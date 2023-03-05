const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');


const register = async (req,res) => {
  const {email,name,password} = req.body; // we are destructuring the email,name and password from the request body and storing it in the variables with the same name ie email,name and password respectively 
  const emailAlreadyExists = await User.findOne({email}); // we are checking if the email already exists in the database or not. Though we have set the email field as unique in the model, we are checking it again here to make sure that the email is unique because double checking is always better
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
    // make first registered user an admin always 
    const role = await User.countDocuments({}) === 0? 'admin':'user'; // countDocuments method returns the count of the documents in the database 
    // we are checking if the count of the documents in the database is 0 or not. If it is 0 then we are setting the role of the user to admin otherwise we are setting the role of the user to user

    const user = await User.create({name,email,password,role}); // instead of passing req.body we are passing the destructured variables ie email,name and password to the create method to make sure that only the required fields are passed to the create method and no other field is passed by mistake. It is always a good practice to pass only the required fields to the create method instead of passing the entire request body 
    res.status(StatusCodes.CREATED).json({user});
}

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};


module.exports = {
    register,
    login,
    logout
}