import ProductImage from "./ProductImage";
type Product = {
  id: number;
  thumbnail: string;
  title: string;
  images: string[];
  price: number;
};
const getProduct = async (id: number): Promise<Product> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/products/${id}`,
  );
  if (!response.ok) {
    throw new Error("Có lỗi khi lấy sản phẩm");
  }
  return response.json();
};
export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(+id);

  return (
    <div>
      <h1 className="text-3xl">{product.title}</h1>
      <p className="text-lg">Price: {product.price}</p>
      <ProductImage product={product} />
    </div>
  );
}
