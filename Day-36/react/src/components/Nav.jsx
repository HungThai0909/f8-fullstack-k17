import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";

export default function Nav() {
  const { user, isAuthenticated, isInitializing, logout, checkAuth } =
    useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    checkAuth();
  }, []);
  const activeClass = ({ isActive }) => {
    return `px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? "bg-blue-500 text-white"
        : "bg-gray-100 hover:bg-blue-500 hover:text-white"
    }`;
  };
  const handleLogout = () => {
    logout();
    if (location.pathname.startsWith("/users")) {
      navigate(`/login?continue=${location.pathname}`, { replace: true });
    }
  };
  return (
    <div className="flex items-center gap-4 p-4 bg-white border-b">
      <NavLink className={activeClass} to="/">
        Home
      </NavLink>
      <NavLink className={activeClass} to="/about">
        About
      </NavLink>
      <NavLink className={activeClass} to="/products">
        Products
      </NavLink>
      <NavLink className={activeClass} to="/contact">
        Contact
      </NavLink>
      {isInitializing ? (
        <span>Loading...</span>
      ) : isAuthenticated ? (
        <>
          <span className="text-gray-700">Hi, {user?.name || "User"}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-blue-500 hover:text-white transition-colors cursor-pointer"
          >
            Logout
          </button>
        </>
      ) : (
        <NavLink className={activeClass} to="/login">
          Login
        </NavLink>
      )}
    </div>
  );
}