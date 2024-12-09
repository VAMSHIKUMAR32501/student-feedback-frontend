import axios from 'axios';
const { ToastContainer, toast } = require('react-toastify');

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:32501/api/academic-years';

// Handle errors centrally
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

// Function to fetch academic years
export const fetchAcademicYears = async () => {
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to delete an academic year
export const deleteAcademicYear = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      withCredentials: true,
    });
    toast.success('Academic year deleted successfully');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to add a new academic year
export const addAcademicYear = async (newYear) => {
  try {
    const response = await axios.post(API_URL, newYear, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    toast.success('Academic year added successfully');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to update an existing academic year
export const updateAcademicYear = async (id, updatedYear) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedYear, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    toast.success('Academic year updated successfully'); // Notify success
    return response.data; // Return the updated data
  } catch (error) {
    handleError(error); // Handle error centrally
  }
};

