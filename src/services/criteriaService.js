import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:32501/api/criteria'; // Adjust based on your backend URL

// Centralized error handling
const handleError = (error) => {
  let message = 'An error occurred';

  if (error.response) {
    console.error(
      `Error: ${error.response.status} - ${error.response.data.message || error.message}`
    );
    message = error.response.data.message || 'Server error occurred';
  } else if (error.request) {
    console.error('No response received', error.request);
    message = 'No response received from server';
  } else {
    console.error('Error setting up request', error.message);
    message = error.message;
  }

  toast.error(message);
  throw new Error(message);
};

// API Service functions
export const fetchCriteria = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addCriteria = async (newCriteria) => {
  try {
    const response = await axios.post(API_URL, newCriteria);
    toast.success('Criterion added successfully');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateCriteria = async (id, updatedCriteria) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedCriteria);
    toast.success('Criterion updated successfully');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteCriteria = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    toast.success('Criterion deleted successfully');
  } catch (error) {
    handleError(error);
  }
};

export const reorderCriteria = async (reorderedList) => {
  try {
    await axios.post(`${API_URL}/reorder`, { criteria: reorderedList });
    toast.success('Order updated successfully');
  } catch (error) {
    handleError(error);
  }
};

