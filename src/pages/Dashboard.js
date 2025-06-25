import React, { useContext } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import AIAgentPanel from '../components/AIAgentPanel';
import useTasks from '../hooks/useTasks';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    assignTaskToAI,
    aiResponses,
    loading,
    error,
  } = useTasks();
  const { user, logout } = useContext(AuthContext);

  // Task summary
  const totalTasks = tasks.length;
  const completed = tasks.filter(t => (t.status || '').toLowerCase() === 'completed').length;
  const ongoing = tasks.filter(t => (t.status || '').toLowerCase() === 'ongoing').length;
  const pending = tasks.filter(t => !t.status || t.status.toLowerCase() === 'pending').length;

  return (
    <div className="dashboard-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo">
          <img src="https://img.icons8.com/color/48/000000/task.png" alt="Logo" />
          Task Management Portal
        </div>
        <div>
          <span style={{ marginRight: 16 }}>Logged in as: <b>{user?.username}</b> ({user?.role})</span>
          <button className="btn danger" onClick={logout}>Logout</button>
        </div>
      </div>
      <div className="dashboard-welcome">
        👋 Welcome, <b>{user?.username}</b>!
      </div>
      <div className="dashboard-summary">
        {totalTasks} tasks &mdash; {pending} pending, {ongoing} ongoing, {completed} completed
      </div>
      <TaskForm onAdd={addTask} loading={loading} />
      <TaskList
        tasks={tasks}
        onUpdate={updateTask}
        onDelete={deleteTask}
        onAssignAI={assignTaskToAI}
        aiResponses={aiResponses}
        loading={loading}
      />
      <AIAgentPanel aiResponses={aiResponses} loading={loading} error={error} />
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Dashboard;