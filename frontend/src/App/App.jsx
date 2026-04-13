import React, { useContext, useEffect } from "react";
import AppRoutes from "./AppRoutes";
import useAuth from "../Features/Authentication/hooks/useAuth";
import { AuthContext } from "../Features/Authentication/AuthContext";
import { Navigate } from "react-router";

const App = () => {
  const {handleGetUser} = useAuth();
  useEffect(() => {
    handleGetUser();
  }, []);
  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
