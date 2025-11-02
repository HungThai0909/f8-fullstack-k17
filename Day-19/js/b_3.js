//Bài 3

const myArr = [
  [2, 4, 6],
  [8, 10, 12],
  [14, 16, 18],
];

//1. Lấy ra các phần tử trên đường chéo chính => [2, 10, 18].
const mainDiagonal = myArr.map((row, index) => {
  return row[index];
});
console.log("Mảng các phần tử trên đường chéo chính:", mainDiagonal);

//2. Lấy ra các phần tử trên đường chéo phụ => [6, 10, 14].

const secondaryDiagonal = myArr.map((row, index) => {
  return row[row.length - 1 - index];
});
console.log("Mảng các phần tử trên đường chéo phụ:", secondaryDiagonal);

//3. Tính tổng của đường chéo chính và phụ.
let total = 0;
for (let i = 0; i < myArr.length; i++) {
  total = total + myArr[i][i];
  if (i !== myArr.length - 1 - i) {
    total = total + myArr[i][myArr.length - 1 - i];
  }
}
console.log("Tổng của đường chéo chính và phụ:", total);
