// src/components/Dashboard/FacultyDashboard.js
import React, { useState } from 'react';
import './FacultyDashboard.css';

const FacultyDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  
  // Mock faculty data for demonstration
  const facultyProfile = {
    name: "Dr. Jane Smith",
    facultyId: "F98765",
    email: "janesmith@example.com",
    coursesTeaching: ["React Development", "JavaScript Fundamentals"]
  };

  return (
    <div className="faculty-dashboard">
      <h2>Faculty Dashboard</h2>

      {/* Faculty Profile Section */}
      <div className="faculty-profile">
        <h3>Faculty Profile</h3>
        <p><strong>Name:</strong> {facultyProfile.name}</p>
        <p><strong>Faculty ID:</strong> {facultyProfile.facultyId}</p>
        <p><strong>Email:</strong> {facultyProfile.email}</p>
        <p><strong>Courses Teaching:</strong> {facultyProfile.coursesTeaching.join(', ')}</p>
      </div>

      {/* Feedback List */}
      <div>
        <h3>Student Feedbacks</h3>
        {/* You can add a component here to display feedback related to this faculty */}
      </div>
    </div>
  );
};

export default FacultyDashboard;
