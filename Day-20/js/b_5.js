//Bài 5

const arr = [
  [1, 2, 3],
  [2, 3, 4],
  [4, 5],
];

const flatArr = arr.flat();
const uniqueArr = flatArr.filter(
  (num, index) => flatArr.indexOf(num) === index
);

console.log("Các phần tử duy nhất trong mảng:", uniqueArr);
