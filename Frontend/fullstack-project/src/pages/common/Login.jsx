import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, useToast } from "@/hooks/use-toast";
import { loginhandeler } from "@/Store/auth-slice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Login() {
  const {toast} = useToast()
  const dispatch = useDispatch()
  const initialFormData = {
    email: "",
    password: "",
  };


  const [formData, setFormData] = useState(initialFormData);

  const loginhandel = (e) => {
    e.preventDefault();
    dispatch(loginhandeler(formData)).then((res) => {
      toast({
        title: "Success",
        description: "Login Success",
        variant: "default",
        isClosable: true,
      })
      window.location.reload();
    })
    setFormData(initialFormData); 
    
  };

  return (
    <div className="w-full flex justify-center items-center">
      <form on onSubmit={loginhandel} className="mt-10">
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
        <Button type="submit" className="w-96 bg-blue-600">

          Login
        </Button>
        <p className="text-sm">
          Don't have an account? <Link to="/auth/register">SignUp</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
