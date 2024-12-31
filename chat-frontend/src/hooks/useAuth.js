import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const useAuth = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const register = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAuthState({
        ...authState,
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        credentials
      );
      setAuthState({
        ...authState,
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ user: null, token: null });
  };

  return { authState, register, login, logout, error };
};

export default useAuth;
