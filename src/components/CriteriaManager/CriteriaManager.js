import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  fetchCriteria,
  addCriteria,
  updateCriteria,
  deleteCriteria,
  reorderCriteria,
} from '../../services/criteriaService';

const CriteriaManager = ({ setParentCriteriaList }) => {
  const [criteriaList, setCriteriaList] = useState([]); // Local criteria list
  const [criteria, setCriteria] = useState(''); // Input for adding/editing criteria
  const [editId, setEditId] = useState(null); // ID of the criteria being edited
  const [anchorEl, setAnchorEl] = useState(null); // Menu anchor element for dropdown
  const [selectedCriteriaId, setSelectedCriteriaId] = useState(null); // ID for menu actions
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const isMenuOpen = Boolean(anchorEl); // Menu open state

  // Fetch criteria from the backend when the component mounts
  useEffect(() => {
    const fetchAllCriteria = async () => {
      try {
        const data = await fetchCriteria(); // Fetch criteria from service
        setCriteriaList(data); // Update local state
        setParentCriteriaList(data); // Share criteria with parent
      } catch (error) {
        console.error('Error fetching criteria:', error);
      }
    };

    fetchAllCriteria();
  }, [setParentCriteriaList]); // Dependency ensures parent gets updates

  // Handle adding or updating criteria
  const handleAddOrEditCriteria = async () => {
    if (editId !== null) {
      try {
        const updatedCriterion = { text: criteria };
        await updateCriteria(editId, updatedCriterion);
        const updatedList = criteriaList.map((item) =>
          item.id === editId ? { ...item, text: criteria } : item
        );
        setCriteriaList(updatedList);
        setParentCriteriaList(updatedList); // Update parent state
        setSnackbarMessage('Criteria updated successfully!');
      } catch (error) {
        console.error('Error updating criterion:', error);
        setSnackbarMessage('Error updating criterion.');
      }
    } else {
      try {
        const newCriterion = { text: criteria };
        const addedCriterion = await addCriteria(newCriterion);
        const updatedList = [...criteriaList, addedCriterion];
        setCriteriaList(updatedList);
        setParentCriteriaList(updatedList); // Update parent state
        setSnackbarMessage('Criteria added successfully!');
      } catch (error) {
        console.error('Error adding criterion:', error);
        setSnackbarMessage('Error adding criterion.');
      }
    }

    setCriteria('');
    setEditId(null);
    setSnackbarOpen(true);
  };

  // Handle editing of criteria
  const handleEdit = (id) => {
    const criterionToEdit = criteriaList.find((item) => item.id === id);
    setCriteria(criterionToEdit.text);
    setEditId(id);
    setAnchorEl(null);
  };

  // Handle deletion of criteria
  const handleDelete = async (id) => {
    try {
      await deleteCriteria(id);
      const updatedList = criteriaList.filter((item) => item.id !== id);
      setCriteriaList(updatedList);
      setParentCriteriaList(updatedList); // Update parent state
      setSnackbarMessage('Criteria deleted successfully!');
    } catch (error) {
      console.error('Error deleting criterion:', error);
      setSnackbarMessage('Error deleting criterion.');
    }
    setAnchorEl(null);
    setSnackbarOpen(true);
  };

  // Open options menu
  const handleOpenMenu = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedCriteriaId(id);
  };

  // Close options menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedCriteriaId(null);
  };

  // Handle drag-and-drop reordering
  const handleDragEnd = async (result) => {
    if (!result.destination) return;
  
    const reorderedList = Array.from(criteriaList);
    const [removed] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, removed);
  
    const originalList = [...criteriaList]; // Save original state
    setCriteriaList(reorderedList); // Optimistic UI update
  
    try {
      await reorderCriteria(reorderedList);
      setParentCriteriaList(reorderedList); // Update parent state
      setSnackbarMessage('Criteria reordered successfully!');
    } catch (error) {
      console.error('Error reordering criteria:', error);
      setCriteriaList(originalList); // Revert to original state on error
      setSnackbarMessage('Error reordering criteria.');
    }
    setSnackbarOpen(true);
  };
  

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Criteria Manager
      </Typography>

      {/* Criteria Form */}
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Criteria Form
        </Typography>
        <TextField
          fullWidth
          label="Criteria"
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddOrEditCriteria}
            disabled={!criteria.trim()}
          >
            {editId !== null ? 'Update' : 'Save'}
          </Button>
          {editId !== null && (
            <Button
              variant="outlined"
              color="secondary"
              sx={{ marginLeft: 1 }}
              onClick={() => {
                setCriteria('');
                setEditId(null);
              }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Paper>

      {/* Criteria List */}
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>
          Criteria List
        </Typography>
        {criteriaList.length > 0 ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="criteria-list">
              {(provided) => (
                <List
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                >
                  {criteriaList.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: 1,
                          border: '1px solid #ccc',
                          borderRadius: 1,
                          marginBottom: 1,
                        }}
                      >
                        <Box {...provided.dragHandleProps} sx={{ cursor: 'grab' }}>
                          <Typography variant="body1">{item.text}</Typography>
                        </Box>
                        <IconButton onClick={(e) => handleOpenMenu(e, item.id)}>
                          <MoreVertIcon />
                        </IconButton>
                      </ListItem>
                      
                            
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No criteria available. Add one to get started.
          </Typography>
        )}
      </Paper>

      {/* Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleEdit(selectedCriteriaId)}>Edit</MenuItem>
        <MenuItem onClick={() => handleDelete(selectedCriteriaId)}>
          Delete
        </MenuItem>
      </Menu>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CriteriaManager;
