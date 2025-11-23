function createSlideshow(selector, options = {}) {
  const { infiniteLoop = true } = options;
  const slideshow = document.querySelector(selector);
  const track = slideshow.querySelector(".track");
  const slides = track.querySelectorAll(".slide");
  const prevBtn = document.querySelector("#prevBtn");
  const nextBtn = document.querySelector("#nextBtn");
  const navigation = document.querySelector("#navigation");
  let currentIndex = 0;
  let isMoving = false;
  let dotsHTML = "";
  slides.forEach((_, i) => {
    const bgColor = i === 0 ? "bg-blue-500" : "bg-gray-300";
    dotsHTML += `<button class="dot w-3 h-3 rounded-full ${bgColor}"></button>`;
  });
  navigation.innerHTML = dotsHTML;
  navigation.querySelectorAll(".dot").forEach((dot, i) => {
    dot.addEventListener("click", () => goToSlide(i));
  });

  const updateSlideshow = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    navigation.querySelectorAll(".dot").forEach((dot, i) => {
      dot.className = `dot w-3 h-3 rounded-full ${
        i === currentIndex ? "bg-blue-500" : "bg-gray-300"
      }`;
    });
  };

  const moveSlide = (direction) => {
    if (isMoving) return;
    isMoving = true;
    if (direction === "next") {
      currentIndex =
        currentIndex < slides.length - 1
          ? currentIndex + 1
          : infiniteLoop
          ? 0
          : currentIndex;
    } else {
      currentIndex =
        currentIndex > 0
          ? currentIndex - 1
          : infiniteLoop
          ? slides.length - 1
          : currentIndex;
    }
    updateSlideshow();
    setTimeout(() => (isMoving = false), 500);
  };

  const goToSlide = (index) => {
    if (isMoving || index === currentIndex) return;
    isMoving = true;
    currentIndex = index;
    updateSlideshow();
    setTimeout(() => (isMoving = false), 500);
  };

  prevBtn.addEventListener("click", () => moveSlide("prev"));
  nextBtn.addEventListener("click", () => moveSlide("next"));
  updateSlideshow();
}

createSlideshow("#my-slideshow", {
  infiniteLoop: false,
});
