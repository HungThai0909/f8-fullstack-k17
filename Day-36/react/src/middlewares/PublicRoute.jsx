import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function PublicRoute() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  if (isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
