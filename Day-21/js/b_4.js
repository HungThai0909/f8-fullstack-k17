//Bài 4

const posts = [
  {
    id: 1,
    title: "JavaScript cơ bản",
    tags: ["js", "basic"],
    comments: [
      { user: "An", text: "Hay quá!" },
      { user: "Bình", text: "Rất dễ hiểu" },
    ],
  },
  {
    id: 2,
    title: "Học React không khó",
    tags: ["react", "js"],
    comments: [{ user: "Chi", text: "Cảm ơn chia sẻ" }],
  },
];

//1. In ra tất cả title kèm số lượng comments của từng bài viết.
const newPosts = posts.map((post) => ({
  title: post.title,
  commentCount: post.comments.length,
}));

console.log(newPosts);

//2. Tạo mảng mới chứa tất cả tags (không trùng lặp).
const newTags = posts
  .map((post) => post.tags)
  .flat()
  .filter((tag, index, arr) => arr.indexOf(tag) === index);
console.log(newTags);

//3. Tìm tất cả các bình luận của user "An".
const comments = posts
  .map((post) => post.comments)
  .flat()
  .filter((comment) => comment.user === "An");
console.log(comments);
