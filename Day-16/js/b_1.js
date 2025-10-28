//Bài 1
// let n = 10;
// let total = 0;
// for (let i = 1; i <= n; i++) {
//   total = total + i * (i + 1);
// }
// console.log("Giá trị biểu thức là:", total);

//Code sửa lại
function sumProduct(n) {
  if (!Number.isInteger(n) || n < 1)
    throw new Error("`n` phải là số nguyên dương");
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i * (i + 1);
  }
  return total;
}
console.log(sumProduct(10));
