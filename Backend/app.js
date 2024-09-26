const express = require("express")
const userRouter = require("./routes/user.routes")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const dotenv= require("dotenv").config()

const  {MONGO_DB_SERVER} = process.env

const app = express()
console.log(process.env)


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


mongoose.connect(MONGO_DB_SERVER)


app.use("/api/v1",userRouter)


// http://localhost:3000/api/v1/register
app.listen(3000)
