import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import { fetchCriteria } from '../../services/criteriaService';
import { fetchFeedback } from '../../services/ratingLegendService';

const ViewFeedback = () => {
  const [criteriaList, setCriteriaList] = useState([]); // List of criteria
  const [selectedCriteria, setSelectedCriteria] = useState(''); // Currently selected criteria
  const [feedback, setFeedback] = useState([]); // Feedback data
  const [loading, setLoading] = useState(false); // Loading state

  // Map rating numbers to descriptions
  const ratingTextMap = {
    5: 'Strongly Agree',
    4: 'Agree',
    3: 'Neutral',
    2: 'Disagree',
    1: 'Strongly Disagree',
  };

  // Load criteria list on component mount
  useEffect(() => {
    const loadCriteria = async () => {
      try {
        const criteria = await fetchCriteria();
        setCriteriaList(criteria);
      } catch (error) {
        console.error('Error fetching criteria:', error);
      }
    };
    loadCriteria();
  }, []);

  // Fetch feedback based on the selected criteria
  const handleFetchFeedback = async (criteriaId) => {
    try {
      setLoading(true);
      const feedbackData = await fetchFeedback(criteriaId);
      console.log('Fetched Feedback:', JSON.stringify(feedbackData, null, 2)); // Log in JSON format

      if (feedbackData && Array.isArray(feedbackData)) {
        setFeedback(feedbackData);
      } else {
        console.error('Invalid feedback data format:', feedbackData);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        View Feedback
      </Typography>

      {/* Criteria Dropdown */}
      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          Select Criteria
        </Typography>
        <select
          value={selectedCriteria}
          onChange={(e) => {
            const newCriteria = e.target.value;
            setSelectedCriteria(newCriteria);
            if (newCriteria) {
              handleFetchFeedback(newCriteria);
            }
          }}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        >
          <option value="">-- Select Criteria --</option>
          {criteriaList.map((criteria) => (
            <option key={criteria.id} value={criteria.id}>
              {criteria.text}
            </option>
          ))}
        </select>
      </Box>

      {/* Feedback Details */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Feedback Details
          </Typography>
          <Divider />
          {feedback.length > 0 ? (
  feedback.map((item, index) => (
    <Box key={index} mt={2}>
      <Typography variant="body1">
        <strong>Question:</strong> {item.questionText }
      </Typography>
      <Typography variant="body2">
        <strong>Rating:</strong> {item.rating} - {ratingTextMap[item.rating] || 'Unknown'}
      </Typography>
    </Box>
  ))
) : (
  <Typography>No feedback available for the selected criteria.</Typography>
)}

        </Paper>
      )}
    </Container>
  );
};

export default ViewFeedback;
