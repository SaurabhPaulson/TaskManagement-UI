import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as apiLogin } from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const { token, user } = await apiLogin(username, password);
      login(user, token);
      navigate('/');
    } catch (e) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)'
    }}>
      <div className="logo" style={{ marginBottom: 18 }}>
        <img src="https://img.icons8.com/color/48/000000/task.png" alt="Logo" />
        Task Management Portal
      </div>
      <div style={{
        background: 'rgba(255,255,255,0.92)',
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(79,140,255,0.13)',
        padding: '38px 32px 28px 32px',
        minWidth: 340,
        maxWidth: 370,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: 28, color: '#2d3a4a', fontWeight: 800, letterSpacing: 1.2 }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <input
            className="input"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ fontSize: '1.08rem' }}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ fontSize: '1.08rem' }}
          />
          <button className="btn primary" type="submit" style={{ marginTop: 8 }}>Login</button>
        </form>
        {error && <div className="error" style={{ textAlign: 'center' }}>{error}</div>}
      </div>
      <div style={{ marginTop: 18, fontSize: '1.04rem', color: '#4f8cff' }}>
        Don't have an account? <Link to="/register" style={{ color: '#2d3a4a', fontWeight: 600 }}>Register</Link>
      </div>
    </div>
  );
};

export default Login;
