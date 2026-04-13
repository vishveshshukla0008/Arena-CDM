import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <div>{children}</div>;
};

export default Protected;
