import axios from "axios";

// Set base URL for all requests
const API = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL || "/api",
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


// Handle global response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log errors or show notifications
    console.error("API Error:", error.response || error.message);
    if (error.response?.status === 401) {
      // Optional: Redirect to login on token expiry
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


export default API;
