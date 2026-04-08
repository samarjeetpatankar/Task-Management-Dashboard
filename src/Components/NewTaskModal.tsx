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

function NewTaskModal({ isOpen, onClose, onAddTask, onUpdateTask, editingTask }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [status, setStatus] = useState<TaskStatus>("Pending");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setStatus(editingTask.status);
      setDueDate(editingTask.dueDate);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setStatus("Pending");
      setDueDate("");
    }
  }, [editingTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim() || !dueDate) {
      alert("Please fill in the title and due date.");
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
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Task title"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Description
            </label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Optional description"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none resize-none h-24"
            ></textarea>
          </div>
          <div className="flex gap-3">
            <div className="w-1/2">
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
