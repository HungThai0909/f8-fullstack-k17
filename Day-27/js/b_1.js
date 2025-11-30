//Bài 1

function fetchUser() {
  return new Promise((resolve) => setTimeout(() => resolve("User Data"), 2000));
}
function fetchPosts() {
  return new Promise((resolve) => setTimeout(() => resolve("Post Data"), 3000));
}
function fetchComments() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Comment Data"), 1000)
  );
}

//1. Dùng Promise.all để lấy kết quả từ cả 3 promises.
Promise.all([fetchUser(), fetchPosts(), fetchComments()])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log("Có lỗi xảy ra:", error);
  });

//2. Tính tổng thời gian chạy của cả 3 promises.
const start = Date.now();
Promise.all([fetchUser(), fetchPosts(), fetchComments()]).then(() => {
  const total = Date.now() - start;
  console.log("Total", total, "ms");
});
