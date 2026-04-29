import axios from "axios";

const API = axios.create({
  baseURL: "https://mini-saas-4rgb.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(err.response?.data?.message || err.message);
    return Promise.reject(err);
  }
);

export default API;