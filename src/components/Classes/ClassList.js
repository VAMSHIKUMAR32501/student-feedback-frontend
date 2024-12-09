import React, { useState, useEffect } from 'react';
import { fetchClasses, addClass, deleteClass, updateClass } from '../../services/classService';
import './ClassList.css';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [editingClass, setEditingClass] = useState(null); // State for the class being edited

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const classData = await fetchClasses();
        setClasses(classData);
      } catch (error) {
        console.error("Failed to fetch classes", error);
      }
    };

    loadClasses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteClass(id);
      setClasses(classes.filter(c => c.id !== id));
    } catch (error) {
      console.error("Failed to delete class", error);
    }
  };

  const handleAddNewClass = async () => {
    if (!newClassName.trim()) {
      alert("Class name cannot be empty.");
      return;
    }

    const newClass = { className: newClassName };
    try {
      const addedClass = await addClass(newClass);
      console.log("Added Class:", addedClass);
      if (addedClass && addedClass.className) {
        setClasses([...classes, addedClass]);
        setNewClassName("");
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to add new class", error);
    }
  };

  const handleUpdateClass = async () => {
    if (!editingClass) return;

    const updatedClass = { className: newClassName }; // Create object with updated data
    try {
      const updatedData = await updateClass(editingClass.id, updatedClass);
      setClasses(classes.map(c => (c.id === updatedData.id ? updatedData : c)));
      setIsEditModalOpen(false);
      setNewClassName(""); // Reset input field
    } catch (error) {
      console.error("Failed to update class", error);
    }
  };

  const openEditModal = (classItem) => {
    setEditingClass(classItem); // Set the class to be edited
    setNewClassName(classItem.className); // Set the name in input
    setIsEditModalOpen(true); // Open edit modal
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="class-list">
      <div className="class-list-header">
        <input 
          type="text"
          placeholder="Search classes..." 
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>+ Add New</button>
      </div>

      <table className="class-list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Class</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {classes.filter(c => c.className.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((c, index) => (
              <tr key={c.id}>
                <td>{index + 1}</td>
                <td>{c.className}</td>
                <td>
                  <button className="update-btn" onClick={() => openEditModal(c)}>Update</button>
                  <button className="delete-btn" onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding a new class */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Add New Class</h2>
            <input 
              type="text"
              placeholder="Enter class name" 
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              className="modal-input"
            />
            <div className="modal-buttons">
              <button onClick={handleAddNewClass} className="save-btn">Save</button>
              <button onClick={() => setIsAddModalOpen(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for editing a class */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Edit Class</h2>
            <input 
              type="text"
              placeholder="Enter class name" 
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              className="modal-input"
            />
            <div className="modal-buttons">
              <button onClick={handleUpdateClass} className="save-btn">Update</button>
              <button onClick={() => setIsEditModalOpen(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassList;
