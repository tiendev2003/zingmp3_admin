import { createContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInformation, setUserInformation] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosClient
        .get("/api/account/profile")
        .then((response) => {
          if (response.data.data) {
            setIsAuthenticated(true);
            setUserRole(response.data.data.role);
            setUserInformation(response.data.data);
            localStorage.setItem("token", response.data.accessToken); // Store token
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await axiosClient.post(
        "/api/account/login",
        credentials
      );
      if (response.data.data) {
        setIsAuthenticated(true);
        setUserRole(response.data.data.role);
        setUserInformation(response.data.data);
        localStorage.setItem("token", response.data.accessToken); // Store token
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserInformation(null);
    localStorage.removeItem("token"); // Remove token
  };

  const updateUserInformation = async (updatedInfo) => {
    try {
      const response = await axiosClient.put(
        "/api/account/update-profile",
        updatedInfo,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserInformation(response.data.data);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const response = await axiosClient.put("/api/account/change-password", {
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Change password failed", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        login,
        logout,
        loading,
        userInformation,
        updateUserInformation,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
