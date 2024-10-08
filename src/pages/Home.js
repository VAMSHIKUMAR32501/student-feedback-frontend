// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Welcome to the Student Feedback System</h1>
        
        <img src={`${process.env.PUBLIC_URL}/assets/images/home.png`} alt="Home" className="home-image" />

        <div className="home-buttons">
          <button onClick={handleRegister} className="home-button">Register</button>
          <button onClick={handleLogin} className="home-button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
