//Bài 3
function calcBMI(weight, height) {
  if (
    typeof weight !== "number" ||
    typeof height !== "number" ||
    weight <= 0 ||
    height <= 0
  ) {
    return "Dữ liệu không hợp lệ";
  }
  const BMI = weight / (height * height);
  if (BMI < 18.5) {
    return "Thiếu cân";
  } else if (BMI < 23) {
    return "Bình thường";
  } else if (BMI < 25) {
    return "Thừa cân";
  } else {
    return "Béo phì";
  }
}

console.log(calcBMI(65, 1.7));
