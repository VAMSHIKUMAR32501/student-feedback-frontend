import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip
} from '@mui/material';
import { BarChart2, BookOpen, Users, Award } from 'lucide-react';
import './AcademicProgress.css'; // Import the CSS file

const AcademicProgress = () => {
  const progressData = {
    completedFeedbacks: 85,
    courseProgress: 75,
    attendance: 92,
    overallPerformance: 88
  };

  const recentFeedbacks = [
    { subject: 'Data Structures', score: 4.5 },
    { subject: 'Database Management', score: 4.8 },
    { subject: 'Computer Networks', score: 4.2 }
  ];

  return (
    <div className="academic-progress-container">
      <Typography variant="h5" component="h2" className="academic-progress-title">
        Academic Progress
      </Typography>

      <Grid container spacing={3}>
        {/* Progress Metrics */}
        <Grid item xs={12}>
          <Card className="progress-card">
            <CardContent>
              <Grid container spacing={4}>
                {[
                  { 
                    label: 'Feedback Completion', 
                    value: progressData.completedFeedbacks,
                    icon: BarChart2,
                    color: 'primary' 
                  },
                  { 
                    label: 'Course Progress', 
                    value: progressData.courseProgress,
                    icon: BookOpen,
                    color: 'secondary' 
                  },
                  { 
                    label: 'Attendance', 
                    value: progressData.attendance,
                    icon: Users,
                    color: 'success' 
                  },
                  { 
                    label: 'Overall Performance', 
                    value: progressData.overallPerformance,
                    icon: Award,
                    color: 'info' 
                  }
                ].map((metric, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <div className="metric-container">
                      <metric.icon className={`metric-icon h-8 w-8 mx-auto mb-2 text-${metric.color}-500`} />
                      <Typography variant="h6" className="metric-label">
                        {metric.label}
                      </Typography>
                      <Typography variant="h4" className="metric-value">
                        {metric.value}%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={metric.value} 
                        color={metric.color}
                        className="progress-bar"
                      />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Feedback Scores */}
        <Grid item xs={12}>
          <Card className="progress-card">
            <CardContent>
              <Typography variant="h6" className="recent-feedback-title">
                Recent Feedback Scores
              </Typography>
              <div>
                {recentFeedbacks.map((feedback, index) => (
                  <div key={index} className="feedback-item">
                    <Typography variant="body1" className="feedback-subject">
                      {feedback.subject}
                    </Typography>
                    <Chip 
                      label={`${feedback.score}/5`}
                      color={feedback.score >= 4.5 ? 'success' : 'primary'}
                      variant="outlined"
                      className="feedback-score"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AcademicProgress;
