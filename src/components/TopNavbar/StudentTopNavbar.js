// src/components/TopNavbar/StudentTopNavbar.js
import React from 'react';
import './StudentTopNavbar.css'; // Add your styles here

const StudentTopNavbar = () => {
  return (
    <nav className="top-navbar">
      <div className="navbar-logo">Student Dashboard</div>
      <div className="navbar-user">
        <span>Student Profile</span> {/* Replace with dynamic user name if needed */}
        <i className="fa fa-user-circle" aria-hidden="true"></i>
      </div>
    </nav>
  );
};

export default StudentTopNavbar;
