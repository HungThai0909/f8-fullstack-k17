import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import UserLayout from "./layouts/UserLayout";
import Dashboard from "./pages/Dashboard";
import Password from "./pages/Password";
import Account from "./pages/Account";
import MyOrder from "./pages/MyOrder";
import Contact from "./pages/Contact";
export default function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products">
            <Route path="" element={<Products />} />
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AuthMiddleware />}>
          <Route path="/users" element={<UserLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="password" element={<Password />} />
            <Route path="account" element={<Account />} />
            <Route path="order" element={<MyOrder />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
