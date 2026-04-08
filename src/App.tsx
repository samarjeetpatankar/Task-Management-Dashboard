import { useState } from "react";
import Navbar from "./Components/Navbar";
import SearchAndFilter from "./Components/SearchAndFilter";
import TaskInTableView from "./Components/TaskInTableView";
import TaskStatus from "./Components/TaskStatus";
import NewTaskModal from "./Components/NewTaskModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar onOpenModal={openModal} />
      <TaskStatus />
      <SearchAndFilter />
      <TaskInTableView />

      <NewTaskModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
