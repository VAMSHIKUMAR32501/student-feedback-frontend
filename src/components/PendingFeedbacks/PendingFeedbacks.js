import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Grid,
  Chip
} from '@mui/material';
import { Clock, AlertCircle } from 'lucide-react';

const PendingFeedbacks = () => {
  const [pendingFeedbacks] = useState([
    {
      id: 1,
      subject: 'Data Structures',
      faculty: 'Dr. Sarah Johnson',
      dueDate: '2024-03-25',
      status: 'Urgent',
      type: 'Course Feedback'
    },
    {
      id: 2,
      subject: 'Database Management',
      faculty: 'Prof. Michael Chen',
      dueDate: '2024-03-28',
      status: 'Pending',
      type: 'Faculty Feedback'
    },
    {
      id: 3,
      subject: 'Computer Networks',
      faculty: 'Dr. Robert Wilson',
      dueDate: '2024-03-30',
      status: 'Pending',
      type: 'Course Feedback'
    }
  ]);

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <Typography variant="h5" component="h2" className="font-bold">
          Pending Feedbacks
        </Typography>
        <Chip 
          icon={<AlertCircle className="h-4 w-4" />}
          label={`${pendingFeedbacks.length} Pending`}
          color="warning"
        />
      </div>

      <Grid container spacing={3}>
        {pendingFeedbacks.map((feedback) => (
          <Grid item xs={12} md={6} lg={4} key={feedback.id}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <Typography variant="h6" component="h3" className="font-semibold">
                    {feedback.subject}
                  </Typography>
                  <Chip 
                    label={feedback.status}
                    color={feedback.status === 'Urgent' ? 'error' : 'warning'}
                    size="small"
                  />
                </div>
                
                <Typography color="textSecondary" gutterBottom>
                  {feedback.faculty}
                </Typography>
                
                <div className="flex items-center mt-2 text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <Typography variant="body2">
                    Due: {new Date(feedback.dueDate).toLocaleDateString()}
                  </Typography>
                </div>

                <Chip 
                  label={feedback.type}
                  variant="outlined"
                  size="small"
                  className="mt-3"
                />

                <Button 
                  variant="contained" 
                  color="primary"
                  fullWidth
                  className="mt-4"
                >
                  Start Feedback
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PendingFeedbacks;