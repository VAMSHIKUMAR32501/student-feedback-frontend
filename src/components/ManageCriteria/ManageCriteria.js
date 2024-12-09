import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper, List, ListItem, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageCriteria = () => {
  const [criteriaList, setCriteriaList] = useState([]);
  const [newCriteria, setNewCriteria] = useState('');
  const [selectedCriteria, setSelectedCriteria] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    fetchCriteria();
  }, []);

  const fetchCriteria = async () => {
    try {
      const response = await axios.get('http://localhost:32501/api/criteria');
      setCriteriaList(response.data);
    } catch (error) {
      console.error('Error fetching criteria:', error);
      toast.error('Failed to load criteria.');
    }
  };

  const handleAddCriteria = async () => {
    if (!newCriteria) return;
    try {
      const response = await axios.post('http://localhost:32501/api/criteria', { name: newCriteria });
      setCriteriaList([...criteriaList, response.data]);
      setNewCriteria('');
      toast.success('Criteria added successfully!');
    } catch (error) {
      console.error('Error adding criteria:', error);
      toast.error('Failed to add criteria.');
    }
  };

  const handleDeleteCriteria = async (id) => {
    if (!window.confirm('Are you sure you want to delete this criteria?')) return;
    try {
      await axios.delete(`http://localhost:32501/api/criteria/${id}`);
      setCriteriaList(criteriaList.filter((criteria) => criteria.id !== id));
      setSelectedCriteria(null);
      setQuestionList([]);
      toast.success('Criteria deleted successfully!');
    } catch (error) {
      console.error('Error deleting criteria:', error);
      toast.error('Failed to delete criteria.');
    }
  };

  const handleSelectCriteria = async (criteria) => {
    setSelectedCriteria(criteria);
    try {
      const response = await axios.get(`http://localhost:32501/api/criteria/${criteria.id}/questions`);
      setQuestionList(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('Failed to load questions.');
    }
  };

  const handleAddQuestion = async () => {
    if (!newQuestion) return;
    try {
      const response = await axios.post(`http://localhost:32501/api/criteria/${selectedCriteria.id}/questions`, { question: newQuestion });
      setQuestionList([...questionList, response.data]);
      setNewQuestion('');
      toast.success('Question added successfully!');
    } catch (error) {
      console.error('Error adding question:', error);
      toast.error('Failed to add question.');
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      await axios.delete(`http://localhost:32501/api/questions/${questionId}`);
      setQuestionList(questionList.filter((question) => question.id !== questionId));
      toast.success('Question deleted successfully!');
    } catch (error) {
      console.error('Error deleting question:', error);
      toast.error('Failed to delete question.');
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Manage Criteria and Questions
      </Typography>

      {/* Criteria Management */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <TextField
          label="New Criteria"
          value={newCriteria}
          onChange={(e) => setNewCriteria(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddCriteria}>
          Add Criteria
        </Button>
        <List>
          {criteriaList.map((criteria) => (
            <ListItem key={criteria.id}>
              <span onClick={() => handleSelectCriteria(criteria)} style={{ cursor: 'pointer' }}>
                {criteria.name}
              </span>
              <IconButton onClick={() => handleDeleteCriteria(criteria.id)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Questionnaire Management */}
      {selectedCriteria && (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6">Manage Questions for {selectedCriteria.name}</Typography>
          <TextField
            label="New Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddQuestion}>
            Add Question
          </Button>
          <List>
            {questionList.map((question) => (
              <ListItem key={question.id}>
                {question.question}
                <IconButton onClick={() => handleDeleteQuestion(question.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default ManageCriteria;
