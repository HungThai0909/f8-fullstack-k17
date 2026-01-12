import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  const fetchProductDetail = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) throw new Error("Failed to fetch product details");

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error || "Product not found"}
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/products"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={product.images[currentImageIndex]}
              alt={product.title}
              className="w-full aspect-square object-cover"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            {product.images.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="bg-blue-800 text-white hover:bg-blue-700 p-2 shadow transition cursor-pointer"
              >
                Prev
              </button>
            )}
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0 cursor-pointer ${
                    currentImageIndex === index
                      ? "border-blue-600"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            {product.images.length > 1 && (
              <button
                onClick={handleNextImage}
                className="bg-blue-800 text-white hover:bg-blue-700 p-2 shadow transition cursor-pointer"
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>
          <p className="text-4xl font-bold text-blue-600 mb-6">
            ${product.price}
          </p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex">
              <span>Rating:</span>
              <span className="ml-2 text-gray-700">{product.rating} / 5</span>
            </div>
            <div className="flex">
              <span className="font-semibold">Stock:</span>
              <span
                className={`ml-2 ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0 ? product.stock : "Out of stock"}
              </span>
            </div>
            {product.discountPercentage > 0 && (
              <div className="flex">
                <span className="font-semibold">Discount:</span>
                <span className="ml-2 text-red-600">
                  {product.discountPercentage}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
