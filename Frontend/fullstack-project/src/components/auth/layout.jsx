import React from "react";
import { Outlet } from "react-router-dom";

function Authlayout() {
  return (
    <div className="min-h-screen w-screen">
      <div className="w-full h-screen  bg-zinc-900 flex flex-col text-white">
        <div className="w-full h-1/4 bg-zinc-800 flex items-center justify-center">
          <h1>Welcome to The E-commerce </h1>
        </div> 
        <Outlet/>
      </div>
    </div>
  );
}

export default Authlayout;
