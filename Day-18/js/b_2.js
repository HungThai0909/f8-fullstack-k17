//Bài 2

const names = [" hoang ", "AN", " f8 ", "Education"];

// Tạo mảng mới chứa các phần tử đã được xoá khoảng trắng thừa và viết thường toàn bộ
const lowerCaseNames = [];
for (let i = 0; i < names.length; i++) {
  lowerCaseNames[lowerCaseNames.length] = names[i].trim().toLowerCase();
}

console.log(
  "Mảng mới chứa các phần tử đã được xoá khoảng trắng thừa và viết thường toàn bộ:",
  lowerCaseNames
);

// Tạo mảng mới viết chữ cái đầu hoa (Hoang, An, F8, Education)
const capitalizedNames = [];
for (let i = 0; i < names.length; i++) {
  const trimmedName = names[i].trim().toLowerCase();
  capitalizedNames[capitalizedNames.length] =
    trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1);
}
console.log("Mảng mới viết chữ cái đầu hoa:", capitalizedNames);
