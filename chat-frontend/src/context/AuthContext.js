// this is the original code 

// import React, { createContext, useState, useEffect } from "react";
// // import axios from "axios";
// import apiClient from "../utils/api";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Default value is null
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchAuthState = () => {
//       const userInfo = localStorage.getItem("userInfo");
//       console.log("userInfo in AuthContext:", userInfo);
//       if (userInfo) {
//         try {
//           setUser(JSON.parse(userInfo));
//         } catch (error) {
//           console.error("Failed to parse userInfo:", error);
//         }
//       }
//       setLoading(false);
//     };

//     fetchAuthState();
//   }, []);

//   const login = async (userData) => {
//     try {
//       const response = await apiClient.post(
//         "http://localhost:5000/api/v1/users/login",
//         userData
//       );

//       console.log("Login API response:", response.data); // Debugging
//       const { accessToken, refreshToken, user } = response.data.data;

//       // Save tokens and user info to localStorage
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);
//       localStorage.setItem("userInfo", JSON.stringify(user));
//       console.log("Tokens saved in localStorage:", accessToken, refreshToken); // Debugging
//       console.log("before set user:", user); // Debugging
//       // Update context state
//       setUser(user);
//       console.log("aftr set user in user authcontext:", user); // Debugging
//     } catch (error) {
//       console.error("Login failed:", error.response?.data || error.message);
//       throw error;
//     }
//   };

//   const logout = () => {
//     console.log("logout function called");
//     // localStorage.removeItem("token");
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("userInfo");
//     setUser(null); // Clear user from context
//     console.log("user after logout:", user); //
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



// belwo is the testing code 



import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";
import axiosInstance from "../utils/api";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAuthState = () => {
      const userInfo = localStorage.getItem("userInfo");
      console.log("userInfo in AuthContext:", userInfo);
      if (userInfo) setUser(JSON.parse(userInfo));
    };

    fetchAuthState();
  }, []);

  const login = async (userData) => {
    try {
      const { data } = await axiosInstance.post(
        "http://localhost:5000/api/v1/users/login",
        userData
      );

      const { accessToken, refreshToken, user } = data.data;

      console.log("Login API response in authcontext:", data); // Debugging
      console.table(
        "accesstoken form authContest",
        accessToken,
        " refreshToken in auth Context",
        refreshToken
      );

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      localStorage.setItem("userInfo", JSON.stringify(user));

      console.log(
        "Tokens saved in localStorage in authContext file :",
        accessToken,
        refreshToken
      ); // Debugging
      console.log("before set user in authContext file:", user); // Debugging

      setUser(user);
      console.log(
        "aftr set user in user authcontext in authContext file:",
        user
      ); // Debugging
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  };

    const logout = () => {
      console.log("logout function called");
      // localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");
      setUser(null); // Clear user from context
      console.log("user after logout:", user); //
    };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// belwo is the testing code 2nd testinng code 

