// Bài 10
let n = 10;
let soChan = "";
let soLe = "";

for (let i = 0; i <= n; i++) {
  if (i % 2 === 0) {
    soChan += i + ", ";
  } else {
    soLe += i + ", ";
  }
}

console.log("Số chẵn:", soChan);
console.log("Số lẻ:", soLe);
