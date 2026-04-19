const { useState, useEffect } = React;
const TodoInput = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = () => {
    const text = inputValue.trim();
    if (!text) return;
    const result = onAddTask(text);
    if (result.success) {
      setInputValue("");
    } else {
      alert(result.message);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="flex pb-6">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        autoComplete="off"
        autoFocus
        placeholder="What is the task today?"
        className="flex-1 px-4 text-white bg-gray-800 border border-blue-600 focus:outline-none"
      />
      <button
        onClick={handleSubmit}
        className="p-2 bg-violet-500 text-sm text-white font-medium transition-colors duration-200 cursor-pointer"
      >
        Add Task
      </button>
    </div>
  );
};

const TodoItem = ({
  task,
  onToggle,
  onEdit,
  onDelete,
  isEditing,
  onSaveEdit,
}) => {
  const [editValue, setEditValue] = useState(task.text);
  useEffect(() => {
    if (isEditing) {
      const input = document.querySelector(`#edit-input-${task.id}`);
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }
  }, [isEditing, task.id]);

  const handleSave = () => {
    const text = editValue.trim();
    if (!text) return;
    const result = onSaveEdit(task.id, text);
    if (!result.success) {
      alert(result.message);
      setEditValue(task.text);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };
  if (isEditing) {
    return (
      <li className="flex items-center bg-violet-500 border rounded-md">
        <div className="flex flex-1">
          <input
            id={`edit-input-${task.id}`}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 text-white border border-blue-600 bg-gray-800 focus:outline-none"
          />
          <button
            onClick={handleSave}
            className="p-2 bg-violet-500 text-sm text-white font-medium transition-colors duration-200 cursor-pointer"
          >
            Edit Task
          </button>
        </div>
      </li>
    );
  }

  const textClasses = task.completed
    ? "line-through text-gray-400"
    : "text-white";
  return (
    <li className="flex items-center bg-violet-500 border rounded-md cursor-pointer">
      <div className="flex-1 py-2 pl-4">
        <span
          onClick={() => onToggle(task.id)}
          className={`cursor-pointer select-none ${textClasses}`}
        >
          {task.text}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit(task.id);
        }}
        className="w-8 h-8 text-white cursor-pointer"
      >
        <i className="fas fa-edit"></i>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        className="w-8 h-8 text-white pr-4 cursor-pointer"
      >
        <i className="fas fa-trash"></i>
      </button>
    </li>
  );
};

const TodoList = ({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  editingTaskIds,
  onSaveEdit,
}) => {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          isEditing={editingTaskIds.includes(task.id)}
          onSaveEdit={onSaveEdit}
        />
      ))}
    </ul>
  );
};
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskIds, setEditingTaskIds] = useState([]);

  const handleAddTask = (text) => {
    const isDuplicate = tasks.some(
      (task) => task.text.toLowerCase() === text.toLowerCase()
    );
    if (isDuplicate) {
      return { success: false, message: "Task này đã tồn tại!" };
    }
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    return { success: true };
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (id) => {
    if (!editingTaskIds.includes(id)) {
      setEditingTaskIds([...editingTaskIds, id]);
    }
  };

  const handleSaveEdit = (id, newText) => {
    const isDuplicate = tasks.some(
      (task) =>
        task.id !== id && task.text.toLowerCase() === newText.toLowerCase()
    );

    if (isDuplicate) {
      return { success: false, message: "Task này đã tồn tại!" };
    }

    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
    setEditingTaskIds(editingTaskIds.filter((taskId) => taskId !== id));
    return { success: true };
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setEditingTaskIds(editingTaskIds.filter((taskId) => taskId !== id));
  };

  return (
    <div className="bg-violet-500 min-h-screen pt-20">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-800 rounded-sm p-10">
          <h1 className="text-white text-3xl font-semibold text-center mb-8">
            Get Things Done !
          </h1>
          <TodoInput onAddTask={handleAddTask} />
          <TodoList
            tasks={tasks}
            onToggle={handleToggleTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            editingTaskIds={editingTaskIds}
            onSaveEdit={handleSaveEdit}
          />
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
