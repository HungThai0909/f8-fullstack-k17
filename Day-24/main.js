const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const tasksList = document.querySelector("#tasksList");

let tasks = [];

function renderTask(task) {
  const classes = task.completed ? "line-through text-gray-400" : "text-white";

  return `
    <div class="flex items-center bg-violet-500 border rounded-md duration-200 group" data-id="${task.id}">
      <span class="flex-1 py-2 pl-4 cursor-pointer transition-all duration-200 ${classes}" onclick="toggleTask(${task.id})">
        ${task.text}
      </span>
      <button class="w-8 h-8 text-white transition-all duration-200" onclick="editTask(${task.id})">
        <i class="fas fa-edit"></i>
      </button>
      <button class="w-8 h-8 text-white transition-all duration-200 pr-4" onclick="deleteTask(${task.id})">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;
}

function renderEditMode(task) {
  return `
    <div class="flex flex-1">
      <input type="text" value="${task.text}" 
        class="flex-1 px-4 text-white border border-blue-600 bg-gray-800" 
        style="outline: none"
        onkeypress="if(event.key==='Enter') saveTask(${task.id}, this.value)"
        id="edit-${task.id}">
      <button class="p-2 bg-violet-500 text-sm text-white font-medium transition-colors duration-200 cursor-pointer"
        onclick="saveTask(${task.id}, document.querySelector('#edit-${task.id}').value)">
        Add Task
      </button>
    </div>
  `;
}

function renderAll() {
  tasksList.innerHTML = tasks.map(renderTask).join("");
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderAll();
  }
}

function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ id: Date.now(), text, completed: false });
    taskInput.value = "";
    renderAll();
  }
}

function editTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    const taskEl = document.querySelector(`[data-id="${id}"]`);
    taskEl.innerHTML = renderEditMode(task);
  }
}

function saveTask(id, newText) {
  const text = newText.trim();
  if (text) {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.text = text;
      renderAll();
    }
  }
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  renderAll();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
