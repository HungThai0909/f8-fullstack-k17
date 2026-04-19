//Bài 3

const nums = [3, 7, 2, 9, 12, 15, 18];

//1. Lấy ra mảng mới chỉ chứa số lớn hơn hoặc băng 10
const greaterThanTen = [];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] >= 10) {
    greaterThanTen[greaterThanTen.length] = nums[i];
  }
}
console.log("Mảng mới chứa số lớn hơn hoặc băng 10:", greaterThanTen);

//2. Từ mảng mới trên, tạo mảng chỉ chứa số chia hết cho 3.
const divisibleByThree = [];
for (let i = 0; i < greaterThanTen.length; i++) {
  if (greaterThanTen[i] % 3 === 0) {
    divisibleByThree[divisibleByThree.length] = greaterThanTen[i];
  }
}
console.log("Mảng chỉ chứa số chia hết cho 3:", divisibleByThree);


//3. Với mảng ban đầu, tạo mảng mới tăng gấp đôi nhưng chỉ giữ lại số lẻ.
const doubledOdds = [];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 !== 0) {
    doubledOdds[doubledOdds.length] = nums[i] * 2;
  }
}
console.log("Mảng mới tăng gấp đôi nhưng chỉ giữ lại số lẻ:", doubledOdds);