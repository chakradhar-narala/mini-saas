import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleSignup = async () => {
    try {
      setError("");
      const res = await API.post("/auth/signup", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/95 backdrop-blur-sm p-10 rounded-2xl shadow-2xl w-96 flex flex-col gap-5 border border-white/20">
        <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800 tracking-tight">
          Task Manager
        </h2>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 text-sm rounded">
            <p>{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <input
            className="border-gray-300 border p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all bg-gray-50 focus:bg-white"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="border-gray-300 border p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all bg-gray-50 focus:bg-white"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <button
            onClick={handleLogin}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full py-3 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5"
          >
            Sign In
          </button>

          <button
            onClick={handleSignup}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold w-full py-3 rounded-lg transition-all"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}