// src/components/Classes/ClassList.js
import React, { useState } from 'react';
import './ClassList.css';

const ClassList = () => {
  const [classes, setClasses] = useState([
    { id: 1, className: "DSA 1-A" },
    { id: 2, className: "JAVA FULL STACK 1-B" },
    { id: 3, className: "DATA SCIENCE 1-C" },
    { id: 4, className: "ENTERPRICE PROGRAMMING 2-A" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    const updatedClasses = classes.filter(c => c.id !== id);
    setClasses(updatedClasses);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddNewClass = () => {
    const newClass = { id: classes.length + 1, className: `New Class ${classes.length + 1}` };
    setClasses([...classes, newClass]);
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
        <button className="add-btn" onClick={handleAddNewClass}>+ Add New</button>
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
                  <button className="update-btn">Update</button>
                  <button className="delete-btn" onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassList;
