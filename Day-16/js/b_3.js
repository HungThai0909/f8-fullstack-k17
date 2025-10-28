//Bài 3
// let tableHtml = `<table border="1" width="100%">`;
// tableHtml += `<tr>`;
// for (let i = 1; i <= 5; i++) {
//   tableHtml += `<th>${i}</th>`;
// }
// tableHtml += `</tr>`;
// tableHtml += `<tr>`;
// for (let col = 1; col <= 5; col++) {
//   tableHtml += `<td>`;
//   for (let row = 1; row <= 10; row++) {
//     let result = col * row;
//     tableHtml += `<div>${col} x ${row} = ${result}</div>`;
//   }
//   tableHtml += `</td>`;
// }
// tableHtml += `</tr>`;
// tableHtml += `<tr>`;
// for (let i = 6; i <= 10; i++) {
//   tableHtml += `<th>${i}</th>`;
// }
// tableHtml += `</tr>`;
// tableHtml += `<tr>`;
// for (let col = 6; col <= 10; col++) {
//   tableHtml += `<td>`;
//   for (let row = 1; row <= 10; row++) {
//     let result = col * row;
//     tableHtml += `<div>${col} x ${row} = ${result}</div>`;
//   }
//   tableHtml += `</td>`;
// }
// tableHtml += `</tr>`;
// tableHtml += `</table>`;
// document.body.innerHTML += tableHtml;

//Code sửa lại
function renderMultiplicationTable() {
  const table = document.createElement("table");
  table.setAttribute("border", "1");
  const headerRow = document.createElement("tr");
  for (let col = 1; col <= 10; col++) {
    const th = document.createElement("th");
    th.textContent = col;
    headerRow.appendChild(th);
  }
  table.appendChild(headerRow);

  for (let row = 1; row <= 10; row++) {
    const tr = document.createElement("tr");
    for (let col = 1; col <= 10; col++) {
      const td = document.createElement("td");
      td.textContent = `${col} x ${row} = ${col * row}`;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  document.body.appendChild(table);
}
renderMultiplicationTable();
