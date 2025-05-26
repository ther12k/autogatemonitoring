// File: src/routers/index.jsx
// ============================================================ //
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// View Imports
import Login from "../views/auth/login";
import Layout from "../layout/layout"; // Main application layout
import Dashboard from "../views/admin/dashboard";
import Transaction from '../views/admin/transaction';
import User from "../views/admin/user";
import Camera from "../views/admin/camera";
import Gate from "../views/admin/gate";

// Utility Imports
import { isTokenExpired as checkTokenExpired, clearAuth as clearLocalStorageAuth } from '../lib/utils/token'; // Use utilities

// Scroll to Top on page change
const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return children;
};

// Protected Route HOC
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Check if token is present and not expired using the utility function
  if (!token || checkTokenExpired(token)) {
    clearLocalStorageAuth(); // Clear all auth-related localStorage items
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRouter = () => {
  const token = localStorage.getItem("token");
  const isInitiallyAuthenticated = token && !checkTokenExpired(token);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          {/* Authentication Route */}
          <Route path="/login" element={<Login />} />

          {/* Root path redirect based on authentication state */}
          <Route
            path="/"
            element={
              isInitiallyAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Protected Routes within Layout */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/transaction" element={<ProtectedRoute><Transaction /></ProtectedRoute>} />
            <Route path="/gate" element={<ProtectedRoute><Gate /></ProtectedRoute>} />
            <Route path="/camera" element={<ProtectedRoute><Camera /></ProtectedRoute>} />
            <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
          </Route>

          {/* Fallback for any undefined routes */}
          <Route
            path="*"
            element={
              isInitiallyAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default AppRouter; // Renamed Router to AppRouter to avoid conflict with BrowserRouter if used in same file