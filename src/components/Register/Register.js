import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/api'; 
import { TextField, Radio, RadioGroup, FormControlLabel, Button, Typography, Box, FormHelperText } from '@mui/material';
import { UserPlus } from 'lucide-react'; 
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student'); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
  
    // Validate inputs
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!emailRegex.test(email)) {
      setError('Email must be a valid @gmail.com address');
      return;
    }
  
    // if (!passwordRegex.test(password)) {
    //   setError('Password must be at least 8 characters long and include an uppercase letter, a number, and a special character');
    //   return;
    // }
  
    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      setError('Mobile number must be exactly 10 digits');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    const userData = {
      username,
      email,
      mobile,
      password,
      userType,
    };
  
    try {
      const registeredUser = await register(userData);
      console.log('Registered User:', registeredUser);
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      setError(error.response?.data || 'User already exists.');
    }
  };
  

  return (
    <Box className="register-container" sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        <UserPlus size={32} /> Register
      </Typography>
      {error && <FormHelperText error>{error}</FormHelperText>} {/* Display error message */}
      <form onSubmit={handleRegister}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Mobile Number"
          type="tel"
          variant="outlined"
          fullWidth
          margin="normal"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <TextField
          label="Create Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        
        <RadioGroup row value={userType} onChange={(e) => setUserType(e.target.value)} sx={{ margin: '16px 0' }}>
          <FormControlLabel value="student" control={<Radio />} label="Student" />
          <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          <FormControlLabel value="faculty" control={<Radio />} label="Faculty" />
        </RadioGroup>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
