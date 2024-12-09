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
import './AddNewFaculty.css';

const AddNewFaculty = () => {
  const [facultyDetails, setFacultyDetails] = useState({
    name: '',
    email: '',
    department: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const departments = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // Add userType as 'faculty' for registration
      const userData = {
        username: facultyDetails.name,
        email: facultyDetails.email,
        mobile: '1234567890', // Dummy mobile value; replace as needed
        password: 'defaultPassword123!', // Placeholder password; update as needed
        userType: 'faculty',
      };

      const registeredUser = await register(userData);
      console.log('Registered User:', registeredUser);
      setSuccessMessage('Faculty added successfully!');
      setFacultyDetails({
        name: '',
        email: '',
        department: '',
      });
    } catch (error) {
      console.error('Error during registration:', error);
      setError(error.message || 'Error adding faculty. Please try again later.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom className="page-title">
        Add New Faculty
      </Typography>
      {error && <FormHelperText error>{error}</FormHelperText>}
      {successMessage && <FormHelperText>{successMessage}</FormHelperText>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="User name"
              name="name"
              value={facultyDetails.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={facultyDetails.email}
              onChange={handleChange}
              type="email"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={facultyDetails.department}
              onChange={handleChange}
              select
              required
            >
              {departments.map((dept, index) => (
                <MenuItem key={index} value={dept}>
                  {dept}
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
              Add Faculty
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddNewFaculty;
