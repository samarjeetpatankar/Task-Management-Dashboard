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

type TabType = "All" | "Pending" | "Completed";
type PriorityType = "All" | "Low" | "Medium" | "High";

const STORAGE_KEY = "task_management_tasks";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("All");
  const [priorityFilter, setPriorityFilter] = useState<PriorityType>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  const openModal = (task?: Task) => {
    setEditingTask(task || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
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

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((current) =>
      current.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Pending" && task.status === "Pending") ||
      (activeTab === "Completed" && task.status === "Completed");

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    const matchesSearch =
      searchQuery === "" ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesPriority && matchesSearch;
  });

  return (
    <div>
      <Navbar onOpenModal={() => openModal()} />
      <TaskStatus tasks={tasks} />
      <SearchAndFilter
        activeTab={activeTab}
        onTabChange={setActiveTab}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <TaskInTableView
        tasks={filteredTasks}
        onEditTask={openModal}
        onDeleteTask={handleDeleteTask}
      />
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        editingTask={editingTask}
      />
    </div>
  );
}

export default App;
