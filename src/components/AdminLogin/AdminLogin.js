
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Captcha from 'react-captcha-code';
import './AdminLogin.css';
import { login } from '../../services/api'; 

const AdminLogin = () => {
  const [email, setEmail] = useState('');
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

    try {
      const response = await login({ email, password ,userType:'admin'});
      console.log('Logged in admin:', response);

      // Navigate to the student dashboard if successful
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
            type="email"
            placeholder="Username/Email"
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

          {/* New Register Link */}
          <div className="register-link">
            <span>Don't have an account? </span>
            <Link to="/register">Register</Link> {/* Link to the register page */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;


