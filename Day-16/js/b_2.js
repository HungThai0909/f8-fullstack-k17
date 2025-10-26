//Bài 2
let a = 5;
let b = 9;
let evenTotal = 0;
let oddTotal = 0;
for (i = a; i <= b; i++) {
  if (i % 2 === 0) {
    evenTotal = evenTotal + i;
  } else {
    oddTotal = oddTotal + i;
  }
}
console.log("Tổng số lẻ:", oddTotal);
console.log("Tổng số chẵn:", evenTotal);
