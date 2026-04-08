import { FiX } from "react-icons/fi";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function NewTaskModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-[90%] max-w-lg rounded-2xl shadow-xl p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">New Task</h2>
          <button onClick={onClose}>
            <FiX className="text-gray-500 hover:text-gray-700 text-xl" />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-600 font-medium">Title *</label>
            <input
              type="text"
              placeholder="Task title"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Description
            </label>
            <textarea
              placeholder="Optional description"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none resize-none h-24"
            ></textarea>
          </div>
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="text-sm text-gray-600 font-medium">
                Priority
              </label>
              <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="text-sm text-gray-600 font-medium">
                Due Date *
              </label>
              <input
                type="date"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium">
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewTaskModal;
