import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("zfh_user") || "null"));
  const [token, setToken] = useState(() => localStorage.getItem("zfh_token"));

  const login = async (identifier, password) => {
    const { data } = await api.post("/auth/login", { identifier, password });
    localStorage.setItem("zfh_token", data.token);
    localStorage.setItem("zfh_user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    toast.success("Welcome back");
    return data.user;
  };

  const register = async (name, phone, password) => {
    const { data } = await api.post("/auth/register", { name, phone, password });
    localStorage.setItem("zfh_token", data.token);
    localStorage.setItem("zfh_user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    toast.success("Account created");
    return data.user;
  };

  const adminLogin = async (identifier, password) => {
    const { data } = await api.post("/auth/admin/login", { identifier, password });
    localStorage.setItem("zfh_token", data.token);
    localStorage.setItem("zfh_user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    toast.success("Welcome back, admin");
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("zfh_token");
    localStorage.removeItem("zfh_user");
    setToken(null);
    setUser(null);
    toast.success("Logged out");
  };

  return <AuthContext.Provider value={{ user, token, login, register, adminLogin, logout, isAuthenticated: Boolean(token) }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
