//Bài 4
const fullname = "tạ hoàng an";
let result = "";
let isCapitalizeNext = true;

for (let i = 0; i < fullname.length; i++) {
  let char = fullname[i];
  if (char === " ") {
    result = result + char;
    isCapitalizeNext = true;
  } else {
    if (isCapitalizeNext) {
      result = result + char.toUpperCase();
      isCapitalizeNext = false;
    } else {
      result = result + char.toLowerCase();
    }
  }
}

const standardizedFullname = result;
console.log(standardizedFullname);
