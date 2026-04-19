import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

export default function MainLayout() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Nav />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}
