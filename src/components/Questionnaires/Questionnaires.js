// src/components/Questionnaires/Questionnaires.js
import React, { useState } from 'react';
import './Questionnaires.css';

const Questionnaires = () => {
  const [questionnaires, setQuestionnaires] = useState([
    { id: 1, academicYear: "2021-2022", semester: 1, questions: 3, answered: 2 },
    { id: 2, academicYear: "2020-2021", semester: 1, questions: 3, answered: 3 },
    { id: 3, academicYear: "2019-2020", semester: 2, questions: 0, answered: 0 },
    { id: 4, academicYear: "2019-2020", semester: 1, questions: 0, answered: 0 }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddNewQuestionnaire = () => {
    const newQuestionnaire = {
      id: questionnaires.length + 1,
      academicYear: `New Year ${questionnaires.length + 1}`,
      semester: 1,
      questions: 0,
      answered: 0
    };
    setQuestionnaires([...questionnaires, newQuestionnaire]);
  };

  return (
    <div className="questionnaires">
      <div className="questionnaires-header">
        <input 
          type="text"
          placeholder="Search..." 
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="add-btn" onClick={handleAddNewQuestionnaire}>+ Add New</button>
      </div>

      <table className="questionnaires-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Academic Year</th>
            <th>Semester</th>
            <th>Questions</th>
            <th>Answered</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {questionnaires.filter(q => q.academicYear.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((q, index) => (
              <tr key={q.id}>
                <td>{index + 1}</td>
                <td>{q.academicYear}</td>
                <td>{q.semester}</td>
                <td>{q.questions}</td>
                <td>{q.answered}</td>
                <td>
                  <button className="action-btn">Action</button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Questionnaires;
