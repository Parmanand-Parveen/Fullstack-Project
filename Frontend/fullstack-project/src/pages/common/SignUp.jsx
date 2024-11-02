import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerHandel } from "@/Store/auth-slice/index.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


function SignUp() {
const navigate = useNavigate()
const dispatch = useDispatch()

  const initialFormData = {
    username: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  async function  handelForm(e) {
    e.preventDefault();
      const res =  dispatch(registerHandel(formData)).then((res) => {
        window.location.reload();
        console.log(res)
      })
       console.log(res)
    setFormData(initialFormData);
  };


  return (
    <div className="w-full flex justify-center items-center">
      <form onSubmit={handelForm} className="mt-10">
        <Label htmlFor="username">Username</Label>
        <Input
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className="bg-transparent mb-3 w-96"
          placeholder="username"
          type="text"
          id="username"
        />
        <Label htmlFor="email">Email</Label>
        <Input
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-transparent mb-3 w-96"
          placeholder="email"
          type="email"
          id="email"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="bg-transparent mb-3 w-96"
          placeholder="password"
          type="password"
          id="password"
        />
        <Button type="submit" className="w-96 bg-blue-600">Sign Up</Button>
        <p className="text-sm">
          Already have an account? <Link to="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
