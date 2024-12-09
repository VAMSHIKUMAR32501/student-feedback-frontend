import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { GraduationCap, ClipboardList, BarChart } from 'lucide-react';

const DashboardContent = ({ studentData }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {/* Welcome Message */}
      <Typography variant="h4" gutterBottom>
        Welcome, {studentData.name}!
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        {studentData.branch} | {studentData.semester} Semester
      </Typography>

      {/* Quick Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card">
            <CardContent>
              <GraduationCap className="icon" />
              <Typography variant="h6" className="stat-value">
                {studentData.completedFeedbacks}
              </Typography>
              <Typography color="textSecondary">Completed Feedbacks</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card">
            <CardContent>
              <ClipboardList className="icon" />
              <Typography variant="h6" className="stat-value">
                {studentData.pendingFeedbacks}
              </Typography>
              <Typography color="textSecondary">Pending Feedbacks</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card">
            <CardContent>
              <BarChart className="icon" />
              <Typography variant="h6" className="stat-value">
                {studentData.gpa || 'N/A'}
              </Typography>
              <Typography color="textSecondary">Current GPA</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;
