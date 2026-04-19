//Bài 2
function triangleTest(a, b, c) {
  if (a <= 0 || b <= 0 || c <= 0) {
    return true;
  }
  if (a + b > c && a + c > b && b + c > a) {
    return true;
  }
  return false;
}
console.log(triangleTest(1, 2, 3));
