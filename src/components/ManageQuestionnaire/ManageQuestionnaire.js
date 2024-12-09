import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ManageQuestionnaire.css';
import {
  fetchQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} from '../../services/questionService';
// import {
//   fetchRatingLegend,
//   updateRatingLegend,
// } 
// from '../../services/ratingLegendService';
import { fetchCriteria } from '../../services/criteriaService'; // Import fetchCriteria service


const ManageQuestionnaire = () => {
  const [criteriaList, setCriteriaList] = useState([]); // State for criteria list
  const [selectedCriteria, setSelectedCriteria] = useState('');
  const [question, setQuestion] = useState('');
  const [questionsByCriteria, setQuestionsByCriteria] = useState({});
  const [ratingLegend, setRatingLegend] = useState({
    five: 'Strongly Agree',
    four: 'Agree',
    three: 'Neutral',
    two: 'Disagree',
    one: 'Strongly Disagree',
  });
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

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

  // Handle adding a new question
  const handleAddQuestion = async () => {
    if (!selectedCriteria || !question.trim()) return;

    try {
      const newQuestion = await addQuestion(selectedCriteria, question.trim());
      setQuestionsByCriteria((prev) => ({
        ...prev,
        [selectedCriteria]: [...(prev[selectedCriteria] || []), newQuestion],
      }));
      setQuestion(''); // Clear question input
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  // Update rating legend in the backend
  const handleRatingLegendChange = async (ratingKey, newValue) => {
    try {
      const updatedLegend = { ...ratingLegend, [ratingKey]: newValue };
      await updateRatingLegend(selectedCriteria, updatedLegend);
      setRatingLegend(updatedLegend);
    } catch (error) {
      console.error('Error updating rating legend:', error);
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

  // Navigate to evaluation restriction page
  const handleEvaluationRestriction = () => navigate('/admin/evaluation-restriction');

  // Save order of questions
  const handleSaveOrder = () => {
    console.log('Order saved:', questionsByCriteria);
    alert('Order saved successfully!');
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container className="container">
      <Typography variant="h5" gutterBottom>
        Manage Questionnaire
      </Typography>

      <Box className="flex-container">
        {/* Question Form */}
        <Paper elevation={3} className="paper question-form">
          <Typography variant="h6" gutterBottom>
            Question Form
          </Typography>

          {/* Criteria Dropdown */}
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

          {/* Question Input */}
          <TextField
            label="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />

          {/* Save Question Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddQuestion}
            disabled={!selectedCriteria || !question.trim()}
          >
            Save Question
          </Button>
        </Paper>

        <Box flex={2}>
          {/* Rating Legend */}
          <Paper elevation={3} className="paper rating-legend">
            <Typography variant="h6" gutterBottom>
              Rating Legend
            </Typography>

            <Grid container spacing={2}>
              {Object.keys(ratingLegend).map((key) => (
                <Grid item xs={6} sm={4} key={key}>
                  <TextField
                    label={key.toUpperCase()}
                    value={ratingLegend[key]}
                    onChange={(e) => handleRatingLegendChange(key, e.target.value)}
                    fullWidth
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Questions List */}
          <Paper elevation={3} className="paper question-list">
            <Grid container>
              <Typography variant="h6" gutterBottom>
                Evaluation Questionnaire
              </Typography>
              <Box className="evaluation-buttons">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleEvaluationRestriction}
                  sx={{ marginRight: 2 }}
                >
                  Evaluation Restriction
                </Button>
                <Button variant="contained" color="primary" onClick={handleSaveOrder}>
                  Save Order
                </Button>
              </Box>
            </Grid>

            <Divider />

            {questionsByCriteria[selectedCriteria]?.length > 0 ? (
              questionsByCriteria[selectedCriteria].map((qObj, idx) => (
                <Box key={idx} className="question-item">
                  <Typography variant="body1">{qObj.text}</Typography>
                  <RadioGroup
                    row
                    value={qObj.selectedRating || ''}
                    onChange={(e) => handleRatingChange(selectedCriteria, idx, e.target.value)}
                  >
                    {Object.keys(ratingLegend).map((key) => (
                      <FormControlLabel
                        key={key}
                        value={key}
                        control={<Radio />}
                        label={`${key.toUpperCase()} - ${ratingLegend[key]}`}
                      />
                    ))}
                  </RadioGroup>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No questions added yet.
              </Typography>
            )}
          </Paper>
        </Box>
        
      </Box>
    </Container>
  );
};

export default ManageQuestionnaire;
