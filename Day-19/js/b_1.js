//Bài 1

const myArr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

//1. Tạo mảng chứa tổng từng hàng => [6, 15, 24].
const rowSums = myArr.map((row) => {
  let sum = 0;
  for (let i = 0; i < row.length; i++) {
    sum += row[i];
  }
  return sum;
});
console.log("Mảng chứa tổng từng hàng:", rowSums);

//2. Tạo mảng chứa tổng từng cột => [12, 15, 18].
const colSums = [];
for (let col = 0; col < myArr[0].length; col++) {
  let sum = 0;
  for (let row = 0; row < myArr.length; row++) {
    sum += myArr[row][col];
  }
  colSums.push(sum);
}
console.log("Mảng chứa tổng từng cột:", colSums);

//3. Lọc ra các hàng có tổng > 10.
const filterRows = myArr.filter((row) => {
  let sum = 0;
  for (let i = 0; i < row.length; i++) {
    sum += row[i];
  }
  return sum > 10;
});
console.log("Mảng chứa các hàng có tổng > 10:", filterRows);
