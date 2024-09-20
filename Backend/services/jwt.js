const jwt = require("jsonwebtoken")


const generateToken = function(email,id){
    return jwt.sign({email,id},"222")
    
}

module.exports =  { generateToken}