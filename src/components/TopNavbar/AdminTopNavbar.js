import React from 'react';
import './AdminTopNavbar.css';

const TopNavbar = () => {
  return (
    <nav className="top-navbar">
      <div className="navbar-logo">Faculty Evaluation System</div>
      <div className="navbar-user">
        <span>Administrator</span>
        <i className="fa fa-user-circle" aria-hidden="true"></i>
      </div>
    </nav>
  );
};

export default TopNavbar;
