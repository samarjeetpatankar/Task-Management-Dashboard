import { FiEdit2, FiTrash2, FiList, FiGrid } from "react-icons/fi";
import { useState } from "react";

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
};

function TaskInTableView({ tasks, onEditTask, onDeleteTask }: Props) {
  const [view, setView] = useState<"list" | "grid">("list");
  const [deleteConfirmTask, setDeleteConfirmTask] = useState<Task | null>(null);

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
    <div className="w-full px-4 md:px-12 py-10">
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-500 text-sm">{tasks.length} tasks</p>

        <div className="flex items-center rounded-full border border-gray-200 overflow-hidden">
          <button
            onClick={() => setView("list")}
            className={`w-11 h-11 flex items-center justify-center ${
              view === "list"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-500 hover:bg-gray-50"
            } rounded-l-full`}
          >
            <FiList />
          </button>
          <button
            onClick={() => setView("grid")}
            className={`w-11 h-11 flex items-center justify-center ${
              view === "grid"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-500 hover:bg-gray-50"
            } rounded-r-full`}
          >
            <FiGrid />
          </button>
        </div>
      </div>
      {tasks.length === 0 ? (
        <div className="w-full bg-white rounded-xl shadow border border-gray-200 p-8 text-center text-gray-600">
          <p className="text-lg font-medium text-gray-800">No task yet</p>
          <p className="mt-2 text-sm">
            Add your first task using the New Task button.
          </p>
        </div>
      ) : view === "list" ? (
        <div className="w-full overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Priority</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className={`hover:bg-gray-50 transition ${getTaskRowStyle(task)}`}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 text-gray-500 max-w-sm whitespace-normal break-words">
                    {truncateText(task.description) || "No description provided."}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityStyle(
                        task.priority,
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        task.status,
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div>{formatDate(task.dueDate)}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3 text-gray-500">
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
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                task.status === "Completed" ? "opacity-60 line-through" : ""
              }`}
            >
              <div className={`${getCardHeaderColor(task)} h-1 w-full`} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {task.title}
                      </h3>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${getStatusStyle(
                          task.status,
                        )}`}
                      >
                        {task.status}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600 min-h-[3rem]">
                      {truncateText(task.description) || "No description provided."}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-gray-500">
                    {task.status !== "Completed" && (
                      <button
                        onClick={() => onEditTask(task)}
                        className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                        aria-label="Edit task"
                      >
                        <FiEdit2 />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteClick(task)}
                      className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                      aria-label="Delete task"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                      task.priority,
                    )}`}
                  >
                    {task.priority}
                  </span>
                  <span className="text-sm text-gray-500">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={cancelDelete}
          />
          <div className="relative bg-white w-[90%] max-w-sm rounded-2xl shadow-xl p-6 z-10">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">Delete Task</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{deleteConfirmTask.title}"?
                This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium"
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
