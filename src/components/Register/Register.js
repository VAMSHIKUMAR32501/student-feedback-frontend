// src/components/Register/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Default as 'student'
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Registration logic here
    console.log('Register:', { username, email, mobile, password, userType });

    // Navigate to the login page after registration
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="user-type">
            <label>
              <input
                type="radio"
                name="userType"
                value="student"
                checked={userType === 'student'}
                onChange={() => setUserType('student')}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="admin"
                checked={userType === 'admin'}
                onChange={() => setUserType('admin')}
              />
              Admin
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="faculty"
                checked={userType === 'faculty'}
                onChange={() => setUserType('faculty')}
              />
              Faculty
            </label>
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
