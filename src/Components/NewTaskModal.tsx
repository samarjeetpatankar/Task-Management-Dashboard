import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

type TaskPriority = "Low" | "Medium" | "High";
type TaskStatus = "Pending" | "Completed";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: {
    title: string;
    description: string;
    priority: TaskPriority;
    dueDate: string;
  }) => void;
  onUpdateTask: (task: Task) => void;
  editingTask: Task | null;
};

function NewTaskModal({
  isOpen,
  onClose,
  onAddTask,
  onUpdateTask,
  editingTask,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [status, setStatus] = useState<TaskStatus>("Pending");
  const [dueDate, setDueDate] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setStatus(editingTask.status);
      setDueDate(editingTask.dueDate);
      setTitleCount(editingTask.title.length);
      setDescriptionCount(editingTask.description.length);
      setTitleError(
        editingTask.title.length > 60
          ? "Title cannot exceed 60 characters."
          : "",
      );
      setDescriptionError(
        editingTask.description.length > 200
          ? "Description cannot exceed 200 characters."
          : "",
      );
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setStatus("Pending");
      setDueDate("");
      setTitleCount(0);
      setDescriptionCount(0);
      setTitleError("");
      setDescriptionError("");
    }
  }, [editingTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim() || !dueDate) {
      alert("Please fill in the title and due date.");
      return;
    }

    if (title.length > 60 || description.length > 200) {
      return;
    }

    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        title: title.trim(),
        description: description.trim(),
        priority,
        status,
        dueDate,
      });
    } else {
      onAddTask({
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate,
      });
    }

    // Reset fields
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setStatus("Pending");
    setDueDate("");
    setTitleCount(0);
    setDescriptionCount(0);
    setTitleError("");
    setDescriptionError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-[90%] max-w-lg rounded-2xl shadow-xl p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {editingTask ? "Edit Task" : "New Task"}
          </h2>
          <button onClick={onClose}>
            <FiX className="text-gray-500 hover:text-gray-700 text-xl" />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-600 font-medium">Title *</label>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={(event) => {
                  const value = event.target.value;
                  setTitle(value);
                  setTitleCount(value.length);
                  setTitleError(
                    value.length > 60
                      ? "Title cannot exceed 60 characters."
                      : "",
                  );
                }}
                placeholder="Task title"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none pr-12"
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                {titleCount}/60
              </div>
            </div>
            {titleError && (
              <p className="text-red-500 text-xs mt-1">{titleError}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Description
            </label>
            <div className="relative">
              <textarea
                value={description}
                onChange={(event) => {
                  const value = event.target.value;
                  setDescription(value);
                  setDescriptionCount(value.length);
                  setDescriptionError(
                    value.length > 200
                      ? "Description cannot exceed 200 characters."
                      : "",
                  );
                }}
                placeholder="Optional description"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none resize-none h-24 pr-12"
              ></textarea>
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                {descriptionCount}/200
              </div>
            </div>
            {descriptionError && (
              <p className="text-red-500 text-xs mt-1">{descriptionError}</p>
            )}
          </div>
          <div className="flex gap-3">
            <div className={editingTask ? "w-1/2" : "w-full"}>
              <label className="text-sm text-gray-600 font-medium">
                Priority
              </label>
              <select
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value as TaskPriority)
                }
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            {editingTask && (
              <div className="w-1/2">
                <label className="text-sm text-gray-600 font-medium">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as TaskStatus)
                  }
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                >
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
              </div>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Due Date *
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium"
            >
              {editingTask ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewTaskModal;
