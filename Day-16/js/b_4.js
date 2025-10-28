//Bài 4
// function isPrime(n) {
//   if (n % 1 !== 0 || n <= 1) {
//     return false;
//   } else {
//     for (let i = 2; i < n; i++) {
//       if (n % i === 0) {
//         return false;
//       }
//     }
//   }
//   return true;
// }
// console.log(isPrime(5));
// function getTotalPrime(n) {
//   let total = 0;
//   for (let i = 2; i <= n; i++) {
//     if (isPrime(i)) {
//       total = total + i;
//     }
//   }
//   return total;
// }
// console.log(getTotalPrime(5));

//Code sửa lại
function isPrime(n) {
  if (!Number.isInteger(n) || n <= 1) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function getTotalPrime(n) {
  if (!Number.isInteger(n) || n < 2) return 0;
  let total = 0;
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) total += i;
  }
  return total;
}
console.log(getTotalPrime(5));
