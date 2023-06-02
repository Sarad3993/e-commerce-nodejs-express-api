const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils')


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


    const tokenUser = createTokenUser(user);

    attachCookiesToResponse({res,user:tokenUser});

    res.status(StatusCodes.CREATED).json({user:tokenUser});

}

const login = async (req, res) => {
  const {email, password} = req.body // destructuring the email and password from the request body

  if(!email || !password){ // checking if the email and password are present in the request body
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({email}) // finding the user in the database based on the email provided

  if(!user){
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPassswordCorrect = await user.comparePassword(password); // comparing the password entered with the password in the database

  if(!isPassswordCorrect){
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

 const tokenUser = createTokenUser(user);

 attachCookiesToResponse({ res, user: tokenUser });

 res.status(StatusCodes.OK).json({ user: tokenUser });
};


const logout = async (req, res) => {
  res.cookie('token','logout',{
    httpOnly: true,
    // expires: new Date(Date.now() + 5*1000), // in 5 seconds cookie will be deleted
    expires : new Date(Date.now()), // above method does not work for postman so we set as the current time i.e cookie gets deleted from the browser as the user logs out 
  })
  res.status(StatusCodes.OK).json({msg: 'User logged out!'});
};


module.exports = {
    register,
    login,
    logout
}