import axios from 'axios';

// Axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://feedback-system-backend32501.up.railway.app/api/auth",
  
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Allows cookies for cross-origin requests
});

// Centralized error handling function
const handleError = (error) => {
  if (error.response) {
    console.error(`Error: ${error.response.status} - ${error.response.data.message || error.message}`);
    throw new Error(error.response.data.message || 'Server error occurred');
  } else if (error.request) {
    console.error('No response received', error.request);
    throw new Error('No response received from server');
  } else {
    console.error('Error setting up request', error.message);
    throw new Error(error.message);
  }
};

// Function to register a user
export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// src/services/studentService.js
export const fetchStudents = async () => {
  const response = await axios.get(`${API_URL}/students`);
  return response.data;
};

export const fetchEvaluationReports = async (userType) => {
  const endpoint = userType === 'student' ? '/api/student/reports' : '/api/faculty/reports';
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Failed to fetch evaluation reports');
  }
  return await response.json();
};



// Function to log in a user
export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    console.log("Credentials sent: ", credentials); // For debugging
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to send a password reset email
export const sendForgotPasswordEmail = async (email) => {
  try {
    const response = await api.post('/forgot-password', { email });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to reset the password
export const resetPassword = async (data) => {
  try {
    const response = await api.post('/reset-password', data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


