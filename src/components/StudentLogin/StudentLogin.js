import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Captcha from 'react-captcha-code';
import './StudentLogin.css'; // Ensure you import your CSS file

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [captchaError, setCaptchaError] = useState(false); // State for captcha error

  const navigate = useNavigate();

  const handleCaptchaChange = (code) => {
    setGeneratedCode(code);
    setCaptchaError(false); // Reset error when captcha is generated
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (captchaCode === generatedCode) {
      console.log('Captcha matched. Proceed with login...');
      navigate('/student'); // Navigate to Student Dashboard upon successful login
    } else {
      console.log('Invalid captcha');
      setCaptchaError(true); // Set error state when captcha is incorrect
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Student Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
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
          
          <button type="submit" className="login-button">Login</button>
          <div className="forgot-password-link">
            <a href="/forgot-password">Forgot Password?</a> {/* Link to forgot password page */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
