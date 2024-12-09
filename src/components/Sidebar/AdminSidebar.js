import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Divider, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Users,
  ClipboardList,
  School,
  FileText,
  UserCog,
  Calendar,
} from 'lucide-react';
import './AdminSidebar.css';

const Sidebar = () => {
  const [openFaculties, setOpenFaculties] = useState(false);
  const [openStudents, setOpenStudents] = useState(false);

  const handleFacultiesClick = () => {
    setOpenFaculties(!openFaculties);
    setOpenStudents(false); // Close Students section when Faculties is clicked
  };

  const handleStudentsClick = () => {
    setOpenStudents(!openStudents);
    setOpenFaculties(false); // Close Faculties section when Students is clicked
  };

  return (
    <div className="sidebar h-screen w-64 border-r bg-background p-4 shadow-sm">
      <h2 className="mb-2 px-4 text-lg font-semibold"></h2>
      <List component="nav">
        <ListItem button component={Link} to="/admin">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        
        <ListItem button component={Link} to="/admin/subjects">
          <BookOpen className="mr-2 h-4 w-4" />
          <ListItemText primary="Subjects" />
        </ListItem>
        
        <ListItem button component={Link} to="/admin/classes">
          <School className="mr-2 h-4 w-4" />
          <ListItemText primary="Classes" />
        </ListItem>
        
        <ListItem button component={Link} to="/admin/academic-year">
          <Calendar className="mr-2 h-4 w-4" />
          <ListItemText primary="Academic Year" />
        </ListItem>
        
        <ListItem button component={Link} to="/admin/questionnaires">
          <ClipboardList className="mr-2 h-4 w-4" />
          <ListItemText primary="Questionnaires" />
        </ListItem>
        
        <Divider />
        
        <ListItem button component={Link} to="/admin/evaluation-criteria">
          <FileText className="mr-2 h-4 w-4" />
          <ListItemText primary="Evaluation Criteria" />
        </ListItem>

        {/* Faculties Section with Expandable List */}
        <ListItem button onClick={handleFacultiesClick}>
          <Users className="mr-2 h-4 w-4" />
          <ListItemText primary="Faculties" />
          {openFaculties ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openFaculties} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/admin/faculties/add-new">
              <ListItemText inset primary="Add New" />
            </ListItem>
            {/* <ListItem button component={Link} to="/admin/faculties/list">
              <ListItemText inset primary="List" />
            </ListItem> */}
          </List>
        </Collapse>

        {/* Students Section with Expandable List */}
        <ListItem button onClick={handleStudentsClick}>
          <GraduationCap className="mr-2 h-4 w-4" />
          <ListItemText primary="Students" />
          {openStudents ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openStudents} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/admin/students/add-new">
              <ListItemText inset primary="Add New" />
            </ListItem>
            {/* <ListItem button component={Link} to="/admin/students/list">
              <ListItemText inset primary="List" />
            </ListItem> */}
          </List>
        </Collapse>

        <ListItem button component={Link} to="/admin/evaluation-reports">
          <FileText className="mr-2 h-4 w-4" />
          <ListItemText primary="Evaluation Reports" />
        </ListItem>
        
        <ListItem button component={Link} to="/admin/students">
          <UserCog className="mr-2 h-4 w-4" />
          <ListItemText primary="Users" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;

