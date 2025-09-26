import axios from "axios";

const API_URL = "http://localhost:7070/api/v1";

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

// ---------------- AUTH ----------------
export const signup = async (userData) => {
  const res = await axios.post(`${API_URL}/auth/signup`, userData);
  return res.data;
};

//export const login = async (userData) => {
//  const res = await axios.post(`${API_URL}/auth/login`, userData);
//  return res.data;
//};
export const login = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, userData);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// ---------------- TASKS ----------------
export const getTasks = async () => {
  const res = await axios.get(`${API_URL}/tasks`, getAuthHeaders());
  return res.data;
};

export const addTask = async (task) => {
  const res = await axios.post(`${API_URL}/tasks`, task, getAuthHeaders());
  return res.data;
};

export const updateTask = async (id, task) => {
  const res = await axios.put(`${API_URL}/tasks/${id}`, task, getAuthHeaders());
  return res.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeaders());
};

// ---------------- ADMIN USER MANAGEMENT ----------------
export const getUsers = async () => {
  const res = await axios.get(`${API_URL}/all`, getAuthHeaders());
  return res.data;
};

export const updateUser = async (id, userData) => {
  const res = await axios.put(`${API_URL}/update/${id}`, userData, getAuthHeaders());

  if(res.data.token){
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`, getAuthHeaders());
    return true; // deletion succeeded
  } catch (err) {
    console.error("Delete failed:", err);
    throw err;
  }
};


//profile
export const getProfile = async () => {
  const res = await axios.get(`${API_URL}/profile`, getAuthHeaders());
  return res.data;
};
