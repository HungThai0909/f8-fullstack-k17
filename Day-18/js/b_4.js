//Bài 4

const words = ["javascript", "php", "css", "html", "python", "java"];

//1. Lọc ra các từ có độ dài > = 5.
const lengthWords = [];
for (let i = 0; i < words.length; i++) {
  if (words[i].length >= 5) {
    lengthWords[lengthWords.length] = words[i];
  }
}

console.log("Mảng mới có các từ có độ dài lớn hơn hoặc bằng 5:", lengthWords);

//2. Tạo mảng mới viết hoa toàn bộ.
const upperCaseWords = [];
for (let i = 0; i < words.length; i++) {
  upperCaseWords[upperCaseWords.length] = words[i].toUpperCase();
}

console.log("Mảng mới viết hoa toàn bộ:", upperCaseWords);

//3. Tạo mảng mới viết ngược từng chuỗi (tpircsavaj, avaj...)
const reversedWords = [];
for (let i = 0; i < words.length; i++) {
  let reversedWord = "";
  for (let j = words[i].length - 1; j >= 0; j--) {
    reversedWord = reversedWord + words[i][j];
  }
  reversedWords[reversedWords.length] = reversedWord;
}

console.log("Mảng mới viết ngược từng chuỗi:", reversedWords);
