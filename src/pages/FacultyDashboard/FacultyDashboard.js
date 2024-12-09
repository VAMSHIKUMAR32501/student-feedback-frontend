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
import FacultySidebar from '../../components/Sidebar/FacultySidebar';
import Dashboard from './Dashboard';
import { fetchDashboardData } from '../../services/admindashbord'; // Assuming an API for faculty data
import FeedbackAnalytics from '../../components/FeedbackAnalytics/FeedbackAnalytics';
import ManageCriteria from '../../components/ManageCriteria/ManageCriteria';
import ManageQuestionnaire from '../../components/ManageQuestionnaire/ManageQuestionnaire';
import StudentList from '../../components/StudentList/StudentList';
import FeedBack from '../../components/FeedBack/FeedBack';
import CriteriaManager from '../../components/CriteriaManager/CriteriaManager';
import ManageRestriction from '../../components/ManageRestriction/ManageRestriction';
import AddNewStudent from '../../components/AddNewStudent/AddNewStudent';
import { CriteriaProvider } from '../../context/CriteriaContext';
import './FacultyDashboard.css';
import ViewFeedback from '../../components/ViewFeedback/ViewFeedback';

const FacultyDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalFaculties: 0,
    totalStudents: 0,
    totalClasses: 0,
    academicYear: '',
    semester: '',
    evaluationStatus: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [criteriaList, setCriteriaList] = useState([]);
  const navigate = useNavigate();

  // Fetch dashboard data
  const getDashboardData = async () => {
    try {
      const data = await fetchDashboardData(); 
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
    const intervalId = setInterval(getDashboardData, 60000); // Auto-refresh every 60 seconds
    return () => clearInterval(intervalId);
  }, []);

  // Menu handlers
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleMenuClose();
    navigate('/');
  };

  // Add new criteria to the list
  const addCriteria = (newCriteria) => {
    setCriteriaList((prevList) => [...prevList, newCriteria]);
  };

  // Add question to the selected criteria
  const addQuestionToCriteria = (criteriaName, question) => {
    setCriteriaList((prevList) =>
      prevList.map((criteria) =>
        criteria.text === criteriaName
          ? { ...criteria, questions: [...(criteria.questions || []), question] }
          : criteria
      )
    );
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
    <CriteriaProvider>
      <div>
        <CssBaseline />

        {/* Top AppBar */}
        <AppBar position="fixed" className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Toolbar className="flex justify-between px-6">
            <div className="flex" style={{ flex: 1 }}>
              <Link to="/faculty" className="faculty-title">
                Faculty Page
              </Link>
            </div>
            <div className="flex justify-center" style={{ flex: 2 }}>
              <Link to="/faculty" className="feedback-title">
                Student Feedback System
              </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              <IconButton onClick={handleMenuOpen} color="inherit">
                <div className="relative h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                  <span>FW</span>
                </div>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={() => navigate('/faculty/profile')}>
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
          <FacultySidebar />
          <div className="main-content" style={{ flexGrow: 1, padding: '20px' }}>
            <Routes>
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  totalFaculties={dashboardData.totalFaculties}
                  totalStudents={dashboardData.totalStudents}
                  totalClasses={dashboardData.totalClasses}
                  academicYear={dashboardData.academicYear}
                  semester={dashboardData.semester}
                  evaluationStatus={dashboardData.evaluationStatus}
                />
              }
            />
      
              <Route path="feedback-analytics" element={<FeedbackAnalytics />} />
              <Route path="/manage-questionnaire" element={<ManageQuestionnaire criteriaList={criteriaList} addQuestionToCriteria={addQuestionToCriteria} />} />
              <Route path="/manage-criteria" element={<ManageCriteria criteriaList={criteriaList} addCriteria={addCriteria} />} />
              <Route path="/evaluation-criteria" element={<CriteriaManager setParentCriteriaList={setCriteriaList} />} />
              <Route path="/evaluation-restriction" element={<ManageRestriction />} />
              <Route path="list-students" element={<StudentList />} />
              <Route path="add-student" element={<AddNewStudent />} />
              <Route path="evaluation-reports" element={<ViewFeedback />} />
              <Route path="*" element={<Navigate to="dashboard" />} />
            </Routes>
          </div>
        </div>
      </div>
    </CriteriaProvider>
  );
};

export default FacultyDashboard;
