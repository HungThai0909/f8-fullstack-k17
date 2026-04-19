//Bài 1

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1200 },
  { id: 2, name: "Phone", category: "Electronics", price: 800 },
  { id: 3, name: "Shirt", category: "Clothing", price: 40 },
  { id: 4, name: "Shoes", category: "Clothing", price: 60 },
  { id: 5, name: "Headphones", category: "Electronics", price: 150 },
];

//1. Lọc ra các sản phẩm thuộc danh mục "Electronics".
const electronics = products.filter(
  (product) => product.category === "Electronics"
);
console.log("Các sản phẩm có danh mục 'Electronics':", electronics);

//2. Tính tổng giá của tất cả sản phẩm trong danh mục "Electronics".
const sumPrice = electronics.reduce((sum, product) => sum + product.price, 0);
console.log(
  "Tổng giá của tất cả sản phẩm trong danh mục 'Electronics':",
  sumPrice
);

//3. Chuyển đổi mảng sản phẩm thành một object, trong đó key là category, value là mảng các sản phẩm thuộc danh mục đó.
const groupByCategory = products.reduce((acc, product) => {
  const category = product.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(product);
  return acc;
}, {});
console.log("Mảng sản phầm thành object:", groupByCategory);
