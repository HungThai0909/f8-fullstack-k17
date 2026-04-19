//Bài 10
const inventory = [
  { item: "Laptop", type: "import", quantity: 10 },
  { item: "Mouse", type: "import", quantity: 50 },
  { item: "Laptop", type: "export", quantity: 4 },
  { item: "Keyboard", type: "import", quantity: 20 },
  { item: "Mouse", type: "export", quantity: 10 },
];

//1. Tính số lượng tồn kho của từng sản phẩm.
const calculateStock = (inventory) => {
  return inventory.reduce((stock, { item, type, quantity }) => {
    if (!stock[item]) {
      stock[item] = 0;
    }
    stock[item] += type === "import" ? quantity : -quantity;
    return stock;
  }, {});
};
const stock = calculateStock(inventory);
console.log("Số lượng tồn kho của từng sản phẩm:", stock);

//2. Tìm sản phẩm có số lượng tồn kho cao nhất.
const maxStock = Object.entries(stock).reduce(
  (max, [item, quantity]) =>
    quantity > max.quantity ? { item, quantity } : max,
  { item: null, quantity: -Infinity }
);
console.log("Sản phẩm có số lượng tồn kho cao nhất:", maxStock);

//3. Nhóm danh sách nhập xuất theo sản phẩm, trong đó mỗi sản phẩm có lịch sử nhập xuất riêng.
const grouped = {};
inventory.forEach((transaction) => {
  grouped[transaction.item] = grouped[transaction.item] || [];
  grouped[transaction.item].push(transaction);
});
console.log("Object danh sách nhập xuất theo sản phẩm:", grouped);
