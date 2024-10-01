import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const loginhandel = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <form on onSubmit={loginhandel} className="mt-10">
        <Label htmlFor="email">Email</Label>
        <Input
          className="bg-transparent mb-3 w-96"
          placeholder="email"
          type="email"
          id="email"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          className="bg-transparent mb-3 w-96"
          placeholder="password"
          type="password"
          id="password"
        />
        <Button type="submit" className="w-96 bg-blue-600">
          {" "}
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
