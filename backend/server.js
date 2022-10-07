const express = require('express')
const dotenv = require('dotenv').config()
const colors = require("colors")
const connectDB = require("./config/db")
const {errorHandler} = require('./middleware/ErrorHandlerMiddleware')
const port = process.env.PORT || 5000

connectDB()
const app = new express()

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use(errorHandler)

//app.use('/',require('./routes/routes'))
//app.use('/api/goals/:id',require('./routes/routes'))
app.listen(port,() => console.log(`SERVER STARTED AT PORT: ${port} .... `))