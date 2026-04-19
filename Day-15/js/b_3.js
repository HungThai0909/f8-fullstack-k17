// Bài 3
let a = 7;
let b = 3;

let sum = a + b;
let difference = a - b;
let product = a * b;
if (b !== 0) {
  let quotient = a / b;
  console.log("Thương của 2 số a và b là:", quotient);
} else {
  console.log("Phép chia không hợp lệ");
}

if (b !== 0) {
  let remainder = a % b;
  if (remainder !== 0) {
    console.log("Số dư khi chia 2 số a và b là:", remainder);
  } else {
    console.log("Số dư khi chia 2 số a và b là:", remainder);
  }
} else {
  console.log("Phép chia không hợp lệ");
}

console.log("Tổng của 2 số a và b là:", sum);
console.log("Hiệu của 2 số a và b là:", difference);
console.log("Tích của 2 số a và b là:", product);
