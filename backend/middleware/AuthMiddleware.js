const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const protected = asyncHandler(
  async (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
      try{
        token = req.headers.authorization.split(" ")[1];
        // verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // get user from the token
        req.user = await User.findById(decoded.id).select("-password");
        next()
      }catch(err){
        console.log(err);
        res.status(401);
        throw new Error("Not Authorized")
       // res.json("")
     
    }
  }

  if(!token){
    res.status(401);
    throw new Error("Not Authorized ! No token")
  }
}
)

module.exports = {protected}
