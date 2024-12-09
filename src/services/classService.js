import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'https://feedback-system-backend32501.up.railway.app/api/classes'; // Adjust based on your backend URL

// Centralized error handling function
const handleError = (error) => {
  let message = 'An error occurred';

  if (error.response) {
    console.error(`Error: ${error.response.status} - ${error.response.data.message || error.message}`);
    message = error.response.data.message || 'Server error occurred';
    if (error.response.status === 401) {
      console.error('Unauthorized access - please check your credentials.');
      message = 'Unauthorized access - please check your credentials.';
    }
  } else if (error.request) {
    console.error('No response received', error.request);
    message = 'No response received from server';
  } else {
    console.error('Error setting up request', error.message);
    message = error.message;
  }

  // Show user notification
  toast.error(message);
  throw new Error(message);
};

// Class Service Functions

export const fetchClasses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addClass = async (newClass) => {
  try {
    const response = await axios.post(API_URL, newClass);
    toast.success('Class added successfully');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteClass = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    toast.success('Class deleted successfully');
  } catch (error) {
    handleError(error);
  }
};

export const updateClass = async (id, updatedClass) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedClass);
    toast.success('Class updated successfully');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
