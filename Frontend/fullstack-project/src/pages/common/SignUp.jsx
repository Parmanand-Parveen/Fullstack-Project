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
    <div className="w-full flex justify-center items-center px-4 min-h-screen bg-gray-50 dark:bg-gray-900">
  <form
    onSubmit={handelForm}
    className="mt-10 w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
  >
    <h2 className="text-center text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
      Sign Up
    </h2>

    <Label
      htmlFor="username"
      className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
    >
      Username
    </Label>
    <Input
      value={formData.username}
      onChange={(e) =>
        setFormData({ ...formData, username: e.target.value })
      }
      className="bg-gray-100 text-black dark:bg-gray-700 dark:text-gray-200 mb-3 w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your username"
      type="text"
      id="username"
    />

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
      onChange={(e) =>
        setFormData({ ...formData, password: e.target.value })
      }
      className="bg-gray-100 text-black dark:bg-gray-700 dark:text-gray-200 mb-4 w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your password"
      type="password"
      id="password"
    />

    <Button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
    >
      Sign Up
    </Button>

    <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
      Already have an account?{" "}
      <Link
        to="/auth/login"
        className="text-blue-600 hover:underline font-medium dark:text-blue-400"
      >
        Login
      </Link>
    </p>
  </form>
</div>

  );
}

export default SignUp;
