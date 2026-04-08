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

function TaskInTableView() {
  const [view, setView] = useState<"list" | "grid">("list");

  const tasks: Task[] = [
    {
      id: "1",
      title: "Second Task",
      description:
        "This is the Second Task description This is the Second Task description This is the Second Task description This is the Second Task description This is the Second Task description ",
      priority: "High",
      status: "Pending",
      dueDate: "25/04/2026",
    },
    {
      id: "2",
      title: "First Task",
      description: "This is the task for the Main Flow to check",
      priority: "Low",
      status: "Pending",
      dueDate: "23/04/2026",
    },
  ];

  const getPriorityStyle = (priority: Task["priority"]) => {
    if (priority === "High") return "bg-red-100 text-red-600";
    if (priority === "Medium") return "bg-yellow-100 text-yellow-600";
    return "bg-green-100 text-green-600";
  };

  const getStatusStyle = (status: Task["status"]) => {
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="w-full px-4 md:px-12 py-10">
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-500 text-sm">{tasks.length} tasks</p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded ${
              view === "list" ? "bg-red-500 text-white" : "bg-gray-100"
            }`}
          >
            <FiList />
          </button>
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded ${
              view === "grid" ? "bg-gray-100" : "bg-gray-100"
            }`}
          >
            <FiGrid />
          </button>
        </div>
      </div>
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
              <tr key={task.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {task.title}
                </td>
                <td className="px-6 py-4 text-gray-500 max-w-sm whitespace-normal break-words">
                  {task.description}
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
                <td className="px-6 py-4 text-gray-600">{task.dueDate}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3 text-gray-500">
                    <button className="hover:text-blue-500">
                      <FiEdit2 />
                    </button>
                    <button className="hover:text-red-500">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskInTableView;
