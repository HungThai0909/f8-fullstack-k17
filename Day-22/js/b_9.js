//Bài 9
const transactions = [
  { id: 1, account: "A", type: "deposit", amount: 1000 },
  { id: 2, account: "B", type: "withdraw", amount: 200 },
  { id: 3, account: "A", type: "withdraw", amount: 500 },
  { id: 4, account: "C", type: "deposit", amount: 700 },
  { id: 5, account: "B", type: "deposit", amount: 300 },
];

//1. Tính số dư cuối cùng của từng tài khoản.
const balances = transactions.reduce((acc, { account, type, amount }) => {
  acc[account] = (acc[account] || 0) + (type === "deposit" ? amount : -amount);
  return acc;
}, {});
console.log("Số dư cuối cùng của từng tài khoản:", balances);

//2. Tìm tài khoản có số dư cao nhất.
const maxBalances = Object.entries(balances).reduce(
  (max, [account, balance]) =>
    balance > max.balance ? { account, balance } : max,
  { account: null, balance: -Infinity }
);

console.log("Tài khoản có số dư cao nhất:", maxBalances);

//3. Nhóm các giao dịch theo tài khoản, trong đó mỗi tài khoản có danh sách giao dịch của riêng nó.
const grouped = {};
transactions.forEach((item) => {
  grouped[item.account] = grouped[item.account] || [];
  grouped[item.account].push(item);
});
console.log("Object giao dịch theo tài khoản:", grouped);
