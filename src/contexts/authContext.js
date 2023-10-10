import React, { useState, useContext, createContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logOut } from "services/userService";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return token !== null;
  });

  const history = useHistory();

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    await logOut()
    setAuthenticated(null);
    window.location.reload();
  };

  useEffect(() => {
    if (isAuthenticated) {
      // history.push("/admin/dashboard");
    } else {
      history.push("/auth/sign-in");
    }

    return () => {};
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
