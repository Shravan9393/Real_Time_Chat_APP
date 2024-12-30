import axios from "axios";

// Set base URL for all requests
const API = axios.create({
  baseURL: "/api", // Proxy will forward to backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
