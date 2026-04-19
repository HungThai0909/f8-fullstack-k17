// Bài 9
const PRICE_1 = 1.678;
const PRICE_2 = 1.734;
const PRICE_3 = 2.014;
const PRICE_4 = 2.536;
const PRICE_5 = 2.834;
const PRICE_6 = 2.927;
const KWH_1 = 50;
const KWH_2 = 100;
const KWH_3 = 200;
const KWH_4 = 300;
const KWH_5 = 400;

let total = 0;
let kwh = 250;
if (kwh <= KWH_1) {
  total = PRICE_1 * kwh;
} else if (kwh <= KWH_2) {
  total = PRICE_1 * KWH_1 + PRICE_2 * (kwh - KWH_1);
} else if (kwh <= KWH_3) {
  total = PRICE_1 * KWH_1 + PRICE_2 * (KWH_2 - KWH_1) + PRICE_3 * (kwh - KWH_2);
} else if (kwh <= KWH_4) {
  total =
    PRICE_1 * KWH_1 +
    PRICE_2 * (KWH_2 - KWH_1) +
    PRICE_3 * (KWH_3 - KWH_2) +
    PRICE_4 * (kwh - KWH_3);
} else if (kwh <= KWH_5) {
  total =
    PRICE_1 * KWH_1 +
    PRICE_2 * (KWH_2 - KWH_1) +
    PRICE_3 * (KWH_3 - KWH_2) +
    PRICE_4 * (KWH_4 - KWH_3) +
    PRICE_5 * (kwh - KWH_4);
} else {
  total =
    PRICE_1 * KWH_1 +
    PRICE_2 * (KWH_2 - KWH_1) +
    PRICE_3 * (KWH_3 - KWH_2) +
    PRICE_4 * (KWH_4 - KWH_3) +
    PRICE_5 * (KWH_5 - KWH_4) +
    PRICE_6 * (kwh - KWH_5);
}

console.log(`Số tiền phải đóng là: ${total} đồng`);
