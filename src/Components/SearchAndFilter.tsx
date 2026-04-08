import { useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";

type TabType = "All" | "Pending" | "Completed";
type PriorityType = "All" | "Low" | "Medium" | "High";

type Props = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  priorityFilter: PriorityType;
  onPriorityChange: (priority: PriorityType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

function SearchAndFilter({
  activeTab,
  onTabChange,
  priorityFilter,
  onPriorityChange,
  searchQuery,
  onSearchChange,
}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const tabs: TabType[] = ["All", "Pending", "Completed"];
  const priorities: PriorityType[] = ["All", "Low", "Medium", "High"];

  const handleTabClick = (tab: TabType) => {
    onTabChange(tab);
  };

  const handlePrioritySelect = (value: PriorityType) => {
    onPriorityChange(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full px-4 md:px-12 py-4 bg-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-[60%]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex bg-gray-100 rounded-md overflow-hidden">
            {tabs.map((tab) => {
              let isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-50"
            >
              {priorityFilter} Priorities
              <FiChevronDown className="text-gray-500" />
            </button>

            {isDropdownOpen ? (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-10">
                {priorities.map((item) => (
                  <div
                    key={item}
                    onClick={() => handlePrioritySelect(item)}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchAndFilter;
