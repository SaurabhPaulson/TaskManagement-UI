import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';

// Wake up backend API on app load
const API_ROOT = process.env.REACT_APP_API_BASE;
fetch(`${API_ROOT}/api/tasks`).catch(() => { /* ignore errors */ });

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
