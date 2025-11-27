const items = document.querySelectorAll("ul li");
const ul = document.querySelector("ul");
items.forEach((item) => {
  const downBtn = item.querySelector(".down");
  const upBtn = item.querySelector(".up");
  upBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const prevEl = item.previousElementSibling;
    if (!prevEl) {
      return;
    }
    ul.insertBefore(item, prevEl);
  });
  downBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const nextEl = item.nextElementSibling;
    if (!nextEl) {
      return;
    }
    ul.insertBefore(nextEl, item);
  });
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    const selectedEl = ul.querySelector(".selected");
    item.classList.add("selected");
    if (selectedEl) {
      selectedEl.classList.remove("selected");
    }
  });
});

document.addEventListener("click", () => {
  const selectedEl = ul.querySelector(".selected");
  if (selectedEl) {
    selectedEl.classList.remove("selected");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.altKey) {
    if (e.key === "ArrowDown") {
      const selectedEl = ul.querySelector(".selected");
      if (!selectedEl) {
        return;
      }
      const itemClone = selectedEl.cloneNode(true);
      itemClone.classList.remove("selected");
      ul.insertBefore(itemClone, selectedEl.nextElementSibling);
    }
    if (e.key === "ArrowUp") {
      const selectedEl = ul.querySelector(".selected");
      if (!selectedEl) {
        return;
      }
      const itemClone = selectedEl.cloneNode(true);
      itemClone.classList.remove("selected");
      ul.insertBefore(itemClone, selectedEl);
    }
  }
});

//Bài tập
function initializeListItems() {
  items.forEach((item) => {
    const textNode = Array.from(item.childNodes).find(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
    );
    if (textNode) {
      const span = document.createElement("span");
      span.classList.add("item-text");
      span.textContent = textNode.textContent.trim();
      item.replaceChild(span, textNode);
    }
  });
}
initializeListItems();
let contextMenu = null;
let contextMenuItem = null;
let isModalOpen = false;

function showRenameModal(originalText, onConfirm) {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("rename-modal");

  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("modal-input");
  input.value = originalText;

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("modal-buttons");

  const saveButton = document.createElement("button");
  saveButton.classList.add("modal-btn", "save-btn");
  saveButton.textContent = "Lưu";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("modal-btn", "cancel-btn");
  cancelButton.textContent = "Hủy";

  buttonContainer.appendChild(input);
  buttonContainer.appendChild(saveButton);
  buttonContainer.appendChild(cancelButton);

  modal.appendChild(buttonContainer);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  isModalOpen = true;

  setTimeout(() => {
    input.focus();
  }, 100);

  let mouseDownTarget = null;

  function closeModal() {
    isModalOpen = false;
    overlay.remove();
  }

  function handleSave() {
    const newText = input.value.trim() || originalText;
    onConfirm(newText);
    closeModal();
  }

  saveButton.addEventListener("click", handleSave);
  cancelButton.addEventListener("click", closeModal);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
    if (e.key === "Escape") {
      closeModal();
    }
  });

  overlay.addEventListener("mousedown", (e) => {
    mouseDownTarget = e.target;
  });

  overlay.addEventListener("mouseup", (e) => {
    if (e.target === overlay && mouseDownTarget === overlay) {
      closeModal();
    }
    mouseDownTarget = null;
  });
}

function updateItemText(item, newText) {
  const span = item.querySelector(".item-text");
  span.textContent = newText;
}

ul.addEventListener("contextmenu", (e) => {
  const isButton =
    e.target.classList.contains("up") ||
    e.target.classList.contains("down") ||
    e.target.tagName === "BUTTON";

  if (isButton) {
    return;
  }

  const item = e.target.closest("li");
  if (!item) {
    return;
  }
  e.preventDefault();
  if (contextMenu) {
    contextMenu.remove();
  }
  contextMenuItem = item;

  contextMenu = document.createElement("div");
  contextMenu.classList.add("context-menu");

  const renameOption = document.createElement("div");
  renameOption.classList.add("context-menu-item");
  renameOption.textContent = "Đổi tên";

  const deleteOption = document.createElement("div");
  deleteOption.classList.add("context-menu-item");
  deleteOption.textContent = "Xóa";

  contextMenu.appendChild(renameOption);
  contextMenu.appendChild(deleteOption);
  document.body.appendChild(contextMenu);

  contextMenu.style.left = e.clientX + "px";
  contextMenu.style.top = e.clientY + "px";

  renameOption.addEventListener("click", () => {
    contextMenu.remove();
    contextMenu = null;

    const originalText = contextMenuItem
      .querySelector(".item-text")
      .textContent.trim();
    showRenameModal(originalText, (newText) => {
      updateItemText(contextMenuItem, newText);
    });
  });

  deleteOption.addEventListener("click", () => {
    contextMenuItem.remove();
    contextMenu.remove();
    contextMenu = null;
  });
});

document.addEventListener("click", (e) => {
  if (contextMenu && !contextMenu.contains(e.target)) {
    contextMenu.remove();
    contextMenu = null;
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (isModalOpen) {
      return;
    }
    if (contextMenu) {
      contextMenu.remove();
      contextMenu = null;
    }
  }
});
