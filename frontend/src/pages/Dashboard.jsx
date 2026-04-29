import { useEffect, useState } from "react";
import API from "../services/api";
import TaskItem from "../components/TaskItem";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load tasks");
    }
  };

  const addTask = async () => {
    if (!title.trim()) {
      setError("Task cannot be empty");
      return;
    }

    try {
      await API.post("/tasks", { title });
      setTitle("");
      setError("");
      loadTasks(); 
    } catch (err) {
      console.log(err)
      setError("Failed to add task");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const init = async () => {
      await loadTasks();
    };
    init();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">

          <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-5">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Tasks</h1>
              <p className="text-slate-500 mt-1 text-sm font-medium">Manage your daily goals</p>
            </div>
            <button
              onClick={logout}
              className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-sm"
            >
              Logout
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 text-sm mb-6 rounded-r-md">
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="flex gap-3 mb-8">
            <input
              className="border border-slate-200 p-4 flex-1 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700 bg-slate-50 focus:bg-white shadow-inner"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <button
              onClick={addTask}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold shadow-md transition-transform transform hover:scale-[1.02] active:scale-95"
            >
              Add Task
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {tasks.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50">
                <p className="text-slate-500 font-semibold text-lg">No tasks yet</p>
                <p className="text-slate-400 text-sm mt-1">Add a task above to get started.</p>
              </div>
            ) : (
              tasks.map((t) => (
                <TaskItem key={t.id} task={t} refresh={loadTasks} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}