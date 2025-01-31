// import axios from "axios";

// // Set base URL for all requests
// const apiClient = axios.create({
//   baseURL: "/api/v1", // Proxy will forward to backend
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add token to headers if available
// apiClient.interceptors.request.use((config) => {
//   const accessToken = localStorage.getItem("accessToken");
//   if (accessToken) {
//     config.headers["Authorization"] = `Bearer ${accessToken}`;
//   }
//   return config;
// });


// // Handle global response errors
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Log errors or show notifications
//     console.error("API Error:", error.response || error.message);
//     if (error.response?.status === 401) {
//       // Optional: Redirect to login on token expiry
//       localStorage.removeItem("accessToken");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );


// export default apiClient;


// given below is the testing code ....



import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization token
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;



// 2nd testing code 

// import axios from "axios";

// // Create an axios instance
// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1", // Update base URL
// });

// // Add a request interceptor to attach the token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo?.token) {
//       config.headers["Authorization"] = `Bearer ${userInfo.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor for global error handling
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("Axios error:", error);
//     // Optionally handle specific error codes (like token expiry) here
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
