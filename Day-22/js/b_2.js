//Bài 2

const students = [
  { id: 1, name: "An", scores: { math: 8, english: 7, science: 9 } },
  { id: 2, name: "Bình", scores: { math: 6, english: 8, science: 7 } },
  { id: 3, name: "Châu", scores: { math: 9, english: 6, science: 8 } },
];

//1. Tính điểm trung bình của từng học viên.
const result = students.map((student) => {
  const scores = student.scores;
  const average =
    Object.keys(scores).reduce((sum, key) => sum + scores[key], 0) /
    Object.keys(scores).length;
  return { ...student, average: average };
});
console.log("Điểm trung bình của từng học viên:", result);

//2. Tìm học viên có điểm trung bình cao nhất.
const topAverageStudent = result.reduce((max, cur) =>
  cur.average > max.average ? cur : max
);
console.log("Học viên có điểm trung bình cao nhất:", topAverageStudent);

//3. Sắp xếp danh sách học viên theo điểm trung bình giảm dần.
const descAverageStudent = result.sort((a, b) => b.average - a.average);

console.log(
  "Danh sách học viên theo điểm trung bình giảm dần:",
  descAverageStudent
);
