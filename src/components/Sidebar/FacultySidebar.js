import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemText, Divider, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  GraduationCap,
  BarChart,
} from 'lucide-react';
import './FacultySidebar.css';

const FacultySidebar = () => {
  const [openStudents, setOpenStudents] = useState(false);

  const handleStudentsClick = () => {
    setOpenStudents((prevOpen) => !prevOpen);
  };

  return (
    <div className="sidebar h-screen w-64 border-r bg-background p-4 shadow-sm">
      {/* Sidebar Title */}
      <div className="sidebar-title p-4 text-center font-bold text-xl text-primary">
        Faculty Dashboard
      </div>
      <Divider />

      <List component="nav">
        {/* Dashboard */}
        <NavLink to="/faculty/dashboard" className="sidebar-link">
          <ListItem button>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>
        <Divider />

        {/* Manage Questionnaire */}
        <NavLink to="/faculty/manage-questionnaire" className="sidebar-link">
          <ListItem button>
            <ClipboardList className="mr-2 h-4 w-4" />
            <ListItemText primary="Manage Questionnaire" />
          </ListItem>
        </NavLink>

        {/* Criteria Manager */}
        <NavLink to="/faculty/evaluation-criteria" className="sidebar-link">
          <ListItem button>
            <FileText className="mr-2 h-4 w-4" />
            <ListItemText primary="Criteria Manager" />
          </ListItem>
        </NavLink>
        <Divider />
        

        {/* Students Section with Expandable List */}
        <ListItem button onClick={handleStudentsClick}>
          <GraduationCap className="mr-2 h-4 w-4" />
          <ListItemText primary="Students" />
          {openStudents ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openStudents} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavLink to="/faculty/add-student" className="sidebar-link">
              <ListItem button style={{ paddingLeft: '32px' }}>
                <ListItemText primary="Add Student" />
              </ListItem>
            </NavLink>
            {/* <NavLink to="/faculty/list-students" className="sidebar-link">
              <ListItem button style={{ paddingLeft: '32px' }}>
                <ListItemText primary="List Students" />
              </ListItem>
            </NavLink> */}
          </List>
        </Collapse>
        <Divider />

        {/* Evaluation Reports */}
        <NavLink to="/faculty/evaluation-reports" className="sidebar-link">
          <ListItem button>
            <BarChart className="mr-2 h-4 w-4" />
            <ListItemText primary="Evaluation Reports" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
};

export default FacultySidebar;
