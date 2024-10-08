import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Captcha from 'react-captcha-code'; // Ensure you install this package
import './FacultyLogin.css';

const FacultyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (captchaCode !== generatedCode) {
      alert('Captcha is incorrect!');
      return;
    }
    console.log('Faculty Login:', { email, password });
    navigate('/faculty-dashboard'); // Navigate to Faculty Dashboard upon successful login
  };

  const handleCaptchaChange = (code) => {
    setGeneratedCode(code);
  };

  const handleForgotPassword = () => {
    navigate('/faculty-forgot-password'); // Navigate to the Forgot Password page
  };

  return (
    <div className="faculty-login-container">
      <div className="faculty-login-form">
        <h2>Faculty Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Captcha onChange={handleCaptchaChange} height={50} width={120} />
          <input
            type="text"
            placeholder="Enter Verification Code"
            value={captchaCode}
            onChange={(e) => setCaptchaCode(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <button onClick={handleForgotPassword} className="secondary-button">
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default FacultyLogin;
