//Bài 1

const users = [
  { name: "An", age: 25 },
  { name: "Bình", age: 30 },
  { name: "Chi", age: 22 },
];

//1. In ra tên của tất cả người dùng.
for (const user of users) {
  console.log(user.name);
}

//2. Tìm người có tuổi lớn nhất.
const maxAge = users.reduce((max, user) => (user.age > max.age ? user : max));
console.log(maxAge);

//3. Tính tuổi trung bình của tất cả người dùng.
const averageAge =
  users.reduce((sum, user) => sum + user.age, 0) / users.length;
console.log(averageAge);
