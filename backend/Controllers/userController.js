const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler");
const { JsonWebTokenError } = require("jsonwebtoken");
const User = require("../models/userModel")

// @desc = Register User
// @route = POST /api/users
// @access = Public 

const registerUser = asyncHandler(async (req,res) => {
  const {name,email,password} = req.body
  if(!name || !email || !password){
    res.status(400)
    throw new Error("Please fill all the fields");   
  }

  // Checking if the user exists

  const isUser = await User.findOne({email});
  if(isUser){
    res.status(400)
    throw new Error("User already exists"); 
  }

  // Hash the password

  const salt = await bcrypt.genSalt(10);
  const hashedpass = await bcrypt.hash(password,salt);

  // Create the user

  const user = await User.create({
    name,
    email,
    password : hashedpass
  })

  if(user){
    res.status(201)
    res.json({
      _id : user.id,
      name : user.name,
      email : user.email,
      token : generateToken(user._id)    
    })
  }else{
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc = Authenticate a user 
// @route = POST /api/users/login
// @access = Public 

const loginUser = asyncHandler(async (req,res) => {

  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(user && (await bcrypt.compare(password,user.password))){
    res.status(201)
    res.json({
      _id : user.id,
      name : user.name,
      email : user.email, 
      token : generateToken(user._id)   
    })
  }else{
    res.status(400)
    throw new Error("Invalid Credentials")
  }
 
})

// @desc = Get User data
// @route = POST /api/users/me
// @access = Private

const getMe = asyncHandler(async (req,res) => {
  res.status(201).json(req.user)
})


// generate bearer token using JWT

const generateToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn : '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe
}