import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/tasks';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const login = async (username, password) => {
  try {
    const res = await axios.post('http://localhost:3000/api/login', { username, password });
    return res.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || 'Login failed');
  }
};

export const register = async (username, password, role) => {
  try {
    const res = await axios.post('http://localhost:3000/api/register', { username, password, role });
    return res.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || 'Registration failed');
  }
};

export const fetchTasks = async () => {
  try {
    const res = await axios.get(API_BASE, { headers: getAuthHeaders() });
    return res.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || 'Failed to fetch tasks');
  }
};

export const createTask = async (task) => {
  try {
    const res = await axios.post(API_BASE, task, { headers: getAuthHeaders() });
    return res.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || 'Failed to create task');
  }
};

export const updateTask = async (id, task) => {
  try {
    const res = await axios.put(`${API_BASE}/${id}`, task, { headers: getAuthHeaders() });
    return res.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || 'Failed to update task');
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_BASE}/${id}`, { headers: getAuthHeaders() });
  } catch (e) {
    throw new Error(e.response?.data?.message || 'Failed to delete task');
  }
};

export const getAssignmentSuggestion = async (task) => {
  try {
    const res = await axios.post('http://localhost:3000/api/ai/assignment', task, { headers: getAuthHeaders() });
    return res.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || 'Failed to get assignment suggestion');
  }
};

export const getPrioritySuggestion = async (tasks) => {
  try {
    const res = await axios.post('http://localhost:3000/api/ai/priority', { tasks }, { headers: getAuthHeaders() });
    return res.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || 'Failed to get priority suggestion');
  }
};

export const getSummary = async (userId) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/ai/summary/${userId}`, { headers: getAuthHeaders() });
    return res.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || 'Failed to get summary');
  }
};