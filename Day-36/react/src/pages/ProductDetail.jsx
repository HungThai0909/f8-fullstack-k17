import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Product Detail: {id}</h1>
      <button
        onClick={() => navigate(`/users/order`)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
      >
        Đặt hàng
      </button>
    </div>
  );
}
