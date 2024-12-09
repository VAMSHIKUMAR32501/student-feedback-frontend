import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid,
  Chip,
  IconButton
} from '@mui/material';
import { CheckCircle, Eye } from 'lucide-react';

const CompletedFeedbacks = () => {
  const [completedFeedbacks] = useState([
    {
      id: 1,
      subject: 'Operating Systems',
      faculty: 'Dr. Emily Brown',
      submittedDate: '2024-02-15',
      rating: 4.5,
      type: 'Course Feedback'
    },
    {
      id: 2,
      subject: 'Software Engineering',
      faculty: 'Prof. David Miller',
      submittedDate: '2024-02-10',
      rating: 4.8,
      type: 'Faculty Feedback'
    },
    {
      id: 3,
      subject: 'Web Development',
      faculty: 'Dr. Lisa Wang',
      submittedDate: '2024-02-05',
      rating: 4.2,
      type: 'Course Feedback'
    }
  ]);

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <Typography variant="h5" component="h2" className="font-bold">
          Completed Feedbacks
        </Typography>
        <Chip 
          icon={<CheckCircle className="h-4 w-4" />}
          label={`${completedFeedbacks.length} Completed`}
          color="success"
        />
      </div>

      <Grid container spacing={3}>
        {completedFeedbacks.map((feedback) => (
          <Grid item xs={12} md={6} lg={4} key={feedback.id}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <Typography variant="h6" component="h3" className="font-semibold">
                    {feedback.subject}
                  </Typography>
                  <IconButton size="small" color="primary">
                    <Eye className="h-5 w-5" />
                  </IconButton>
                </div>
                
                <Typography color="textSecondary" gutterBottom>
                  {feedback.faculty}
                </Typography>
                
                <div className="flex items-center mt-2 text-gray-600">
                  <Typography variant="body2">
                    Submitted: {new Date(feedback.submittedDate).toLocaleDateString()}
                  </Typography>
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <Chip 
                    label={feedback.type}
                    variant="outlined"
                    size="small"
                  />
                  <Chip 
                    label={`Rating: ${feedback.rating}/5`}
                    color="primary"
                    size="small"
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CompletedFeedbacks;