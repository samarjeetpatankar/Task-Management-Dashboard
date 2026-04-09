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
};

function TaskStatus({ tasks }: Props) {
  const totalTasks = tasks.length;
  const pending = tasks.filter((task) => task.status === "Pending").length;
  const completed = tasks.filter((task) => task.status === "Completed").length;

  const data = [
    {
      title: "Total Tasks",
      count: totalTasks,
      border: "border-gray-300",
      text: "text-gray-800",
      bg: "bg-gray-50",
    },
    {
      title: "Pending",
      count: pending,
      border: "border-yellow-400",
      text: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      title: "Completed",
      count: completed,
      border: "border-green-400",
      text: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="px-4 md:px-12 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl border ${item.border} ${item.bg} p-5 flex flex-col items-center justify-center text-center shadow-sm`}
          >
            <h2 className={`text-2xl font-bold ${item.text}`}>{item.count}</h2>
            <p className={`text-xs font-semibold mt-1 ${item.text}`}>
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskStatus;
