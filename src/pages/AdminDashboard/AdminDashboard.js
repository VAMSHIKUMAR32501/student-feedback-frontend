// src/pages/AdminDashboard/AdminDashboard.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopNavbar from '../../components/TopNavbar/AdminTopNavbar';
import Sidebar from '../../components/Sidebar/AdminSidebar';
import Subjects from '../../components/Subjects/Subjects';
import AcademicYear from '../../components/AcademicYear/AcademicYear';
import ClassList from '../../components/Classes/ClassList';
import Questionnaires from '../../components/Questionnaires/Questionnaires'; // Import Questionnaires component
import Dashboard from './Dashboard'; 
import './AdminDashboard.css';

const AdminDashboard = () => {
  const totalFaculties = 10;
  const totalStudents = 200;
  const totalUsers = 215;
  const totalClasses = 20;
  const academicYear = "2021-2022";
  const semester = "1st Semester";
  const evaluationStatus = "On-going";

  return (
    <div>
      <TopNavbar />
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard totalFaculties={totalFaculties} totalStudents={totalStudents} totalUsers={totalUsers} totalClasses={totalClasses} academicYear={academicYear} semester={semester} evaluationStatus={evaluationStatus} />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/academic-year" element={<AcademicYear />} />
          <Route path="/classes" element={<ClassList />} />
          <Route path="/questionnaires" element={<Questionnaires />} /> {/* Add route for Questionnaires */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
