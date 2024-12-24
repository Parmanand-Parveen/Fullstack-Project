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
    <div className="w-full flex justify-center items-center px-4 h-full bg-gray-50 dark:bg-gray-900">
    <form
      onSubmit={loginhandel}
      className="mt-10 w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Login
      </h2>
      
      <Label
        htmlFor="email"
        className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
      >
        Email
      </Label>
      <Input
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="bg-gray-100 text-black dark:bg-gray-700 dark:text-gray-200 mb-3 w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your email"
        type="email"
        id="email"
      />
  
      <Label
        htmlFor="password"
        className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
      >
        Password
      </Label>
      <Input
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="bg-gray-100 text-black dark:bg-gray-700 dark:text-gray-200 mb-4 w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your password"
        type="password"
        id="password"
      />
  
      <Button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Login
      </Button>
  
      <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="text-blue-600 hover:underline font-medium dark:text-blue-400"
        >
          Sign Up
        </Link>
      </p>
    </form>
  </div>
  
  
  );
}

export default Login;
