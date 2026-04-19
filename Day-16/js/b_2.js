//Bài 2
// let a = 5;
// let b = 9;
// let evenTotal = 0;
// let oddTotal = 0;
// for (let i = a; i <= b; i++) {
//   if (i % 2 === 0) {
//     evenTotal = evenTotal + i;
//   } else {
//     oddTotal = oddTotal + i;
//   }
// }
// console.log("Tổng số lẻ:", oddTotal);
// console.log("Tổng số chẵn:", evenTotal);

//Code sửa lại
function sumEvenOdd(a, b) {
  if (typeof a !== "number" || typeof b !== "number")
    throw new Error("`a` và `b` phải là số");
  const start = Math.min(a, b);
  const end = Math.max(a, b);
  let evenTotal = 0;
  let oddTotal = 0;
  for (let i = start; i <= end; i++) {
    if (i % 2 === 0) evenTotal += i;
    else oddTotal += i;
  }
  return { evenTotal, oddTotal };
}
console.log(sumEvenOdd(5, 9));
