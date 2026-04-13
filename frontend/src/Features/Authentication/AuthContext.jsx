import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{ loading, setLoading, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
