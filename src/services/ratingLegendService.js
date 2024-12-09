import axios from 'axios';

const BASE_URL = 'http://localhost:32501/api/ratings';

// Save ratings function
export const saveRatings = async (criteriaId, payload) => {
  try {
    // Assuming 'payload' includes questionText in each item
    const ratingsPayload = payload.map((item) => ({
      questionId: item.questionId,
      criteriaId,
      rating: parseInt(item.rating, 10),
      questionText: item.questionText, // Add questionText here if not already included
    }));
    const response = await axios.post(BASE_URL, ratingsPayload);
    return response.data;
  } catch (error) {
    console.error('Error saving ratings:', error);
    throw error;
  }
};



export const fetchFeedback = async (criteriaId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${criteriaId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};
