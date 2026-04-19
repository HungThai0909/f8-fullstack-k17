//Bài 4

const employees = [
  { id: 1, name: "Mai", department: "IT", salary: 1200 },
  { id: 2, name: "Nam", department: "HR", salary: 800 },
  { id: 3, name: "Hà", department: "IT", salary: 1500 },
  { id: 4, name: "Linh", department: "Marketing", salary: 900 },
  { id: 5, name: "Phúc", department: "IT", salary: 1100 },
];

//1. Tính tổng lương của từng phòng ban.
const salaryByDepartment = employees.reduce((acc, cur) => {
  acc[cur.department] = (acc[cur.department] || 0) + cur.salary;
  return acc;
}, {});
console.log("Tổng lương của từng phòng ban:", salaryByDepartment);

//2. Tìm nhân viên có mức lương cao nhất trong mỗi phòng ban.
const maxSalaryByDeparment = Object.values(
  employees.reduce((acc, cur) => {
    if (!acc[cur.department] || cur.salary > acc[cur.department].salary) {
      acc[cur.department] = cur;
    }
    return acc;
  }, {})
);
console.log(
  "Nhân viên có mức lương cao nhất trong mỗi phòng ban:",
  maxSalaryByDeparment
);

//3. Chuyển đổi dữ liệu về dạng object, trong đó key là tên phòng ban, value là mảng nhân viên trong phòng ban đó.
const groupByDeparment = employees.reduce((acc, cur) => {
  acc[cur.department] = acc[cur.department] || [];
  acc[cur.department].push(cur);
  return acc;
}, {});
console.log(
  "Object có key là tên phòng ban, value là mảng nhân viên trong phòng ban:",
  groupByDeparment
);
