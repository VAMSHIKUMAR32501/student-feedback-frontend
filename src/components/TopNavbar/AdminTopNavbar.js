import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminTopNavbar.css';

const TopNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="top-navbar">
      <div className="navbar-logo">Admin Dashboard</div>
      <div className="navbar-user">
        <span>Administrator</span>
        <i className="fa fa-user-circle" aria-hidden="true" onClick={handleProfileClick}></i>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={() => navigate('/admin-profile')}>Admin Profile</div>
            <div className="dropdown-item" onClick={handleLogout}>Logout</div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavbar;
