import "./App.css";
import Navbar from "./Components/Navbar";
import SearchAndFilter from "./Components/SearchAndFilter";
import TaskInTableView from "./Components/TaskInTableView";
import TaskStatus from "./Components/TaskStatus";

function App() {
  return (
    <div>
      <Navbar />
      <TaskStatus />
      <SearchAndFilter />
      <TaskInTableView />
    </div>
  );
}

export default App;
