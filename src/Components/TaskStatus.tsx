function TaskStatus() {
  const data = [
    {
      title: "Total Tasks",
      count: 2,
      border: "border-gray-300",
      text: "text-gray-800",
      bg: "bg-gray-50",
    },
    {
      title: "Pending",
      count: 1,
      border: "border-yellow-400",
      text: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      title: "Completed",
      count: 1,
      border: "border-green-400",
      text: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Overdue",
      count: 1,
      border: "border-red-400",
      text: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="px-4 md:px-12 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
