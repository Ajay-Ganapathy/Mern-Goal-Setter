const express = require("express")
const router = express.Router()
const {registerUser , loginUser , getMe } = require("../Controllers/userController")
const {protected} = require("../middleware/AuthMiddleware")
router.post("/",registerUser)
router.post("/login",loginUser)
router.get("/me",protected ,getMe)

module.exports = router;