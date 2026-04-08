import "./App.css";
import Navbar from "./Components/Navbar";
import SearchAndFilter from "./Components/SearchAndFilter";
import TaskStatus from "./Components/TaskStatus";

function App() {
  return (
    <div>
      <Navbar />
      <TaskStatus />
      <SearchAndFilter />
    </div>
  );
}

export default App;
