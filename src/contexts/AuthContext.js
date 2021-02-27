import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const { Provider } = AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentuser] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
  });

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  };

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/auth");
      setCurrentuser({
        isAuthenticated: true,
        token: localStorage.token,
        loading: false,
        user: res.data,
      });
    } catch (err) {}
  };

  const signup = async (name, email, password, category, dob) => {
    const config = { headers: { "Content-Type": "application/json" } };

    const body = JSON.stringify({ name, email, password, category, dob });
    try {
      const res = await axios.post("/users", body, config);
      localStorage.setItem("token", res.data);
      await loadUser();
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (email, password) => {
    const config = { headers: { "Content-Type": "application/json" } };

    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post("/auth", body, config);
      localStorage.setItem("token", res.data.token);
      await loadUser();
    } catch (err) {
      console.log(err);
    }
  };

  const value = {
    signup,
    currentUser,
    login,
  };

  return <Provider value={value}>{children}</Provider>;
};

export default AuthProvider;
