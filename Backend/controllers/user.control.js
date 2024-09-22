const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const generateToken = require("../services/jwt")
const jwt = require("jsonwebtoken")


const registerUser = async (req,res)=>{
    const {username, password,email} = req.body
    const existingUser =await userModel.findOne({email})
    if(existingUser){
        res.send("User already exist")
    } else {
        const hashPassword = bcrypt.hash(password,10,async (err,hashedPassword)=>{
            const user = await userModel.create({
                username,
                password:hashedPassword,
                email
            })
            
    
            const token =  jwt.sign({email:user.email,id:user._id},"222",{expiresIn:"1h"})
            await res.cookie("token",token)
              res.json(user)
        })
        

    }
}

const loginUser = async (req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    console.log(user)
    if(!user){
        res.send("User does not exist")
    } else {
        const match = bcrypt.compare(password,user.password,(err,match)=>{
            if(err){
                res.send(err)
            }else {
                const token = jwt.sign({email:user.email,id:user._id},"222",{expiresIn:"1h"})
                res.cookie("token",token,).json(user)
            
            }
        })
    }
}

module.exports =  {
    loginUser,
    registerUser
}