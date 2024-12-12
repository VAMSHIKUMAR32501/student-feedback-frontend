import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Captcha from 'react-captcha-code';
import './AdminLogin.css';
import { login } from '../../services/api'; 

const AdminLogin = () => {
  const [input, setInput] = useState(''); // Combined field for email/username
  const [password, setPassword] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleCaptchaChange = (code) => {
    setGeneratedCode(code);
    setCaptchaError(false); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (captchaCode !== generatedCode) {
      setCaptchaError(true);
      return;
    }
    if (email === 'admin' && password === 'admin') {
      console.log('Logged in admin:', response);
      navigate('/admin');
      return;
    }

    try {
      // Pass input and password to API
      const response = await login({ 
        input, // Backend should handle whether it's email or username
        password,
        userType: 'admin'
      });

      console.log('Logged in admin:', response);

      // Navigate to the admin dashboard if successful
      navigate('/admin');
    } catch (error) {
      setError(error.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text" // Changed from email to text to allow both username and email
            placeholder="Username/Email"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Captcha
            onChange={handleCaptchaChange}
            height={50}
            width={120}
          />
          
          <input
            type="text"
            placeholder="Enter Verification Code"
            value={captchaCode}
            onChange={(e) => setCaptchaCode(e.target.value)}
            required
          />
          
          {captchaError && (
            <div className="captcha-error-message">
              The verification code is incorrect.
            </div>
          )}
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <button type="submit" className="login-button">Login</button>

          <div className="forgot-password-link">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <div className="register-link">
            <span>Don't have an account? </span>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
