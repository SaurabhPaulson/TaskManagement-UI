import { useState, useEffect } from 'react';
import * as api from '../utils/api';

function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [aiResponses, setAIResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchTasks();
      setTasks(data);
    } catch (e) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
    // eslint-disable-next-line
  }, []); // Only run once on mount

  const addTask = async ({ title, description }) => {
    setLoading(true);
    setError(null);
    try {
      await api.createTask({ title, description });
      await fetchAllTasks();
    } catch (e) {
      setError('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, { title, description }) => {
    setLoading(true);
    setError(null);
    try {
      await api.updateTask(id, { title, description });
      await fetchAllTasks();
    } catch (e) {
      setError('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async id => {
    setLoading(true);
    setError(null);
    try {
      await api.deleteTask(id);
      await fetchAllTasks();
      setAIResponses(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (e) {
      setError('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const assignTaskToAI = async id => {
    setLoading(true);
    setError(null);
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) throw new Error('Task not found');
      const res = await api.getAssignmentSuggestion(task);
      setAIResponses(prev => ({
        ...prev,
        [id]: res.suggestion || 'AI assigned task',
      }));
    } catch (e) {
      setError('Failed to assign to AI');
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    assignTaskToAI,
    aiResponses,
    loading,
    error,
    fetchAllTasks,
  };
}

export default useTasks;