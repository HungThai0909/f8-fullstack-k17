//Bài 8
const reviews = [
  { productId: "P1", userId: "U1", rating: 5 },
  { productId: "P2", userId: "U2", rating: 4 },
  { productId: "P1", userId: "U3", rating: 3 },
  { productId: "P3", userId: "U1", rating: 4 },
  { productId: "P2", userId: "U3", rating: 2 },
  { productId: "P1", userId: "U2", rating: 4 },
];

//1. Tính điểm trung bình đánh giá của mỗi sản phẩm.
const averageRatings = (reviews) => {
  const grouped = reviews.reduce((acc, cur) => {
    if (!acc[cur.productId]) {
      acc[cur.productId] = { total: 0, count: 0 };
    }
    acc[cur.productId].total += cur.rating;
    acc[cur.productId].count += 1;
    return acc;
  }, {});
  const result = {};
  for (const productId in grouped) {
    result[productId] = grouped[productId].total / grouped[productId].count;
  }
  return result;
};

console.log(
  "Điểm trung bình đánh giá của mỗi sản phẩm:",
  averageRatings(reviews)
);

//2. Tìm sản phẩm có điểm trung bình cao nhất.
const findMostRateProduct = (reviews) => {
  const grouped = reviews.reduce((acc, cur) => {
    if (!acc[cur.productId]) {
      acc[cur.productId] = { total: 0, count: 0 };
    }
    acc[cur.productId].total += cur.rating;
    acc[cur.productId].count += 1;
    return acc;
  }, {});
  const productsWithAverage = Object.entries(grouped).map(
    ([productId, { total, count }]) => ({
      productId,
      average: total / count,
    })
  );
  const maxAverage = productsWithAverage.reduce(
    (max, p) => (p.average > max ? p.average : max),
    0
  );
  return productsWithAverage.filter((p) => p.average === maxAverage);
};
console.log(
  "Sản phẩm có điểm trung bình cao nhất:",
  findMostRateProduct(reviews)
);

//3. Nhóm danh sách đánh giá theo productId, trong đó mỗi sản phẩm có danh sách đánh giá của từng người dùng.
const groupReviewsByProject = (reviews) => {
  return reviews.reduce((acc, cur) => {
    if (!acc[cur.productId]) {
      acc[cur.productId] = [];
    }
    acc[cur.productId].push({ userId: cur.userId, rating: cur.rating });
    return acc;
  }, {});
};

console.log(
  "Danh sách đánh giá theo từng sản phẩm:",
  groupReviewsByProject(reviews)
);
