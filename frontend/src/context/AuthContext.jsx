import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios.js";

const AuthContext = createContext(null);

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("zfh_user") || "null");
  } catch {
    localStorage.removeItem("zfh_user");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem("zfh_token"));
  const [authLoading, setAuthLoading] = useState(Boolean(localStorage.getItem("zfh_token")));

  const clearSession = () => {
    localStorage.removeItem("zfh_token");
    localStorage.removeItem("zfh_user");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (!token) {
      setAuthLoading(false);
      return;
    }

    let active = true;
    setAuthLoading(true);
    api.get("/auth/me")
      .then(({ data }) => {
        if (!active) return;
        if (!data?.user) {
          clearSession();
          return;
        }
        localStorage.setItem("zfh_user", JSON.stringify(data.user));
        setUser(data.user);
      })
      .catch(() => {
        if (!active) return;
        clearSession();
      })
      .finally(() => {
        if (active) setAuthLoading(false);
      });

    return () => {
      active = false;
    };
  }, [token]);

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
    clearSession();
    toast.success("Logged out");
  };

  return <AuthContext.Provider value={{ user, token, login, register, adminLogin, logout, authLoading, isAuthenticated: Boolean(token && user) }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
