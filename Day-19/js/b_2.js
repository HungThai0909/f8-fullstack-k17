//Bài 2

const myArr = [
  ["hello", "world"],
  ["javascript", "php"],
  ["css", "html"],
];

//1. Tạo mảng mới viết hoa tất cả từ
const upperCaseArr = myArr.map((subArr) => {
  return subArr.map((word) => {
    return word.toUpperCase();
  });
});
console.log("Mảng viết hoa tất cả từ:", upperCaseArr);

//2. Lọc ra các từ có độ dài > 4.
const filterArr = myArr.map((subArr) => {
  return subArr.filter((word) => {
    return word.length > 4;
  });
});
console.log("Mảng lọc từ có độ dài > 4:", filterArr);

//3. Ghép tất cả thành 1 mảng 1 chiều.
let resultArr = [];
for (let i = 0; i < myArr.length; i++) {
  resultArr = resultArr.concat(myArr[i]);
}
console.log("Mảng ghép tất cả thành 1 mảng 1 chiều:", resultArr);
