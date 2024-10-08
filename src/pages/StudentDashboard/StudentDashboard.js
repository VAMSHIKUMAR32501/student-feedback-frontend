// src/pages/StudentDashboard/StudentDashboard.js
import React from 'react';
import TopNavbar from '../../components/TopNavbar/StudentTopNavbar'; // Create this component
import Sidebar from '../../components/Sidebar/StudentSidebar'; // Create this component
// import Dashboard from './Dashboard'; // Create a Dashboard component for student view
import './StudentDashboard.css';

const StudentDashboard = () => {
  return (
    <div>
      <TopNavbar />
      <Sidebar />
      <div className="main-content">
      <h2>Welcome to Your Dashboard!</h2> {/* This can show the student's dashboard overview */}
      </div>
    </div>
  );
};

export default StudentDashboard;
