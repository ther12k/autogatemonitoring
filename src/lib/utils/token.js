// src/lib/utils/token.js (ensure it matches this or similar)
import { jwtDecode } from "jwt-decode";

export const setAuth = (token, userData) => {
    localStorage.setItem("token", token);
    if (userData) {
        localStorage.setItem("userid", userData.userid);
        localStorage.setItem("username", userData.username);
        localStorage.setItem("role", Array.isArray(userData.role) ? userData.role.join(",") : userData.role);
        localStorage.setItem("fullname", userData.fullname || userData.username);
    }
};

export const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("fullname");
};

export const isTokenExpired = (token) => {
    if (!token) {
        return true;
    }
    try {
        const decodedToken = jwtDecode(token);
        if (!decodedToken || !decodedToken.exp) {
            return true;
        }
        const expirationTime = decodedToken.exp * 1000; // exp is in seconds
        return Date.now() >= expirationTime;
    } catch (error) {
        console.error("Error decoding token:", error);
        clearAuth(); // Clear auth if token is malformed
        return true;
    }
};

export const isAuth = () => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) { // isTokenExpired will call clearAuth if needed
        return null;
    }
    try {
        const decoded = jwtDecode(token);
        return {
            token,
            userId: decoded.userid || localStorage.getItem("userid"),
            username: decoded.username || localStorage.getItem("username"),
            role: decoded.role || localStorage.getItem("role")?.split(','), // Return as array if stored as string
            fullname: localStorage.getItem("fullname") || decoded.fullname || decoded.username,
        };
    } catch (error) {
        console.error("Error decoding token on isAuth:", error);
        clearAuth();
        return null;
    }
};