import React, { useState } from 'react';
import './Subjects.css';

const Subjects = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, courseCode: "CS101", subjectName: "Introduction to Computer Science", description: "Basic CS concepts" },
    { id: 2, courseCode: "JS201", subjectName: "Advanced JavaScript", description: "Deep dive into JavaScript" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    const updatedSubjects = subjects.filter(subject => subject.id !== id);
    setSubjects(updatedSubjects);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="subjects-header">
        <input 
          type="text"
          placeholder="Search subjects..." 
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="add-btn">+ Add New</button>
      </div>

      <table className="subjects-table">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Subject Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.filter(subject => 
            subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subject.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((subject) => (
            <tr key={subject.id}>
              <td>{subject.courseCode}</td>
              <td>{subject.subjectName}</td>
              <td>{subject.description}</td>
              <td>
                <button className="update-btn">Update</button>
                <button className="delete-btn" onClick={() => handleDelete(subject.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subjects;
