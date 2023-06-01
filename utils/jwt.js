const jwt = require("jsonwebtoken");

const createJWT = ({payload}) =>{
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME});
    return token;
}

const isTokenValid = ({token}) => jwt.verify(token,process.env.JWT_SECRET);


const attachCookiesToResponse = ({res,user}) =>{
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed:true,
  });
  // name, value and options i.e name = 'token' and value = token and options = {httpOnly: true,expires: new Date(Date.now() + oneDay)}
  // here signed: true means that token is signed and encrypted before being sent to the client 

}


module.exports = {
    createJWT, isTokenValid, attachCookiesToResponse,
};