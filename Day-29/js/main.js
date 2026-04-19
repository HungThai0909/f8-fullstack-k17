const BASE_URL = "https://dummyjson.com";
const app = {
  _query: {
    order: "desc",
    limit: 10,
    page: 1,
  },
  _timeoutId: null,
  _currentPost: null,
  _isEditing: false,

  init() {
    this.getUsers();
    this.search();
    this.sort();
    this.paginate();
    this.initModals();
    this.initAddNew();
  },

  async getUsers() {
    try {
      this.renderLoading();
      const skip = (this._query.page - 1) * this._query.limit;
      let url = `${BASE_URL}/posts?sortBy=id&order=${this._query.order}&limit=${this._query.limit}&skip=${skip}`;
      if (this._query.q) {
        url = `${BASE_URL}/posts/search?q=${this._query.q}&sortBy=id&order=${this._query.order}&limit=${this._query.limit}&skip=${skip}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch /posts");
      }
      const data = await response.json();
      const pageNumber = Math.ceil(data.total / this._query.limit);
      this.renderPosts(data.posts);
      this.renderPaginate(pageNumber);
    } catch (error) {
      this.renderError(error.message);
    } finally {
      this.renderLoading(false);
    }
  },

  renderPaginate(pageNumber) {
    const paginateEl = document.querySelector(".js-paginate");
    paginateEl.innerHTML = "";
    for (let page = 1; page <= pageNumber; page++) {
      const active = this._query.page === page ? "bg-green-600 text-white" : "";
      paginateEl.innerHTML += `<button class="border border-gray-300 px-4 py-2 ${active}">${page}</button>`;
    }
  },

  renderLoading(status = true) {
    const loadingEl = document.querySelector(".js-loading");
    loadingEl.innerHTML = status
      ? `<span class="block text-3xl text-center">Loading...</span>`
      : "";
  },

  renderError(message) {
    const postListEl = document.querySelector(".js-post-list");
    postListEl.innerHTML = `<span class="block text-3xl text-center">${message}</span>`;
  },

  renderPosts(posts) {
    const postListEl = document.querySelector(".js-post-list");
    postListEl.innerHTML = posts
      .map(
        (post) => `<div class="my-3 border border-gray-300 p-5" data-post-id="${
          post.id
        }">
          <h2 class="text-2xl font-medium mb-3">
            ${this.sanitizeText(post.title)}
          </h2>
          <p>
            ${this.sanitizeText(post.body)}
          </p>
          <div class="flex justify-between mt-3">
            <button
              data-post-id="${post.id}"
              class="js-view-detail cursor-pointer border border-gray-300 py-2 px-5 hover:bg-green-600 rounded-full"
            >
              Xem chi tiết
            </button>
            <div class="flex gap-2">
              <span class="js-edit-inline cursor-pointer text-blue-600 hover:text-blue-800" data-post-id="${
                post.id
              }">Sửa</span>
              <span class="js-delete-inline cursor-pointer text-red-600 hover:text-red-800" data-post-id="${
                post.id
              }">Xóa</span>
            </div>
          </div>
        </div>`
      )
      .join("");
  },

  sanitizeText(text) {
    return text.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  },

  search() {
    const inputEl = document.querySelector(".js-search");
    inputEl.addEventListener("input", (e) => {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
      }
      this._timeoutId = setTimeout(() => {
        const keyword = e.target.value;
        this._query.q = keyword;
        this._query.page = 1;
        this.getUsers();
      }, 500);
    });
  },

  sort() {
    const btnList = document.querySelectorAll(".js-sort button");
    btnList.forEach((btn) => {
      btn.addEventListener("click", () => {
        const sortValue = btn.dataset.sort;
        const btnActive = document.querySelector(".js-sort .btn-active");
        if (btnActive) {
          btnActive.classList.remove("btn-active");
        }
        btn.classList.add("btn-active");
        this._query.order = sortValue;
        this.getUsers();
      });
    });
  },

  paginate() {
    const paginateEl = document.querySelector(".js-paginate");
    paginateEl.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const page = +e.target.innerText;
        this._query.page = page;
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
        this.getUsers();
      }
    });
  },
  initModals() {
    const postListEl = document.querySelector(".js-post-list");
    const modalDetail = document.querySelector(".js-modal-detail");
    const modalOverlay = document.querySelector(".js-modal-overlay");
    const closeModalBtn = document.querySelector(".js-close-modal");
    postListEl.addEventListener("click", async (e) => {
      if (e.target.classList.contains("js-view-detail")) {
        const postId = e.target.dataset.postId;
        await this.openDetailModal(postId);
      }
      if (e.target.classList.contains("js-edit-inline")) {
        const postId = e.target.dataset.postId;
        const post = await this.fetchData(`${BASE_URL}/posts/${postId}`);
        if (post) {
          this.openFormModal(true, post);
        }
      }
      if (e.target.classList.contains("js-delete-inline")) {
        const postId = e.target.dataset.postId;
        await this.deletePost(postId);
      }
    });
    const closeDetailModal = () => {
      this.toggleDetailModal(false);
    };
    closeModalBtn.addEventListener("click", closeDetailModal);
    modalOverlay.addEventListener("click", () => {
      if (!modalDetail.classList.contains("hidden")) {
        closeDetailModal();
      } else if (
        !document.querySelector(".js-modal-form").classList.contains("hidden")
      ) {
        this.toggleFormModal(false);
      }
    });
    modalDetail.addEventListener("click", (e) => {
      if (e.target === modalDetail) closeDetailModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (!modalDetail.classList.contains("hidden")) {
          closeDetailModal();
        }
        if (
          !document.querySelector(".js-modal-form").classList.contains("hidden")
        ) {
          this.toggleFormModal(false);
        }
      }
    });
  },

  initAddNew() {
    const addNewBtn = document.querySelector(".js-add-new");
    const closeFormBtn = document.querySelector(".js-close-form");
    const postForm = document.querySelector(".js-post-form");
    addNewBtn.addEventListener("click", () => {
      this.openFormModal(false);
    });
    closeFormBtn.addEventListener("click", () => {
      this.toggleFormModal(false);
    });
    postForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(postForm);
      const data = {
        title: formData.get("title"),
        body: formData.get("body"),
        userId: 5,
      };
      if (this._isEditing && this._currentPost) {
        await this.updatePost(this._currentPost.id, data);
      } else {
        await this.createPost(data);
      }
    });
  },

  async openDetailModal(postId) {
    this.toggleDetailModal(true);
    const post = await this.fetchData(`${BASE_URL}/posts/${postId}`);
    if (!post || !post.title) {
      alert("Không thể tải bài viết");
      this.toggleDetailModal(false);
      return;
    }
    this._currentPost = post;
    document.querySelector("#modalTitle").textContent = post.title;
    document.querySelector("#modalBody").textContent =
      post.body || "Không có nội dung";
    const modalLoading = document.querySelector(".js-modal-loading");
    const modalContent = document.querySelector(".js-modal-content");
    modalLoading.classList.add("hidden");
    modalContent.classList.remove("hidden");
  },

  openFormModal(isEdit = false, post = null) {
    this._isEditing = isEdit;
    this._currentPost = post;
    const formTitle = document.querySelector(".js-form-title");
    const titleInput = document.querySelector(".js-title-input");
    const bodyInput = document.querySelector(".js-body-input");
    formTitle.textContent = isEdit ? "Sửa bài viết" : "Thêm bài viết mới";
    if (isEdit && post) {
      titleInput.value = post.title;
      bodyInput.value = post.body;
    } else {
      titleInput.value = "";
      bodyInput.value = "";
    }
    this.toggleFormModal(true);
  },
  toggleDetailModal(show) {
  const modal = document.querySelector(".js-modal-detail");
  const modalOverlay = document.querySelector(".js-modal-overlay");
  const modalLoading = document.querySelector(".js-modal-loading");
  const modalContent = document.querySelector(".js-modal-content");
  modal.classList.toggle("hidden", !show);
  modalOverlay.classList.toggle("hidden", !show);
  document.body.classList.toggle("modal-open", show); 
  if (show) {
    modalLoading.classList.remove("hidden");
    modalContent.classList.add("hidden");
  }
},

toggleFormModal(show) {
  const modal = document.querySelector(".js-modal-form");
  const modalOverlay = document.querySelector(".js-modal-overlay");
  modal.classList.toggle("hidden", !show);
  modalOverlay.classList.toggle("hidden", !show);
  document.body.classList.toggle("modal-open", show);
},

  async createPost(data) {
    try {
      const response = await fetch(`${BASE_URL}/posts/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create post");
      const newPost = await response.json();
      alert("Thêm bài viết thành công!");
      this.toggleFormModal(false);
      const postListEl = document.querySelector(".js-post-list");
      const newPostHTML = `<div class="my-3 border border-gray-300 p-5 bg-green-50" data-post-id="${
        newPost.id
      }">
        <h2 class="text-2xl font-medium mb-3">
          ${this.sanitizeText(newPost.title)}
        </h2>
        <p>
          ${this.sanitizeText(newPost.body)}
        </p>
        <div class="flex justify-between mt-3">
          <button
            data-post-id="${newPost.id}"
            class="js-view-detail cursor-pointer border border-gray-300 py-2 px-5 hover:bg-green-600 rounded-full"
          >
            Xem chi tiết
          </button>
          <div class="flex gap-2">
            <span class="js-edit-inline cursor-pointer text-blue-600 hover:text-blue-800" data-post-id="${
              newPost.id
            }">Sửa</span>
            <span class="js-delete-inline cursor-pointer text-red-600 hover:text-red-800" data-post-id="${
              newPost.id
            }">Xóa</span>
          </div>
        </div>
      </div>`;
      postListEl.insertAdjacentHTML("afterbegin", newPostHTML);
    } catch (error) {
      alert("Lỗi khi thêm bài viết: " + error.message);
    }
  },

  async updatePost(id, data) {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update post");
      const updatedPost = await response.json();
      alert("Cập nhật bài viết thành công!");
      this.toggleFormModal(false);
      const postEl = document.querySelector(`[data-post-id="${id}"]`);
      if (postEl) {
        postEl.querySelector("h2").textContent = updatedPost.title;
        postEl.querySelector("p").textContent = updatedPost.body;
        postEl.classList.add("bg-blue-50");
        setTimeout(() => postEl.classList.remove("bg-blue-50"), 2000);
      }
    } catch (error) {
      alert("Lỗi khi cập nhật bài viết: " + error.message);
    }
  },

  async deletePost(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete post");
      alert("Xóa bài viết thành công!");
      const postEl = document.querySelector(`[data-post-id="${id}"]`);
      if (postEl) {
        postEl.style.transition = "opacity 0.3s";
        postEl.style.opacity = "0";
        setTimeout(() => postEl.remove(), 300);
      }
    } catch (error) {
      alert("Lỗi khi xóa bài viết: " + error.message);
    }
  },

  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

app.init();
