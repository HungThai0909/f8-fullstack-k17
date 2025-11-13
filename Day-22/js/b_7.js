//Bài 7

const employees = [
  { id: 1, name: "An", projects: ["P1", "P2"] },
  { id: 2, name: "Bình", projects: ["P2", "P3"] },
  { id: 3, name: "Châu", projects: ["P1", "P3", "P4"] },
  { id: 4, name: "Dũng", projects: ["P4"] },
];

//1. Nhóm nhân viên theo dự án, sao cho mỗi dự án có danh sách nhân viên tham gia.
const groupByProject = (employees) => {
  return employees.reduce((acc, cur) => {
    cur.projects.forEach((project) => {
      if (!acc[project]) {
        acc[project] = [];
      }
      acc[project].push(cur.name);
    });
    return acc;
  }, {});
};
console.log("Nhóm nhân viên theo dự án:", groupByProject(employees));

//2. Tìm dự án có nhiều nhân viên tham gia nhất.
const findMostEmployeeProject = (employees) => {
  const projectCount = employees.reduce((acc, cur) => {
    cur.projects.forEach((project) => {
      acc[project] = (acc[project] || 0) + 1;
    });
    return acc;
  }, {});
  const projectsWithCount = Object.entries(projectCount).map(
    ([project, count]) => ({ project, count })
  );
  const maxCount = projectsWithCount.reduce(
    (max, p) => (p.count > max ? p.count : max),
    0
  );
  return projectsWithCount.filter((p) => p.count === maxCount);
};
console.log(
  "Dự án có nhiều nhân viên nhất:",
  findMostEmployeeProject(employees)
);
