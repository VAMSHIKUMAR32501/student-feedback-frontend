import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Captcha from 'react-captcha-code';
import { sendForgotPasswordEmail, resetPassword } from '../../services/api'; // Import the service
import './ForgotPassword.css';

const ForgotPassword = ({ userType }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [captchaCode, setCaptchaCode] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [newPassword, setNewPassword] = useState(''); // State for new password
    const [step, setStep] = useState(1); // Track the current step
    const navigate = useNavigate(); // Hook for navigation

    const handleCaptchaChange = (code) => {
        setGeneratedCode(code);
    };

    const handleSendVerificationCode = async () => {
        if (captchaCode === generatedCode) {
            try {
                await sendForgotPasswordEmail(email);
                setStep(2); // Proceed to the next step
            } catch (error) {
                alert('Error sending verification code');
            }
        } else {
            alert('Invalid captcha');
        }
    };

    const handleVerifyCode = async () => {
        try {
            await resetPassword({
                email,
                verificationCode,
                newPassword, // Use the state holding the new password
            });
            alert('Password reset successful');
            navigate('/login'); // Redirect to login page after success
        } catch (error) {
            alert('Invalid verification code or error resetting password');
        }
    };

    return (
        <div className={`forgot-password-container ${userType}`}>
            <h2>{userType} - Request Password Reset</h2>
            <form className="forgot-password-form">
                {step === 1 && (
                    <>
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
                            placeholder="Enter Captcha Code"
                            value={captchaCode}
                            onChange={(e) => setCaptchaCode(e.target.value)}
                            required
                        />
                        <button type="button" onClick={handleSendVerificationCode}>
                            Send Verification Code
                        </button>
                    </>
                )}
                {step === 2 && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter Verification Code Sent to Email"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)} // Update new password state
                            required
                        />
                        <button type="button" onClick={handleVerifyCode}>
                            Reset Password
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};

export default ForgotPassword;
