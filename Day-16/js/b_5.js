//Bài 5
// function readNumber(digit, isFirstWord) {
//   switch (digit) {
//     case 1:
//       return isFirstWord ? "Một" : "một";
//     case 2:
//       return isFirstWord ? "Hai" : "hai";
//     case 3:
//       return isFirstWord ? "Ba" : "ba";
//     case 4:
//       return isFirstWord ? "Bốn" : "bốn";
//     case 5:
//       return isFirstWord ? "Năm" : "năm";
//     case 6:
//       return isFirstWord ? "Sáu" : "sáu";
//     case 7:
//       return isFirstWord ? "Bảy" : "bảy";
//     case 8:
//       return isFirstWord ? "Tám" : "tám";
//     case 9:
//       return isFirstWord ? "Chín" : "chín";
//   }
// }
// function convertNumbertoString(num) {
//   if (num < 0 || num > 9999) return "Số nhập vào không hợp lệ";
//   if (num === 0) return "Không";
//   let thousands = Math.floor(num / 1000);
//   let hundreds = Math.floor((num % 1000) / 100);
//   let tens = Math.floor((num % 100) / 10);
//   let ones = Math.floor(num % 10);
//   let result = "";
//   if (thousands > 0) {
//     result = result + readNumber(thousands, true) + " nghìn";
//   }
//   if (hundreds > 0) {
//     result =
//       result + (result ? " " : "") + readNumber(hundreds, !result) + " trăm";
//   } else if (thousands > 0 && (tens > 0 || ones > 0)) {
//     result = result + " không trăm";
//   }
//   if (tens > 0) {
//     if (tens === 1) {
//       result = result + (result ? " mười" : "Mười");
//     } else {
//       result =
//         result + (result ? " " : "") + readNumber(tens, !result) + " mươi";
//     }
//   } else if ((thousands > 0 || hundreds > 0) && ones > 0) {
//     result = result + " lẻ";
//   }
//   if (ones > 0) {
//     if (ones === 1 && tens > 1) {
//       result = result + " mốt";
//     } else if (ones === 5 && tens > 0) {
//       result = result + " lăm";
//     } else {
//       result = result + (result ? " " : "") + readNumber(ones, !result);
//     }
//   }
//   return result;
// }
// console.log(convertNumbertoString(512));

//Code sửa lại
function readDigit(digit) {
  const map = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  return map[digit] || "";
}

function numberToWords(n) {
  if (!Number.isInteger(n) || n < 0 || n > 9999)
    throw new Error("`n` trong khoảng 0..9999");
  if (n === 0) return "không";
  const thousands = Math.floor(n / 1000);
  const hundreds = Math.floor((n % 1000) / 100);
  const tens = Math.floor((n % 100) / 10);
  const units = n % 10;
  let parts = [];
  if (thousands) parts.push(`${readDigit(thousands)} nghìn`);
  if (hundreds) parts.push(`${readDigit(hundreds)} trăm`);
  if (tens === 0 && units) parts.push("lẻ");
  if (tens > 1)
    parts.push(
      `${readDigit(tens)} mươi` + (units ? ` ${readDigit(units)}` : "")
    );
  else if (tens === 1)
    parts.push("mười" + (units ? ` ${readDigit(units)}` : ""));
  else if (tens === 0 && units) parts.push(readDigit(units));
  return parts.join(" ").replace(/\s+/g, " ").trim();
}
console.log(numberToWords(4298));
