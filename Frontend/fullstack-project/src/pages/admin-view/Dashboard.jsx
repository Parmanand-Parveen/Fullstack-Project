import { useToast } from "@/hooks/use-toast";
import { LayoutDashboard } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

function Admindashboard() {

  const {toast} = useToast()
  const dispatch = useDispatch();
  const clear = () => {
    localStorage.clear();
    dispatch(logout()).then(() => {
      window.location.reload();
      toast({
        title: "Logout",
        description: "Logout Success",
      })
    });
    // localStorage.setItem('isAuthenticated', 'false')
    // localStorage.setItem('user', 'null')
    navigate("/auth/login");
  };

  return (
    <div>
      <header className="flex w-full justify-between items-center px-5 py-3 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          <LayoutDashboard />
          Dashboard
        </div>
        <NavLink
          onClick={clear}
          className="text-red-500 font-semibold text-lg px-3 py-2 rounded-md flex items-center gap-2 hover:text-red-500"
        >
          Logout
        </NavLink>
      </header>
    </div>
  );
}

export default Admindashboard;
