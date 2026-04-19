//Bài 4

const scores = [
  [8, 9, 7],
  [6, 5, 7],
  [10, 9, 8],
];

//1. Tính điểm trung bình của từng học sinh => [8, 6, 9].
//Cách 1:
// const averageScores = scores.map((row) => {
//     let sum = 0;
//     for (let i = 0; i < row.length; i++) {
//         sum = sum + row[i];
//     }
//     return sum / row.length;
// });
// console.log("Điểm trung bình của từng học sinh:", averageScores);

//Cách 2:
const averageScores = scores.map(
  (row) => row.reduce((sum, val) => sum + val, 0) / row.length
);
console.log("Điểm trung bình của từng học sinh:", averageScores);

//2. Lọc ra những học sinh có điểm trung bình >= 8.
const highAchievers = averageScores.filter((score) => {
  return score >= 8;
});
console.log("Học sinh có điểm trung bình >= 8:", highAchievers);

//3. Tạo mảng mới tăng tất cả điểm thêm 1 (nếu chưa vượt quá 10).
const increasedScores = scores.map((row) => {
  return row.map((score) => {
    return score < 10 ? score + 1 : score;
  });
});
console.log(
  "Mảng điểm sau khi tăng thêm 1 (nếu chưa vượt quá 10):",
  increasedScores
);
