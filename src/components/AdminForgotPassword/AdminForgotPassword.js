// src/components/Login/AdminForgotPassword.js
import React, { useState } from 'react';
import Captcha from 'react-captcha-code'; // Ensure you have this installed
import './AdminForgotPassword.css'; // Create this CSS file

const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleSendVerificationCode = () => {
    if (captchaCode === generatedCode) {
      console.log('Captcha matched. Sending verification code...');
      // Logic to send the verification code
    } else {
      alert('Invalid captcha');
    }
  };

  const handleCaptchaChange = (code) => {
    setGeneratedCode(code);
  };

  return (
    <div className="forgot-password-container">
      <h2>Request Password Reset</h2>
      <form className="forgot-password-form">
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
        <button type="button" onClick={handleSendVerificationCode}>
          Send Verification Code
        </button>
      </form>
    </div>
  );
};

export default AdminForgotPassword;
