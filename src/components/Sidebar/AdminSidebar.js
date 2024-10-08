import React from 'react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/admin">Dashboard</Link></li> {/* Link to the admin dashboard */}
        <li><Link to="/admin/subjects">Subjects</Link></li> {/* Updated link for subjects */}
        <li><Link to="/admin/classes">Classes</Link></li>
        <li><Link to="/admin/academic-year">Academic Year</Link></li>
        <li><Link to="/admin/questionnaires">Questionnaires</Link></li>
        <li><Link to="/evaluation-criteria">Evaluation Criteria</Link></li>
        <li><Link to="/faculties">Faculties</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/evaluation-reports">Evaluation Reports</Link></li>
        <li><Link to="/users">Users</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
