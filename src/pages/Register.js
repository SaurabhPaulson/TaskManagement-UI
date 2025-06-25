import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as apiRegister } from '../utils/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await apiRegister(username, password, role);
      navigate('/login');
    } catch (e) {
      setError('Registration failed');
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
        background: 'rgba(255,255,255,0.93)',
        borderRadius: 22,
        boxShadow: '0 12px 40px rgba(60, 60, 120, 0.18), 0 1.5px 6px rgba(60,60,120,0.07)',
        padding: '44px 38px 32px 38px',
        minWidth: 370,
        maxWidth: 410,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        backdropFilter: 'blur(10px)',
        border: '1.5px solid rgba(200,210,255,0.18)'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: 24,
          color: '#4f8cff',
          fontWeight: 800,
          letterSpacing: 1.2
        }}>Create Account</h2>
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
          <select
            className="input"
            value={role}
            onChange={e => setRole(e.target.value)}
            style={{
              fontSize: '1.08rem',
              background: 'rgba(249,250,251,0.85)',
              color: '#2d3a4a',
              fontWeight: 500
            }}
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
          <button className="btn primary" type="submit" style={{ marginTop: 8 }}>Register</button>
        </form>
        {error && <div className="error" style={{ textAlign: 'center' }}>{error}</div>}
      </div>
      <div style={{ marginTop: 18, fontSize: '1.04rem', color: '#4f8cff' }}>
        Already have an account? <Link to="/login" style={{ color: '#2d3a4a', fontWeight: 600 }}>Login</Link>
      </div>
    </div>
  );
};

export default Register;
