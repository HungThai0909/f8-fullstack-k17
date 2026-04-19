//Bài 6
function reverseFirstLastWord(str) {
  str = str.trim();
  let firstWord = str.indexOf(" ");
  if (firstWord === -1) {
    return str;
  }
  let lastWord = str.lastIndexOf(" ");
  const first = str.slice(0, firstWord);
  const middle = str.slice(firstWord, lastWord + 1);
  const last = str.slice(lastWord + 1);
  return last + middle + first;
}
console.log(reverseFirstLastWord("Thái Phi Hùng"));
