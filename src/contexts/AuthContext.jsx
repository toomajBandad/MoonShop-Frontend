// src/context/AuthContext.jsx
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [userInfos, setUserInfos] = useState(
    JSON.parse(localStorage.getItem("userInfos")) || null
  );
  const [cartInfo, setcartInfo] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || null
  );

  const login = (newToken, userdata) => {
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("userInfos", JSON.stringify(userdata));
    setToken(newToken);
    setUserInfos(userdata);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfos");
    localStorage.removeItem("cartItems");
    setToken(null);
    setUserInfos(null);
    setcartInfo(null);
  };
  const updateCart = (cartDatas) => {
    localStorage.setItem("cartItems", JSON.stringify(cartDatas));
    setcartInfo(cartDatas);
  };
  const updateUserInfos = (userdata) => {
    localStorage.setItem("userInfos", JSON.stringify(userdata));
    setUserInfos(userdata);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isLoggedIn: !!token,
        userInfos,
        cartInfo,
        updateUserInfos,
        updateCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
