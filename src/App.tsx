import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import SearchAndFilter from "./Components/SearchAndFilter";
import TaskInTableView from "./Components/TaskInTableView";
import TaskStatus from "./Components/TaskStatus";
import NewTaskModal from "./Components/NewTaskModal";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "Completed";
  dueDate: string;
};

const STORAGE_KEY = "task_management_tasks";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
      return JSON.parse(stored) as Task[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTask = (task: Omit<Task, "id" | "status">) => {
    const newTask: Task = {
      ...task,
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}`,
      status: "Pending",
    };

    setTasks((current) => [...current, newTask]);
  };

  return (
    <div>
      <Navbar onOpenModal={openModal} />
      <TaskStatus tasks={tasks} />
      <SearchAndFilter />
      <TaskInTableView tasks={tasks} />
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddTask={handleAddTask}
      />
    </div>
  );
}

export default App;
