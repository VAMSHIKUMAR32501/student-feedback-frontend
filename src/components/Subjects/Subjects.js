import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Subjects.css';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newSubject, setNewSubject] = useState({ courseCode: '', subjectName: '', description: '' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State to manage add modal visibility
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // State to manage update modal visibility
  const [currentSubjectId, setCurrentSubjectId] = useState(null); // To store the ID of the subject being updated
  const [courseCodeSuggestions, setCourseCodeSuggestions] = useState([]); // Store dropdown suggestions

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const response = await axios.get('https://feedback-system-backend32501.up.railway.app/api/subjects');
    setSubjects(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://feedback-system-backend32501.up.railway.app/api/subjects/${id}`);
    fetchSubjects(); // Refresh the subjects list
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddSubject = async () => {
    if (newSubject.courseCode && newSubject.subjectName) {
      await axios.post('https://feedback-system-backend32501.up.railway.app/api/subjects', newSubject);
      resetSubjectForm();
      fetchSubjects(); // Refresh the subjects list
      setIsAddModalOpen(false); // Close modal after adding
    }
  };

  const handleUpdateSubject = async () => {
    if (newSubject.courseCode && newSubject.subjectName) {
      await axios.put(`https://feedback-system-backend32501.up.railway.app/api/subjects/${currentSubjectId}`, newSubject);
      resetSubjectForm();
      fetchSubjects(); // Refresh the subjects list
      setIsUpdateModalOpen(false); // Close modal after updating
    }
  };

  const openUpdateModal = (subject) => {
    setCurrentSubjectId(subject.id);
    setNewSubject({
      courseCode: subject.courseCode,
      subjectName: subject.subjectName,
      description: subject.description,
    });
    setIsUpdateModalOpen(true);
  };

  const resetSubjectForm = () => {
    setNewSubject({ courseCode: '', subjectName: '', description: '' });
    setCourseCodeSuggestions([]);
    setCurrentSubjectId(null);
  };

  const handleCourseCodeChange = (e) => {
    const value = e.target.value;
    setNewSubject((prev) => ({ ...prev, courseCode: value }));

    // Filter suggestions
    const suggestions = subjects
      .map((subject) => subject.courseCode)
      .filter((code) => code.toLowerCase().includes(value.toLowerCase()));
    setCourseCodeSuggestions(suggestions);
  };

  const selectCourseCode = (code) => {
    setNewSubject((prev) => ({ ...prev, courseCode: code }));
    setCourseCodeSuggestions([]); // Hide suggestions after selection
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
        <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>+ Add New</button>
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
                <button className="update-btn" onClick={() => openUpdateModal(subject)}>Update</button>
                <button className="delete-btn" onClick={() => handleDelete(subject.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding a new subject */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Add New Subject</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Course Code"
                value={newSubject.courseCode}
                onChange={handleCourseCodeChange}
                className="modal-input"
              />
              {/* Dropdown suggestions */}
              {courseCodeSuggestions.length > 0 && (
                <ul className="dropdown-list">
                  {courseCodeSuggestions.map((code, index) => (
                    <li key={index} onClick={() => selectCourseCode(code)} className="dropdown-item">
                      {code}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <input
              type="text"
              placeholder="Subject Name"
              value={newSubject.subjectName}
              onChange={(e) => setNewSubject({ ...newSubject, subjectName: e.target.value })}
              className="modal-input"
            />
            <textarea
              placeholder="Description"
              value={newSubject.description}
              onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
              className="modal-input"
            />
            <div className="modal-buttons">
              <button onClick={handleAddSubject} className="save-btn">Save</button>
              <button onClick={() => { resetSubjectForm(); setIsAddModalOpen(false); }} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for updating an existing subject */}
      {isUpdateModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Update Subject</h2>
            <input
              type="text"
              placeholder="Course Code"
              value={newSubject.courseCode}
              onChange={handleCourseCodeChange}
              className="modal-input"
            />
            <input
              type="text"
              placeholder="Subject Name"
              value={newSubject.subjectName}
              onChange={(e) => setNewSubject({ ...newSubject, subjectName: e.target.value })}
              className="modal-input"
            />
            <textarea
              placeholder="Description"
              value={newSubject.description}
              onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
              className="modal-input"
            />
            <div className="modal-buttons">
              <button onClick={handleUpdateSubject} className="save-btn">Update</button>
              <button onClick={() => { resetSubjectForm(); setIsUpdateModalOpen(false); }} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subjects;
