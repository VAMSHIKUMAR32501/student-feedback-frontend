// src/services/admindashboard.js
import axios from 'axios';

// Ensure the API URL is correct and can be replaced based on the environment
const API_URL = process.env.REACT_APP_API_URL || 'https://feedback-system-backend32501.up.railway.app/api/auth'; // Use an environment variable for flexibility

// Function to fetch dashboard data
export const fetchDashboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/dashboard`); // Make the GET request
    if (response.status === 200) {
      return response.data; // Return the data if response is successful
    } else {
      throw new Error(`Error: Received status code ${response.status}`); // Handle non-200 responses
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error.message); // Log the error message
    throw error; // Rethrow the error to handle it in the component
  }
};

// Additional API functions can be added here as needed
