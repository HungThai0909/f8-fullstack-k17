import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [totalProducts, setTotalProducts] = useState(0);
  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = 20;
  const totalPages = Math.ceil(totalProducts / limit);
  const isSearchingRef = useRef(!!searchParams.get("q"));
  const isPageChangingRef = useRef(false);
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearchTerm(q);
    isSearchingRef.current = !!q;
  }, [searchParams]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const delay = setTimeout(fetchProducts, 500);
      return () => clearTimeout(delay);
    }
    fetchProducts();
  }, [currentPage, searchTerm]);

  const fetchProducts = async () => {
    const isSearchingNow = searchTerm.trim();
    setProductsLoading(
      products.length === 0 || isPageChangingRef.current || isSearchingNow
    );
    if (isSearchingNow) {
      setProducts([]);
    }
    setError(null);
    try {
      const skip = (currentPage - 1) * limit;
      const url = searchTerm.trim()
        ? `https://dummyjson.com/products/search?q=${encodeURIComponent(
            searchTerm
          )}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data.products);
      setTotalProducts(data.total);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load products");
    } finally {
      isPageChangingRef.current = false;
      setProductsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams);
    if (value.trim()) {
      params.set("q", value);
      params.set("page", "1");
      if (!isSearchingRef.current) {
        isSearchingRef.current = true;
        setSearchParams(params);
      } else {
        setSearchParams(params, { replace: true });
      }
    } else {
      isSearchingRef.current = false;
      params.delete("q");
      params.set("page", "1");
      setSearchParams(params);
    }
  };

  const handlePageChange = (page) => {
    isPageChangingRef.current = true;
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Products</h1>
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-8">
          Error: {error}
        </div>
      ) : productsLoading ? (
        <div className="flex justify-center items-center h-64 mb-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      ) : searchTerm.trim() && products.length === 0 ? (
        <div className="text-center py-12 mb-8">
          <p className="text-xl text-gray-600">Không tìm thấy sản phẩm</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 mb-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
            >
              <div className="aspect-square bg-gray-100">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-2xl font-bold text-blue-600 mb-3">
                  ${product.price}
                </p>
                <div className="flex items-center mb-3">
                  <span>Rating:</span>
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating}
                  </span>
                </div>
                <Link
                  to={`/products/${product.id}`}
                  className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="flex justify-center items-center flex-wrap gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 cursor-pointer"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 border rounded-lg cursor-pointer ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
