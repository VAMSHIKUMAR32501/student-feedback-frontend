// src/components/Login/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  const handleStudentLogin = () => {
    navigate('/student-login');
  };

  const handleFacultyLogin = () => {
    navigate('/faculty-login'); // Navigate to Faculty Login
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Select User Type</h2>
        <button onClick={handleAdminLogin} className="user-button">Admin Login</button>
        <button onClick={handleStudentLogin} className="user-button">Student Login</button>
        <button onClick={handleFacultyLogin} className="user-button">Faculty Login</button>
      </div>
    </div>
  );
};

export default Login;
