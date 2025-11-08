//Bài 2

const products = [
  { name: "Laptop", price: 15000000 },
  { name: "Mouse", price: 250000 },
  { name: "Keyboard", price: 800000 },
];

//1. Tạo mảng mới chỉ chứa tên sản phẩm.
const productNames = products.map((product) => product.name);
console.log(productNames);

//2. Tính tổng giá trị tất cả sản phẩm.
const sumPrice = products.reduce((sum, product) => sum + product.price, 0);
console.log(sumPrice);

//3. Lọc ra sản phẩm có giá lớn hơn 1 triệu.
const biggerPrice = products.filter((product) => product.price > 1000000);
console.log(biggerPrice);
