import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Grid,
} from '@mui/material';
import { fetchStudents } from '../../services/api'; // Import the function to fetch students
import './StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await fetchStudents();
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setError('Failed to load students. Please try again later.');
        setLoading(false);
      }
    };

    getStudents();
  }, []);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Loading Students...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom className="page-title">
        Student List
      </Typography>
      <List>
        {students.map((student) => (
          <ListItem key={student.id}>
            <ListItemText primary={`Name: ${student.username}`} secondary={`Email: ${student.email}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default StudentList;
