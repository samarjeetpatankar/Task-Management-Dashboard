import { FiEdit2, FiTrash2, FiList, FiGrid } from "react-icons/fi";
import { useState, useEffect } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "Completed";
  dueDate: string;
};

type Props = {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onReorderTasks?: (reorderedTasks: Task[]) => void;
};

function TaskInTableView({
  tasks,
  onEditTask,
  onDeleteTask,
  onReorderTasks,
}: Props) {
  const [view, setView] = useState<"list" | "grid">("list");
  const [deleteConfirmTask, setDeleteConfirmTask] = useState<Task | null>(null);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverTaskId, setDragOverTaskId] = useState<string | null>(null);

  const STORAGE_KEY = "taskOrder";

  const getStoredTasks = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const storedIds = JSON.parse(stored) as string[];
        const storedOrderMap = new Map(
          storedIds.map((id, index) => [id, index]),
        );
        return [...tasks].sort((a, b) => {
          const aIndex = storedOrderMap.get(a.id) ?? Infinity;
          const bIndex = storedOrderMap.get(b.id) ?? Infinity;
          return aIndex - bIndex;
        });
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
    return tasks;
  };

  const [orderedTasks, setOrderedTasks] = useState<Task[]>(getStoredTasks());

  useEffect(() => {
    setOrderedTasks(getStoredTasks());
  }, [tasks]);

  const handleDragStart = (taskId: string) => {
    setDraggedTaskId(taskId);
  };

  const handleDragOver = (e: React.DragEvent, taskId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverTaskId(taskId);
  };

  const handleDragLeave = () => {
    setDragOverTaskId(null);
  };

  const handleDrop = (e: React.DragEvent, targetTaskId: string) => {
    e.preventDefault();

    if (!draggedTaskId || draggedTaskId === targetTaskId) {
      setDraggedTaskId(null);
      setDragOverTaskId(null);
      return;
    }

    const draggedIndex = orderedTasks.findIndex((t) => t.id === draggedTaskId);
    const targetIndex = orderedTasks.findIndex((t) => t.id === targetTaskId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const updatedTasks = [...orderedTasks];
    const [draggedTask] = updatedTasks.splice(draggedIndex, 1);
    updatedTasks.splice(targetIndex, 0, draggedTask);

    setOrderedTasks(updatedTasks);

    // Save to localStorage
    try {
      const taskIds = updatedTasks.map((task) => task.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(taskIds));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }

    onReorderTasks?.(updatedTasks);
    setDraggedTaskId(null);
    setDragOverTaskId(null);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverTaskId(null);
  };

  const getPriorityStyle = (priority: Task["priority"]) => {
    if (priority === "High") return "bg-red-100 text-red-600";
    if (priority === "Medium") return "bg-yellow-100 text-yellow-600";
    return "bg-green-100 text-green-600";
  };

  const getStatusStyle = (status: Task["status"]) => {
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  const formatDate = (dateString: string) => {
    const parsed = new Date(dateString);
    if (Number.isNaN(parsed.getTime())) return dateString;
    const day = parsed.getDate().toString().padStart(2, "0");
    const month = (parsed.getMonth() + 1).toString().padStart(2, "0");
    const year = parsed.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const truncateText = (text: string, maxLength = 160) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  const getTaskRowStyle = (task: Task) => {
    if (task.status === "Completed") {
      return "opacity-60 line-through";
    }
    return "";
  };

  const getCardHeaderColor = (task: Task) => {
    if (task.priority === "High") return "bg-red-500";
    if (task.priority === "Medium") return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleDeleteClick = (task: Task) => {
    setDeleteConfirmTask(task);
  };

  const confirmDelete = () => {
    if (deleteConfirmTask) {
      onDeleteTask(deleteConfirmTask.id);
      setDeleteConfirmTask(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmTask(null);
  };

  return (
    <div className="w-full px-2 py-4 sm:px-4 md:px-6 lg:px-8 xl:px-12 sm:py-6 md:py-8 lg:py-10">
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <p className="text-gray-500 text-xs sm:text-sm">{tasks.length} tasks</p>

        <div className="flex items-center rounded-full border border-gray-200 overflow-hidden">
          <button
            onClick={() => setView("list")}
            className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center ${
              view === "list"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-500 hover:bg-gray-50"
            } rounded-l-full`}
          >
            <FiList className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => setView("grid")}
            className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center ${
              view === "grid"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-500 hover:bg-gray-50"
            } rounded-r-full`}
          >
            <FiGrid className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
      {tasks.length === 0 ? (
        <div className="w-full bg-white rounded-xl shadow border border-gray-200 p-4 sm:p-6 md:p-8 text-center text-gray-600">
          <p className="text-base sm:text-lg font-medium text-gray-800">
            No task yet
          </p>
          <p className="mt-2 text-xs sm:text-sm">
            Add your first task using the New Task button.
          </p>
        </div>
      ) : view === "list" ? (
        <div className="w-full overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
          <table className="min-w-[820px] md:min-w-full w-full md:table-auto table-fixed text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="w-44 sm:w-52 md:w-auto px-2 py-2 sm:px-4 sm:py-3 md:px-6">
                  Title
                </th>
                <th className="w-64 sm:w-72 md:w-auto px-2 py-2 sm:px-4 sm:py-3 md:px-6">
                  Description
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 md:px-6">Priority</th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 md:px-6">Status</th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 md:px-6">Due Date</th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orderedTasks.map((task) => (
                <tr
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  onDragOver={(e) => handleDragOver(e, task.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, task.id)}
                  onDragEnd={handleDragEnd}
                  className={`transition duration-200 cursor-move ${
                    draggedTaskId === task.id
                      ? "opacity-50 bg-blue-50"
                      : dragOverTaskId === task.id
                        ? "bg-blue-100 shadow-md"
                        : "hover:bg-gray-50"
                  } ${getTaskRowStyle(task)}`}
                >
                  <td className="w-44 sm:w-52 md:w-auto px-2 py-2 sm:px-4 sm:py-3 md:px-6 font-medium text-gray-800 text-xs sm:text-sm truncate">
                    {task.title}
                  </td>
                  <td className="w-64 sm:w-72 md:w-auto px-2 py-2 sm:px-4 sm:py-3 md:px-6 text-gray-500 whitespace-normal break-words text-xs sm:text-sm">
                    {truncateText(task.description) ||
                      "No description provided."}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6">
                    <span
                      className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${getPriorityStyle(
                        task.priority,
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6">
                    <span
                      className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        task.status,
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 text-gray-600 text-xs sm:text-sm">
                    <div>{formatDate(task.dueDate)}</div>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 text-right">
                    <div className="flex justify-end gap-2 sm:gap-3 text-gray-500">
                      {task.status !== "Completed" && (
                        <button
                          onClick={() => onEditTask(task)}
                          className="hover:text-blue-500"
                        >
                          <FiEdit2 />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteClick(task)}
                        className="hover:text-red-500"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {orderedTasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={() => handleDragStart(task.id)}
              onDragOver={(e) => handleDragOver(e, task.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, task.id)}
              onDragEnd={handleDragEnd}
              className={`overflow-hidden rounded-2xl sm:rounded-3xl border-2 transition-all duration-200 bg-white cursor-move ${
                draggedTaskId === task.id
                  ? "opacity-50 scale-95 border-blue-400 shadow-lg shadow-blue-200"
                  : dragOverTaskId === task.id
                    ? "border-blue-400 shadow-lg shadow-blue-300 -translate-y-1"
                    : "border-gray-200 shadow-sm hover:-translate-y-0.5 hover:shadow-md"
              } ${
                task.status === "Completed" ? "opacity-60 line-through" : ""
              }`}
            >
              <div
                className={`${getCardHeaderColor(task)} h-0.5 sm:h-1 w-full`}
              />
              <div className="p-3 sm:p-4 md:p-5">
                <div className="flex items-start justify-between gap-2 sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:gap-2 w-full">
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-900 truncate overflow-hidden text-ellipsis block">
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                        <span
                          className={`rounded-full px-1 py-0.5 sm:px-1.5 sm:py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide ${getStatusStyle(
                            task.status,
                          )}`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm leading-4 sm:leading-5 text-gray-600 line-clamp-2 sm:line-clamp-3 w-full overflow-hidden text-ellipsis">
                      {truncateText(task.description, 80) ||
                        "No description provided."}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 sm:gap-1.5 text-gray-500">
                    {task.status !== "Completed" && (
                      <button
                        onClick={() => onEditTask(task)}
                        className="rounded-full p-1 sm:p-1.5 text-gray-500 hover:bg-gray-100 transition"
                        aria-label="Edit task"
                      >
                        <FiEdit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteClick(task)}
                      className="rounded-full p-1 sm:p-1.5 text-gray-500 hover:bg-gray-100 transition"
                      aria-label="Delete task"
                    >
                      <FiTrash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 md:mt-5 flex flex-wrap items-center justify-between gap-2 sm:gap-3 border-t border-gray-100 pt-3 sm:pt-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-semibold ${getPriorityStyle(
                      task.priority,
                    )}`}
                  >
                    {task.priority}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {formatDate(task.dueDate)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={cancelDelete}
          />
          <div className="relative bg-white w-full max-w-xs sm:max-w-sm rounded-2xl shadow-xl p-4 sm:p-6 z-10">
            <div className="text-center">
              <h2 className="text-base sm:text-lg font-semibold mb-2">
                Delete Task
              </h2>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Are you sure you want to delete "{deleteConfirmTask.title}"?
                This action cannot be undone.
              </p>
              <div className="flex justify-center gap-2 sm:gap-3">
                <button
                  onClick={cancelDelete}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskInTableView;
