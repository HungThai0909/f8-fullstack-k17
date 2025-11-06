//Bài 3

const arr = [
  [1, 2, 3],
  [4, 5, 6],
];

const countEven = arr.flat(Infinity).filter((num) => num % 2 === 0).length;

console.log("Số phần tử chẵn trong mảng:", countEven);
