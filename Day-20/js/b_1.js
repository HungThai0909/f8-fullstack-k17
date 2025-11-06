//Bài 1

const arr = [[1, 2, 3], [4, 5], [6]];

const sum = arr.flat().reduce((a, b) => a + b, 0);
console.log("Tổng các phần tử trong mảng:", sum);
