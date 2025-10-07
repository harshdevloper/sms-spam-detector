import React from "react";
import { Navigate } from "react-router-dom";

// This component will wrap around any route you want to protect
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If token exists, allow access
  return children;
}

export default ProtectedRoute;
