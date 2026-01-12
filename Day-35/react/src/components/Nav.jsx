import { NavLink } from "react-router-dom";

export default function Nav() {
  const activeClass = ({ isActive }) => {
    return `px-4 py-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`;
  };
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-1">
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
          </div>
        </div>
      </div>
    </nav>
  );
}