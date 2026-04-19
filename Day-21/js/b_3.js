//Bài 3

const students = [
  { name: "Lan", scores: [8, 9, 7] },
  { name: "Huy", scores: [6, 5, 7] },
  { name: "Minh", scores: [9, 8, 10] },
];

//1. Tính điểm trung bình của từng học sinh.
const averageScores = students.map((student) => {
  const avg =
    student.scores.reduce((sum, score) => sum + score, 0) /
    student.scores.length;
  return { name: student.name, averageScores: avg };
});

console.log(averageScores);

//2. Trả về danh sách học sinh đạt loại giỏi (điểm TB >= 8).
const excellentStudents = averageScores.filter(
  (student) => student.averageScores >= 8
);
console.log(excellentStudents);

//3. Sắp xếp học sinh theo điểm trung bình giảm dần.
const decreasingStudents = averageScores.sort(
  (a, b) => b.averageScores - a.averageScores
);
console.log(decreasingStudents);
