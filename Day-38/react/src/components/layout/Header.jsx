import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

export default function Header({ onLoginClick }) {
  const { user, logout, isAuthenticated, isInitializing } = useAuth();
  const [activeMenu, setActiveMenu] = useState("Home");

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-14 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/LOGO 1.png" alt="Order.uk Logo" className="h-10" />
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {[
              "Home",
              "Browse Menu",
              "Special Offers",
              "Restaurants",
              "Track Order",
            ].map((item) => (
              <Button
                key={item}
                variant={activeMenu === item ? "default" : "ghost"}
                className={
                  activeMenu === item
                    ? "bg-[#ff8000] hover:bg-[#e67300] text-white rounded-full cursor-pointer"
                    : "hover:bg-gray-900 hover:text-white rounded-full cursor-pointer"
                }
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMenu(item);
                }}
              >
                {item}
              </Button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {isInitializing ? (
              <span className="text-gray-500 text-sm">Loading...</span>
            ) : isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Hello, {user?.name}</span>
                <Button
                  onClick={logout}
                  className="bg-black hover:bg-gray-800 text-white rounded-full px-6 cursor-pointer"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={onLoginClick}
                className="bg-black hover:bg-gray-800 text-white rounded-full px-6 cursor-pointer"
              >
                Login / Signup
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
