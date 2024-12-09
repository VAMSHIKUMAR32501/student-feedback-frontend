import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';
import { fetchQuestions } from '../../services/questionService';
import { fetchCriteria } from '../../services/criteriaService';
import { saveRatings } from '../../services/ratingLegendService';

const FeedbackForm = () => {
  const [criteriaList, setCriteriaList] = useState([]); // State for criteria list
  const [selectedCriteria, setSelectedCriteria] = useState('');
  const [questionsByCriteria, setQuestionsByCriteria] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch criteria and initialize default criteria
  useEffect(() => {
    const initializeCriteria = async () => {
      try {
        const criteria = await fetchCriteria(); // Fetch criteria from backend
        setCriteriaList(criteria);
        if (criteria.length > 0) {
          const defaultCriteria = criteria[0].id;
          setSelectedCriteria(defaultCriteria);
          fetchQuestionsForCriteria(defaultCriteria); // Fetch questions for default criteria
        }
      } catch (error) {
        console.error('Error fetching criteria:', error);
      } finally {
        setLoading(false);
      }
    };
    initializeCriteria();
  }, []);

  // Fetch questions for the selected criteria
  const fetchQuestionsForCriteria = async (criteriaId) => {
    try {
      const questions = await fetchQuestions(criteriaId);
      setQuestionsByCriteria((prev) => ({
        ...prev,
        [criteriaId]: Array.isArray(questions) ? questions : [],
      }));
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Update selected rating for a question
  const handleRatingChange = (criteriaId, questionIndex, newRating) => {
    setQuestionsByCriteria((prev) => {
      const updatedQuestions = [...(prev[criteriaId] || [])];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        selectedRating: newRating,
      };
      return { ...prev, [criteriaId]: updatedQuestions };
    });
  };

  const handleSave = async () => {
    try {
      const payload = questionsByCriteria[selectedCriteria].map((qObj) => ({
        questionId: qObj.id, // Assuming each question has a unique ID
        rating: qObj.selectedRating,
      }));
      const response = await saveRatings(selectedCriteria, payload);
      console.log('Response from save: ', response);
      alert('Feedback saved successfully!');
    } catch (error) {
      console.error('Error saving feedback:', error);
      alert('An error occurred while saving feedback.');
    }
  };
  

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Manage Questionnaire
      </Typography>

      <Box>
        {/* Criteria Dropdown */}
        <Paper elevation={3} className="paper question-form">
          <Typography variant="h6" gutterBottom>
            Select Criteria
          </Typography>

          <TextField
            label="Criteria"
            value={selectedCriteria}
            onChange={(e) => {
              const newCriteria = e.target.value;
              setSelectedCriteria(newCriteria);
              fetchQuestionsForCriteria(newCriteria); // Fetch questions for the selected criteria
            }}
            fullWidth
            margin="normal"
            select
            SelectProps={{ native: true }}
          >
            <option value="">Please select a criteria</option>
            {criteriaList.map((criteria) => (
              <option key={criteria.id} value={criteria.id}>
                {criteria.text}
              </option>
            ))}
          </TextField>
        </Paper>

        {/* Questions List */}
        <Paper elevation={3} className="paper question-list">
          <Typography variant="h6" gutterBottom>
            Evaluation Questionnaire
          </Typography>
          <Divider />
          {questionsByCriteria[selectedCriteria]?.length > 0 ? (
            questionsByCriteria[selectedCriteria].map((qObj, idx) => (
              <Box key={idx} className="question-item">
                <Typography variant="body1">{qObj.text}</Typography>
                <RadioGroup
                  row
                  value={qObj.selectedRating || ''}
                  onChange={(e) =>
                    handleRatingChange(selectedCriteria, idx, e.target.value)
                  }
                >
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label="FIVE - Strongly Agree"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="FOUR - Agree"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="THREE - Neutral"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="TWO"
                  />
                </RadioGroup>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No questions added yet.
            </Typography>
          )}
        </Paper>

        {/* Save Button */}
        <Box mt={3} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            size="large"
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FeedbackForm;