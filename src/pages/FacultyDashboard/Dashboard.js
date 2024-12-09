import React from 'react';
// import './Dashboard.css';

const StatisticBox = ({ label, value }) => (
  <div className="stat-box">
    <p>{label}</p>
    <h3>{value || 0}</h3> {/* Default to 0 if value is null or undefined */}
  </div>
);

const Dashboard = ({
  totalFaculties,
  totalStudents,
  totalClasses,
  academicYear,
  semester,
  evaluationStatus,
}) => {
  return (
    <div className="dashboard-container">
      <h2>Faculty Dashboard</h2>
      
      <section className="academic-info">
        <p><strong>Academic Year:</strong> {academicYear || 'N/A'}</p>
        <p><strong>Semester:</strong> {semester || 'N/A'}</p>
        <p><strong>Evaluation Status:</strong> {evaluationStatus || 'N/A'}</p>
      </section>
      
      <section className="statistics">
        <StatisticBox label="Total Faculties" value={totalFaculties} />
        <StatisticBox label="Total Students" value={totalStudents} />
        <StatisticBox label="Total Classes" value={totalClasses} />
      </section>
    </div>
  );
};

export default Dashboard;
