import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import FeedbackPage from './pages/FeedbackPage/FeedbackPage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AdminLogin from './components/AdminLogin/AdminLogin';
import StudentLogin from './components/StudentLogin/StudentLogin';
import Home from './pages/Home';
import './styles.css';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import AdminForgotPassword from './components/AdminForgotPassword/AdminForgotPassword';
import FacultyDashboard from './pages/FacultyDashboard/FacultyDashboard';
import FacultyLogin from './components/FacultyLogin/FacultyLogin';
import FacultyForgotPassword from './components/FacultyForgotPassword/FacultyForgotPassword';

const App = () => {
  return (
    <Router basename="/student-feedback-frontend"> {/* Set the basename for GitHub Pages */}
       {/* Render the Header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} /> {/* Route for admin dashboard */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin-forgot-password" element={<AdminForgotPassword />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/faculty-forgot-password" element={<FacultyForgotPassword />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect all unknown routes to Home */}
      </Routes>
      <Footer /> {/* Render the Footer */}
    </Router>
  );
};

export default App;
