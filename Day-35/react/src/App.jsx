import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products">
          <Route path="" element={<Products />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </div>
  );
}
