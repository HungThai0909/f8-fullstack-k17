//Bài 5

const watchHistory = [
  { userId: 1, videoId: "A1", duration: 10 },
  { userId: 2, videoId: "B1", duration: 15 },
  { userId: 1, videoId: "A1", duration: 20 },
  { userId: 3, videoId: "C1", duration: 30 },
  { userId: 2, videoId: "B1", duration: 5 },
  { userId: 1, videoId: "A2", duration: 25 },
  { userId: 3, videoId: "C1", duration: 15 },
];

//1. Tính tổng thời gian xem của từng video.
const durationByVideoId = watchHistory.reduce((acc, cur) => {
  acc[cur.videoId] = (acc[cur.videoId] || 0) + cur.duration;
  return acc;
}, {});
console.log("Tổng thời gian xem của từng video:", durationByVideoId);

//2. Tìm video được xem nhiều nhất (dựa trên tổng thời gian).
const maxDurationByVideoId = Object.keys(durationByVideoId).reduce(
  (max, videoId) => {
    return durationByVideoId[videoId] > durationByVideoId[max] ? videoId : max;
  }
);
console.log("Video được xem nhiều nhất", {
  videoId: maxDurationByVideoId,
  duration: durationByVideoId[maxDurationByVideoId],
});

//3. Nhóm lịch sử xem theo userId, trong đó mỗi userId sẽ chứa danh sách các video mà họ đã xem và tổng thời gian xem mỗi video.
const historyByUserId = watchHistory.reduce((acc, cur) => {
  const { userId, videoId, duration } = cur;
  if (!acc[userId]) {
    acc[userId] = { userId, videos: {} };
  }
  acc[userId].videos[videoId] = (acc[userId].videos[videoId] || 0) + duration;
  return acc;
}, {});

console.log("Lịch sử xem theo userId:", historyByUserId);
