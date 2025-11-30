//Bài 3

function retry(fn, times) {
  let promise = fn();
  for (let i = 1; i < times; i++) {
    promise = promise.catch(() => fn());
  }
  return promise;
}
let failingPromise = () => {
  return new Promise((resolve, reject) => {
    Math.random() > 0.7 ? resolve("Thành công") : reject("Thất bại");
  });
};
retry(failingPromise, 3).then(console.log).catch(console.error);
