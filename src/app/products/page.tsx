import Image from "next/image";
import SearchInput from "./Searchinput";
import Link from "next/link";
import { headers } from "next/headers";
// import { notFound } from "next/navigation";
type Product = {
  id: number;
  thumbnail: string;
  title: string;
};
const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/products`,
  );
  if (!response.ok) {
    throw new Error("Có lỗi khi lấy sản phẩm");
  }
  const { products } = await response.json();
  return products;
};
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  console.log("product list");
  const { q } = await searchParams;
  const products = await getProducts();
  // const allHeaders = await headers();
  // console.log(allHeaders);

  return (
    <div>
      <h1 className="text-3xl">Products: {q}</h1>
      <SearchInput />
      <div className="flex flex-wrap">
        {products.map((product) => (
          <div key={product.id} className="w-1/4">
            <Image
              alt={product.title}
              src={product.thumbnail}
              width={300}
              height={300}
            />
            <h2 className="text-xl">
              <Link href={`/products/${product.id}`}>{product.title}</Link>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}