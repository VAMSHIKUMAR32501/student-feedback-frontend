import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Container,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Typography,
} from '@mui/material';
import { LogOut, User } from 'lucide-react';
import StudentSidebar from '../../components/Sidebar/StudentSidebar';
import { fetchDashboardData } from '../../services/admindashbord';
import PendingFeedbacks from '../../components/PendingFeedbacks/PendingFeedbacks';
import CompletedFeedbacks from '../../components/CompletedFeedbacks/CompletedFeedbacks';
import FeedbackForm from '../../components/FeedbackForm/FeedbackForm';
import AcademicProgress from '../../components/AcademicProgress/AcademicProgress';
import FeedbackAnalytics from '../../components/FeedbackAnalytics/FeedbackAnalytics';
import ViewFeedback from '../../components/ViewFeedback/ViewFeedback';
import './StudentDashboard.css';
import Dashboard from './Dashboard';
const StudentDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalFaculties: 0,
    totalPendingFeedbacks: 0,
    totalCompletedFeedbacks: 0,
    semester: '',
    branch: '',
    studentName: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Fetch dashboard data
  const getDashboardData = async () => {
    try {
      // Simulated API response
      const data = {
        totalPendingFeedbacks: 3,
        totalCompletedFeedbacks: 12,
        semester: '4th',
        branch: 'Computer Science',
        studentName: 'John Doe',
      };
      setDashboardData(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  // Menu handlers
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleMenuClose();
    navigate('/');
  };

  // Loading state
  if (loading) {
    return (
      <Container className="loading-container">
        <CssBaseline />
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Loading Dashboard...
        </Typography>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="error-container">
        <CssBaseline />
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <div>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar position="fixed" className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Toolbar className="flex justify-between px-6">
          <div className="flex" style={{ flex: 1 }}>
            <Link to="/student" className="student-title">
              Student Page
            </Link>
          </div>
          <div className="flex justify-center" style={{ flex: 2 }}>
            <Link to="/student" className="feedback-title">
              Student Feedback System
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <div className="relative h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                <span>{dashboardData.studentName.split(' ').map((n) => n[0]).join('')}</span>
              </div>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={() => navigate('/student/profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Sidebar and Main Content */}
      <div style={{ display: 'flex', marginTop: '64px' }}>
        <StudentSidebar />
        <div className="main-content" style={{ flexGrow: 1, padding: '20px' }}>
          <Routes>
          <Route
              path="dashboard"
              element={
                <Dashboard
                  totalFaculties={dashboardData.totalFaculties}
                  pendingFeedbacks={dashboardData.totalPendingFeedbacks}
                  completedFeedbacks={dashboardData.totalCompletedFeedbacks}
                  branch={dashboardData.branch}
                  semester={dashboardData.semester}
                  studentName={dashboardData.studentName}
                />
              }
            />

            <Route path="pending-feedbacks" element={<PendingFeedbacks />} />
            <Route path="completed-feedbacks" element={<CompletedFeedbacks />} />
            <Route path="give-feedback" element={<FeedbackForm />} />
            <Route path="view-feedback" element={<ViewFeedback />} />
            <Route path="academic-progress" element={<AcademicProgress />} />
            <Route path="feedback-analytics" element={<FeedbackAnalytics />} />
            <Route path="*" element={<Navigate to="dashboard" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
