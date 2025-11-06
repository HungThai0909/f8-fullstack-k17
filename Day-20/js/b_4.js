//Bài 4

const arr = [[3, 9], [1, 5, 10], [8]];

const maxNumber = arr.flat().reduce((max, num) => (num > max ? num : max));
console.log("Phần tử lớn nhất trong mảng:", maxNumber);
