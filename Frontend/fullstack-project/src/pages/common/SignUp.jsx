import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className='w-full flex justify-center items-center'>
       <form  className='mt-10'>
         <Label htmlFor='username'>Username</Label>
         <Input className="bg-transparent mb-3 w-96" placeholder='username' type="text" id='username' />
         <Label htmlFor='email'>Email</Label>
         <Input className="bg-transparent mb-3 w-96" placeholder='email'  type="email" id='email' />
         <Label htmlFor='password'>Password</Label>
         <Input className="bg-transparent mb-3 w-96" placeholder='password'  type="password" id='password' />
         <Button className="w-96 bg-blue-600">Sign Up</Button>
         <p className='text-sm'>Already have an account? <Link to="/auth/login">Login</Link></p>
        </form>

    </div>
  )
}

export default SignUp