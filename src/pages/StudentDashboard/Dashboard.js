import React from 'react';

const StatisticBox = ({ label, value }) => (
  <div className="stat-box">
    <p>{label}</p>
    <h3>{value || 0}</h3> {/* Default to 0 if value is null or undefined */}
  </div>
);

const Dashboard = ({
  totalFaculties,
  pendingFeedbacks,
  completedFeedbacks,
  branch,
  semester,
  studentName,
}) => {
  return (
    <div className="dashboard-container">
      <h2>Welcome, {studentName || 'Student'}!</h2>
      
      <section className="academic-info">
        <p><strong>Branch:</strong> {branch || 'N/A'}</p>
        <p><strong>Semester:</strong> {semester || 'N/A'}</p>
      </section>
      
      <section className="statistics">
        <StatisticBox label="Total Faculties" value={totalFaculties} />
        <StatisticBox label="Pending Feedbacks" value={pendingFeedbacks} />
        <StatisticBox label="Completed Feedbacks" value={completedFeedbacks} />
      </section>
    </div>
  );
};

export default Dashboard;
