const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const generateToken = require("../services/jwt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config() 


const registerUser = async (req,res)=>{
    const {username, password,email} = req.body
    const existingUser =await userModel.findOne({email})
    if(existingUser){
        res.send("User already exist").json({success:false,message:"User already exist"})
    } else {
        const hashPassword = bcrypt.hash(password,10,async (err,hashedPassword)=>{
            const user = await userModel.create({
                username,
                password:hashedPassword,
                email
            })
            
    
            const token =  jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
            await res.cookie("token",token)
              res.json({
                success: true,
                message: "User created successfully",
                user:user
              })
        })
        
        

    }
}

const loginUser = async (req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    if(!user){
        res.send("User does not exist")
    } else {
        const match = bcrypt.compare(password,user.password,(err,match)=>{
            if(!match){
                res.status(400) 
                res.send("Wrong password")
            }else {
                const token = jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
                res.cookie("token",token,)-
                res.json({success:true,user:user})
            
            }
        })
    }
}

const logoutUser = async(req,res)=>{
    res.cookie("token","")
    res.json({success:true,message:"User logged out"})
}


const checkAuth = async(req,res,next)=>{
    const token = req.cookies.token
    console.log(token)
    if(!token){
        res.status(400).json({success:false,message:"User not logged in"})
    }else{
        const verifiedUser = jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user = await userModel.findOne({email:verifiedUser.email})
        
        res.status(200).json({
            success:true,
            user:user
        })
        next()
    }
}



module.exports =  {
    loginUser,
    registerUser,
    logoutUser,
    checkAuth
}