const customError = require('../errors')
const {isTokenValid} = require('../utils')

const authenticateUser = async(req,res,next) =>{
    const token = req.signedCookies.token
    if(!token){
        throw new customError.UnauthenticatedError('Authentication Invalid')
    }
    try{
       const {name, userId, role} = await isTokenValid({token})
       req.user = {name, userId, role}
       next();

    }catch(error){
         throw new customError.UnauthenticatedError("Authentication Invalid");
    }
};

module.exports = {authenticateUser,};