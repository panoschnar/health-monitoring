"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { useRouter } from "next/navigation";

interface UserContextType {
  isLoggedIn: boolean;
  access_token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [access_token, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          // Token expired
          logout();
        } else {
          // Token valid
          setAccessToken(token);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Invalid token", err);
        logout();
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("access_token", token);
    setAccessToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setAccessToken(null);
    setIsLoggedIn(false);
    router.push("/"); 
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout, access_token }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
