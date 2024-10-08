import React from 'react';
import './Header.css';

const Header = ({ userRole }) => {
  return (
    <header className="header">
      <h1>Student Feedback System</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>

          {/* Conditionally render Admin Dashboard link */}
          {userRole === 'admin' && (
            <li><a href="/admin">Admin Dashboard</a></li>
          )}

          {/* Conditionally render Student Dashboard link */}
          {userRole === 'student' && (
            <li><a href="/student">Student Dashboard</a></li>
          )}
          
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
