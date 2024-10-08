import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const totalFaculties = 10;
  const totalStudents = 200;
  const totalUsers = 215;
  const totalClasses = 20;
  const academicYear = "2021-2022";
  const semester = "1st Semester";
  const evaluationStatus = "On-going";

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="academic-info">
        <p>Academic Year: {academicYear}</p>
        <p>Semester: {semester}</p>
        <p>Evaluation Status: {evaluationStatus}</p>
      </div>
      <div className="statistics">
        <div className="stat-box">
          <p>Total Faculties</p>
          <h3>{totalFaculties}</h3>
        </div>
        <div className="stat-box">
          <p>Total Students</p>
          <h3>{totalStudents}</h3>
        </div>
        <div className="stat-box">
          <p>Total Users</p>
          <h3>{totalUsers}</h3>
        </div>
        <div className="stat-box">
          <p>Total Classes</p>
          <h3>{totalClasses}</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
