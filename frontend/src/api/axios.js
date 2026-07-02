import axios from "axios";

const apiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    return "/api";
  }
  return "http://localhost:5000/api";
};

const api = axios.create({
  baseURL: apiBaseUrl(),
  timeout: 8000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("zfh_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
