import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useEffect, useState } from "react";

export default function UserLayout() {
  const { user, logout, checkAuth } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsChecking(false);
    };
    initAuth();
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
    navigate(`/login?continue=${location.pathname}`, { replace: true });
  };
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center gap-4 p-4 bg-white border-b">
        <NavLink className={activeClass} to="/users" end>
          Dashboard
        </NavLink>
        <NavLink className={activeClass} to="/users/password">
          Password
        </NavLink>
        <NavLink className={activeClass} to="/users/account">
          Account
        </NavLink>
        <NavLink className={activeClass} to="/users/order">
          My order
        </NavLink>
        {isChecking ? (
          <span>Loading...</span>
        ) : (
          <>
            <span className="text-gray-700">Hi, {user?.name || "User"}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg transition-colors bg-gray-100 hover:bg-blue-500 hover:text-white cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </div>
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}
