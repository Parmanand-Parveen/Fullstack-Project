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
    
            const token = jwt.sign({email:user.email,id:user._id},"222",{expiresIn:"1h"})
            res.cookie("token",token)
            res.send(user)
        })
        

    }
}

module.exports =  {
    registerUser
}