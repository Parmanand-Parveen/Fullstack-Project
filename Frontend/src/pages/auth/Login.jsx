import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginHandler } from '../../operations/userOperations'
import { useDispatch } from 'react-redux'

function Login() {
     const [email, setEmail] = useState("")   
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function loginhandle(e){
        e.preventDefault();
        loginHandler(email,password,navigate,dispatch)
    }
      
  return (
    <div>
       <form  onSubmit={loginhandle}>
        <input 
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
        type="email" placeholder="email"/>
        <input
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}} 
        type="password" placeholder="password"/>
        <button type="submit">Login</button>
       </form>
    </div>
  )
}

export default Login