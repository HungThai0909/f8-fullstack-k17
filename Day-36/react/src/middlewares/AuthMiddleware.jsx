import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function AuthMiddleware() {
  const { isAuthenticated, isInitializing, checkAuth } = useAuthStore();
  const location = useLocation();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={`/login?continue=${location.pathname}`} replace />
  );
}
