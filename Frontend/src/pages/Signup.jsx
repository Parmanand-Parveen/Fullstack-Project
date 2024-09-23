import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUpHandle } from '../operations/userOperations'
import { useDispatch } from 'react-redux'




function Signup() {
const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const navigate = useNavigate()
const dispatch = useDispatch()


function signUpHandler(e){
    e.preventDefault();
    signUpHandle(email,password,username,navigate,dispatch)
}
  return (
    <div>
     <form onSubmit={signUpHandler}>
       <input
       value={username} 
       onChange={(e)=>setUsername(e.target.value)} 
       type="text" placeholder="username"/>
       <input
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       type="email" placeholder="email"/>
       <input
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
       type="password" placeholder="password"/>
       <button type="submit">Signup</button>    
      
     
     </form>
    
    
    </div>
  )
}

export default Signup