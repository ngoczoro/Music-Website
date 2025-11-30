import React, { createContext, useContext, useEffect, useState } from "react";
import { logoutUser } from "./services/authService";  // chỗ bạn để getCurrentUser
const API_BASE_URL = "http://localhost:8081/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);

  // Lần đầu mount: nếu có token -> gọi /me
  useEffect(() => {
    const init = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const me = await getCurrentUser();
        setUser(me);
      } catch (err) {
        console.error("Lỗi getCurrentUser:", err);
        logoutUser(); // xoá token nếu lỗi
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [token]);
const handleResponse = async (response) => {
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : {};

  return {
    ok: response.ok,
    status: response.status,
    message: data.message || response.statusText,
    data,
  };
};
  const getCurrentUser = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Chưa đăng nhập");
  
    const res = await fetch(`${API_BASE_URL}/common/users/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  
    const result = await handleResponse(res);
  
if (!result.ok) {
    console.warn("[Auth] /me trả lỗi:", result.status, result.message);
    throw new Error(result.message || "Lấy user thất bại");
  }

  console.log("[Auth] /me trả về user:", result.data);
  return result.data;   };
  
  const loginSuccess = (tokenFromLogin, userData) => {
    localStorage.setItem("authToken", tokenFromLogin);
    console.log("Token:", tokenFromLogin);
    setToken(tokenFromLogin);
    if (userData) setUser(userData);
  };

  const logout = () => {
    logoutUser();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loading, isAuthenticated: !!user, loginSuccess, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
