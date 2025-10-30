//Bài 1


const arr = [1, 2, 3, 4, 5, 6];
//1. Tạo mảng mới chứa bình phương của từng phần tử
const squareArr = [];
for (let i = 0; i < arr.length; i++) {
  squareArr[squareArr.length] = arr[i] * arr[i];
}
console.log("Mảng mới bình phương:", squareArr);

//2. Tạo mảng mới chứa các phần tử chẵn trong mảng
const evenArr = [];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    evenArr[evenArr.length] = arr[i];
  }
}
console.log("Mảng mới số chẵn:", evenArr);

//3. Tạo mảng mới chứa các số bình phương nhưng chỉ lấy số lẻ
const oddSquareArr = [];
for (let i = 0; i < arr.length; i++) {
  const square = arr[i] * arr[i];
  if (square % 2 !== 0) {
    oddSquareArr[oddSquareArr.length] = square;
  }
}

console.log("Mảng bình phương của số lẻ:", oddSquareArr);
