import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { fetchEvaluationReports } from '../services/api'; // Assuming you have an API function for fetching reports

const EvaluationReports = ({ userType }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReports = async () => {
      try {
        const fetchedReports = await fetchEvaluationReports(userType); // Pass user type to filter reports
        setReports(fetchedReports);
      } catch (error) {
        setError('Failed to load evaluation reports.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getReports();
  }, [userType]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Evaluation Reports
      </Typography>
      <List>
        {reports.map((report, index) => (
          <ListItem key={index}>
            <ListItemText primary={`Report: ${report.title}`} secondary={`Date: ${report.date}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default EvaluationReports;
