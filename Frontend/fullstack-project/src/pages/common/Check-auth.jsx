import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function Checkauth({ isAuhenticated, user, children }) {
  const location = useLocation();


  if (isAuhenticated == "false") {
    return <Navigate to="/auth/login" />;
  }

  if (
    !isAuhenticated &&
    (location.pathname.includes("/home") ||
      location.pathname.includes("/admin"))
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuhenticated &&
    user.isAdmin == "user" &&
    (location.pathname.includes("/auth") ||
      location.pathname.includes("/admin"))
  ) {
    return <Navigate to="/home" />;
  }
  if (
    isAuhenticated &&
    user.isAdmin == "admin" && (location.pathname.includes("/auth") ||
      !location.pathname.includes("/admin"))
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default Checkauth;
