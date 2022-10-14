const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel")
const User = require("../models/userModel")
// @desc GET goals
// @route GET /api/goals
// @access private

const getGoals = asyncHandler(async (req,res) => {
  const goals = await Goal.find({user : req.user.id})
  res.status(200).json(goals)
}
)

// @desc ADD goals
// @route POST /api/goals
// @access private

const addGoals = asyncHandler(async (req,res) => {
  if(!req.body.text)
  {
    res.status(400)
    throw new Error('Please enter this field')
  }

  const goal = await Goal.create({
    text : req.body.text,
    user : req.user.id
  })
  console.log(req.body)
  res.status(201).json(goal)
}
)

// @desc EDIT goals
// @route PUT /api/goals
// @access private

const editGoals = asyncHandler( async (req,res) => {
  const goal = await Goal.findById(req.params.id)
  if(!goal){
    res.status(400)
    throw new Error("Goal not found")
  }
  
  
  if(!req.user){
    res.status(401);
    throw new Error("User not found");
  }

  if(goal.user.toString() !== req.user.id){
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id , req.body , {new:true})
  res.status(200).json(updatedGoal)
}
)

// @desc DELETE goals
// @route DELETE /api/goals
// @access private

const deleteGoals = asyncHandler( async (req,res) => {
  const goal = await Goal.findById(req.params.id)
  if(!goal){
    res.status(400)
    throw new Error("Goal not found")
  }

 
  if(!req.user){
    res.status(401);
    throw new Error("User not found");
  }

  if(goal.user.toString() !== req.user.id){
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove()
  res.status(200).json({id : req.params.id})
}
)

module.exports = {getGoals,addGoals,editGoals,deleteGoals}