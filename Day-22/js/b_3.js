//Bài 3

const orders = [
  {
    orderId: 101,
    customer: "John",
    items: [{ name: "Laptop", price: 1000, quantity: 1 }],
  },
  {
    orderId: 102,
    customer: "Alice",
    items: [
      { name: "Phone", price: 500, quantity: 2 },
      { name: "Charger", price: 50, quantity: 3 },
    ],
  },
  {
    orderId: 103,
    customer: "Bob",
    items: [{ name: "Headphones", price: 200, quantity: 2 }],
  },
];

//1. Tính tổng tiền của từng đơn hàng.
const sumOrders = orders.map((order) => {
  const sum = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { ...order, sum };
});
console.log("Tổng tiền của từng đơn hàng:", sumOrders);

//2. Tìm khách hàng có đơn hàng có tổng tiền cao nhất.
const maxOrder = sumOrders.reduce((max, cur) =>
  cur.sum > max.sum ? cur : max
);
console.log(
  `Khách hàng có đơn hàng cao nhất: ${maxOrder.customer}, tổng tiền: $${maxOrder.sum}`
);

//3. Gộp danh sách tất cả các sản phẩm từ các đơn hàng, nhóm theo tên sản phẩm và tính tổng số lượng của mỗi sản phẩm.
const result = Object.values(
  orders.reduce((acc, orders) => {
    orders.items.forEach((item) => {
      acc[item.name] = acc[item.name] || { ...item, quantity: 0 };
      acc[item.name].quantity += item.quantity;
    });
    return acc;
  }, {})
);
console.log(
  "Object nhóm theo tên sản phẩm và tổng số lượng mỗi sản phẩm:",
  result
);
