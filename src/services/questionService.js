import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:32501/api/questions'; // Adjust based on your backend URL

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

// API Service functions for Questions
export const fetchQuestions = async (criteriaId) => {
  if (!criteriaId || isNaN(criteriaId)) {
    toast.error('Invalid criteria ID');
    return null;
  }
  try {
    const response = await axios.get(`${API_URL}/${criteriaId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addQuestion = async (criteriaId, questionText) => {
  if (!criteriaId || isNaN(criteriaId) || !questionText.trim()) {
    toast.error('Invalid input data');
    return null;
  }
  try {
    const response = await axios.post(`${API_URL}/${criteriaId}`, { text: questionText });
    toast.success('Question added successfully');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateQuestion = async (id, updatedQuestion) => {
  if (!id || isNaN(id) || !updatedQuestion) {
    toast.error('Invalid input data');
    return null;
  }
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedQuestion);
    toast.success('Question updated successfully');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteQuestion = async (id) => {
  if (!id || isNaN(id)) {
    toast.error('Invalid question ID');
    return;
  }
  try {
    await axios.delete(`${API_URL}/${id}`);
    toast.success('Question deleted successfully');
  } catch (error) {
    handleError(error);
  }
};
