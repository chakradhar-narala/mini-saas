import API from "../services/api";

export default function TaskItem({ task, refresh }) {

  const toggleStatus = async () => {
    await API.put(`/tasks/${task.id}`, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    refresh();
  };

  const deleteTask = async () => {
    await API.delete(`/tasks/${task.id}`);
    refresh();
  };

  return (
    <div className="group flex justify-between items-center bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:border-indigo-100">
      <div className="flex items-center gap-4">
        <div 
          onClick={toggleStatus}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${
            task.status === "completed" ? "bg-green-500 border-green-500" : "border-slate-300 hover:border-indigo-400"
          }`}
        >
          {task.status === "completed" && (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <div className="flex flex-col">
          <span
            className={`text-lg font-medium transition-colors ${
              task.status === "completed"
                ? "line-through text-slate-400"
                : "text-slate-700"
            }`}
          >
            {task.title}
          </span>
          <span className="text-xs text-slate-400">
            {task.status === "completed" ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <button
          onClick={deleteTask}
          className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
          title="Delete task"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}