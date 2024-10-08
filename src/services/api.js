import axios from 'axios';

const API_URL = 'http://your-api-url.com/api'; // Update with your API URL

export const fetchFeedbacks = async () => {
  const response = await axios.get(`${API_URL}/feedbacks`);
  return response.data;
};

// Add other API calls as needed
