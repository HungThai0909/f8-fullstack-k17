let allPosts = [];
let currentSort = "desc";
let searchTimeout;

const postsContainer = document.querySelector("#postsContainer");
const searchInput = document.querySelector("#searchInput");
const sortNewest = document.querySelector("#sortNewest");
const sortOldest = document.querySelector("#sortOldest");
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeModal");
const loadingState = document.querySelector("#loadingState");
const emptyState = document.querySelector("#emptyState");
const modalLoading = document.querySelector("#modalLoading");
const modalContent = document.querySelector("#modalContent");
const modalOverlay = document.querySelector("#modalOverlay");

async function fetchData(url) {
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      alert(res.status === 404 ? "Không tìm thấy dữ liệu" : "Lỗi server");
      return null;
    }
    const data = await res.json();
    if (!data) {
      alert("Không có dữ liệu");
      return null;
    }
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      alert("Kết nối quá chậm hoặc không có mạng");
    } else if (error.message === "Failed to fetch") {
      alert("Không có kết nối Internet");
    } else {
      alert("Đã xảy ra lỗi");
    }
    console.error(error);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => loadPosts());

async function loadPosts(sortOrder = "desc") {
  toggleLoading(true);
  const data = await fetchData(
    `https://dummyjson.com/posts?sortBy=id&order=${sortOrder}`
  );
  if (!data || !data.posts || !data.posts.length) {
    toggleEmpty(true);
    toggleLoading(false);
    return;
  }
  allPosts = data.posts;
  displayPosts(allPosts);
  toggleLoading(false);
}

function displayPosts(posts) {
  postsContainer.innerHTML = "";
  if (!posts || !posts.length) {
    toggleEmpty(true);
    return;
  }
  toggleEmpty(false);
  posts.forEach((post) => postsContainer.appendChild(createPostCard(post)));
}

function createPostCard(post) {
  const card = document.createElement("div");
  card.className = "bg-white border border-gray-200 p-6 transition";
  card.innerHTML = `
    <h3 class="text-xl font-bold mb-3">${post.title || "Không có tiêu đề"}</h3>
    <p class="text-gray-700 mb-4">${post.body || "Không có nội dung"}</p>
    <div class="flex items-center justify-between">
      <button class="view-detail px-4 py-2 border border-gray-800 rounded-full hover:bg-green-600 hover:text-white transition font-medium">
        Xem chi tiết
      </button>
      <div class="flex gap-4">
        <button class="text-blue-600 hover:underline font-medium">Sửa</button>
        <button class="text-red-600 hover:underline font-medium">Xóa</button>
      </div>
    </div>
  `;
  card
    .querySelector(".view-detail")
    .addEventListener("click", () => openModal(post.id));
  return card;
}

searchInput.addEventListener("input", (e) => {
  clearTimeout(searchTimeout);
  const query = e.target.value.trim();
  if (!query) {
    loadPosts(currentSort);
    return;
  }
  searchTimeout = setTimeout(async () => {
    toggleLoading(true);
    const data = await fetchData(
      `https://dummyjson.com/posts/search?q=${encodeURIComponent(query)}`
    );
    if (!data || !data.posts) {
      toggleEmpty(true);
      toggleLoading(false);
      return;
    }
    const filtered = data.posts.filter((post) => {
      const q = query.toLowerCase();
      return (
        post.title?.toLowerCase().includes(q) ||
        post.body?.toLowerCase().includes(q)
      );
    });
    displayPosts(filtered);
    toggleLoading(false);
  }, 500);
});

function updateSort(order) {
  currentSort = order;
  const isNewest = order === "desc";
  sortNewest.classList.toggle("bg-yellow-300", isNewest);
  sortNewest.classList.toggle("border", !isNewest);
  sortOldest.classList.toggle("bg-yellow-300", !isNewest);
  sortOldest.classList.toggle("border", isNewest);
  if (!searchInput.value.trim()) loadPosts(order);
}

sortNewest.addEventListener("click", () => updateSort("desc"));
sortOldest.addEventListener("click", () => updateSort("asc"));

async function openModal(postId) {
  toggleModal(true);
  const post = await fetchData(`https://dummyjson.com/posts/${postId}`);
  if (!post || !post.title) {
    alert("Không thể tải bài viết");
    toggleModal(false);
    return;
  }
  document.querySelector("#modalTitle").textContent = post.title;
  document.querySelector("#modalBody").textContent =
    post.body || "Không có nội dung";
  modalLoading.classList.add("hidden");
  modalContent.classList.remove("hidden");
}
function closeModalHandler() {
  toggleModal(false);
}

closeModal.addEventListener("click", closeModalHandler);
modalOverlay.addEventListener("click", closeModalHandler);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModalHandler();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModalHandler();
  }
});

function toggleModal(show) {
  modal.classList.toggle("hidden", !show);
  modalOverlay.classList.toggle("hidden", !show);
  document.body.style.overflow = show ? "hidden" : "auto";
  if (show) {
    modalLoading.classList.remove("hidden");
    modalContent.classList.add("hidden");
  }
}

function toggleLoading(show) {
  loadingState.classList.toggle("hidden", !show);
  postsContainer.classList.toggle("hidden", show);
}

function toggleEmpty(show) {
  emptyState.classList.toggle("hidden", !show);
  postsContainer.classList.toggle("hidden", show);
}
