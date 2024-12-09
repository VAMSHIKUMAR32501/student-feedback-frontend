import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from './components/Footer/Footer';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AdminLogin from './components/AdminLogin/AdminLogin';
import StudentLogin from './components/StudentLogin/StudentLogin';
import Home from './pages/Home';
import './styles.css';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import AdminForgotPassword from './components/ForgotPassword/AdminForgotPassword';
import FacultyDashboard from './pages/FacultyDashboard/FacultyDashboard';
import FacultyLogin from './components/FacultyLogin/FacultyLogin';
import FacultyForgotPassword from './components/ForgotPassword/FacultyForgotPassword';
import StudentForgotPassword from './components/ForgotPassword/StudentForgotPassword';

import Evaluate from './components/Evaluate/Evaluate'; // Adjust the path as necessary

import AcademicProgress from './components/AcademicProgress/AcademicProgress';
import Contact from './components/Contact/Contact';
const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Create a theme object
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
        secondary: darkMode ? '#b0b0b0' : '#666666',
      },
    },
  });

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router basename="/student-feedback-frontend"> {/* Set the basename for GitHub Pages */}
        <Routes>
          <Route path="/" element={<Home toggleDarkMode={toggleDarkMode} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/admin-login" element={<AdminLogin />} />
          {/* <Route path="/academic-process" element={<AcademicProgress />} /> */}
          <Route path="/student/academic-process" element={<AcademicProgress />} />
          <Route path="/student/evaluate" element={Evaluate} />


          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/student/*" element={<StudentDashboard />} />
          <Route path="/faculty/*" element={<FacultyDashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin-forgot-password" element={<AdminForgotPassword />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/faculty-forgot-password" element={<FacultyForgotPassword />} />
          <Route path="/student-forgot-password" element={<StudentForgotPassword />} />
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
        <Footer /> 
      </Router>
    </ThemeProvider>
  );
};

export default App;
