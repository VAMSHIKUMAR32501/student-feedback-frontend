// src/components/Sidebar/StudentSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './StudentSidebar.css'; // Add your styles here

const StudentSidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/student/dashboard">Dashboard</Link></li>
        <li><Link to="/student/evaluate">Evaluate/Submit Feedback</Link></li>
        <li><Link to="/student/view-feedback">View Feedback</Link></li>
        <li><Link to="/student/profile">My Profile</Link></li>
      </ul>
    </div>
  );
};

export default StudentSidebar;
