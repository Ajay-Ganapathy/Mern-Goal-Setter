const express = require('express')
const router = express.Router()
const {getGoals,addGoals,editGoals,deleteGoals} = require('../Controllers/goalController')
const {protected} = require("../middleware/AuthMiddleware")

router.route("/").get(protected,getGoals).post(protected,addGoals)
router.route("/:id").put(protected,editGoals).delete(protected,deleteGoals)

module.exports = router