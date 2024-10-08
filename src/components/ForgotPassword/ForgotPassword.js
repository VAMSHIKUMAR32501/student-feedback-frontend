import React, { useState } from 'react';
import Captcha from 'react-captcha-code'; // Add CAPTCHA
import './ForgotPassword.css'; // Make sure to import your CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [captchaError, setCaptchaError] = useState(false); // State for captcha error

  const handleSendVerificationCode = () => {
    if (captchaCode === generatedCode) {
      console.log('Captcha matched. Sending verification code...');
      // Logic to send the verification code here
    } else {
      console.log('Invalid captcha');
      setCaptchaError(true); // Set error state when captcha is incorrect
    }
  };

  const handleCaptchaChange = (code) => {
    setGeneratedCode(code);
    setCaptchaError(false); // Reset error when captcha is generated
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
        
        {captchaError && (
          <div className="captcha-error-message">
            The verification code is incorrect.
          </div>
        )}
        
        <button type="button" onClick={handleSendVerificationCode}>
          Send Verification Code
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
