import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemText, Divider, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Settings,
  BarChart,
} from 'lucide-react';
import './StudentSidebar.css';

const StudentSidebar = () => {
  const [openFeedback, setOpenFeedback] = useState(false);

  const handleFeedbackClick = () => {
    setOpenFeedback((prevOpen) => !prevOpen);
  };

  return (
    <div className="sidebar h-screen w-64 border-r bg-background p-4 shadow-sm">
      {/* Sidebar Title */}
      <div className="sidebar-title p-4 text-center font-bold text-xl text-primary">
        Student Dashboard
      </div>
      <Divider />

      <List component="nav">
        {/* Dashboard */}
        <NavLink to="/student/dashboard" className="sidebar-link">
          <ListItem button>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>
        <Divider />

        {/* Feedback Section with Expandable List */}
        <ListItem button onClick={handleFeedbackClick}>
          <MessageSquare className="mr-2 h-4 w-4" />
          <ListItemText primary="Feedback" />
          {openFeedback ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openFeedback} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavLink to="/student/give-feedback" className="sidebar-link">
              <ListItem button style={{ paddingLeft: '32px' }}>
                <ListItemText primary="Give Feedback" />
              </ListItem>
            </NavLink>
            <NavLink to="/student/view-feedback" className="sidebar-link">
              <ListItem button style={{ paddingLeft: '32px' }}>
                <ListItemText primary="View Feedback" />
              </ListItem>
            </NavLink>
            
          </List>
        </Collapse>
        <Divider />

        {/* Academic Process */}
        <NavLink to="/student/academic-process" className="sidebar-link">
          <ListItem button>
            <FileText className="mr-2 h-4 w-4" />
            <ListItemText primary="Academic Process" />
          </ListItem>
        </NavLink>
        <Divider />

        
        <Divider />

        {/* Settings */}
        <NavLink to="/student/settings" className="sidebar-link">
          <ListItem button>
            <Settings className="mr-2 h-4 w-4" />
            <ListItemText primary="Settings" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
};

export default StudentSidebar;
