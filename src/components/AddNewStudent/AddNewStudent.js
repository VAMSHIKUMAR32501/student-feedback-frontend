import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { register } from '../../services/api'; // Import the register function
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AddNewStudent.css';

const AddNewStudent = () => {
  const [studentDetails, setStudentDetails] = useState({
    username: '',
    email: '',
    class: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const classes = ['Class 1A', 'Class 1B', 'Class 2A', 'Class 2B', 'Class 3A', 'Class 3B'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // Add userType as 'student' if needed for registration
      const userData = {
        username: studentDetails.username,
        email: studentDetails.email,
        mobile: '1234567890', // Dummy mobile value; replace as needed
        password: 'defaultPassword123!', // Placeholder password; update based on use case
        userType: 'student',
      };

      const registeredUser = await register(userData);
      console.log('Registered User:', registeredUser);
      setSuccessMessage('Student added successfully!');
      setStudentDetails({
        username: '',
        email: '',
        class: '',
      });

      // Navigate to the student list page after successful addition
      navigate('/admin/students/list');
    } catch (error) {
      console.error('Error during registration:', error);
      setError(error.message || 'Error adding student. Please try again later.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom className="page-title">
        Add New Student
      </Typography>
      {error && <FormHelperText error>{error}</FormHelperText>}
      {successMessage && <FormHelperText>{successMessage}</FormHelperText>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="User name"
              name="username"
              value={studentDetails.username}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={studentDetails.email}
              onChange={handleChange}
              type="email"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Class"
              name="class"
              value={studentDetails.class}
              onChange={handleChange}
              select
              required
            >
              {classes.map((cls, index) => (
                <MenuItem key={index} value={cls}>
                  {cls}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="submit-button"
            >
              Add Student
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddNewStudent;
