//Bài 1
function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(5));
function sumFibonacci(n) {
  if (n <= 0) return 0;
  return fibonacci(n - 1) + sumFibonacci(n - 1);
}

console.log(sumFibonacci(5));
