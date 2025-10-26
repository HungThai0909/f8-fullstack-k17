//Bài 3
let tableHtml = `<table border="1" width="100%">`;

tableHtml += `<tr>`;
for (let i = 1; i <= 5; i++) {
  tableHtml += `<th>${i}</th>`;
}
tableHtml += `</tr>`;

tableHtml += `<tr>`;
for (let col = 1; col <= 5; col++) {
  tableHtml += `<td>`;
  for (let row = 1; row <= 10; row++) {
    let result = col * row;
    tableHtml += `<div>${col} x ${row} = ${result}</div>`;
  }
  tableHtml += `</td>`;
}
tableHtml += `</tr>`;

tableHtml += `<tr>`;
for (let i = 6; i <= 10; i++) {
  tableHtml += `<th>${i}</th>`;
}
tableHtml += `</tr>`;

tableHtml += `<tr>`;
for (let col = 6; col <= 10; col++) {
  tableHtml += `<td>`;
  for (let row = 1; row <= 10; row++) {
    let result = col * row;
    tableHtml += `<div>${col} x ${row} = ${result}</div>`;
  }
  tableHtml += `</td>`;
}
tableHtml += `</tr>`;

tableHtml += `</table>`;
document.body.innerHTML += tableHtml;
