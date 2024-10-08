import React, { useState } from 'react';
import './AcademicYear.css';

const AcademicYear = () => {
  const [academicYears, setAcademicYears] = useState([
    { id: 1, year: "2021-2022", semester: "1", systemDefault: "Yes", evaluationStatus: "Starting" },
    { id: 2, year: "2020-2021", semester: "1", systemDefault: "No", evaluationStatus: "Closed" },
    { id: 3, year: "2019-2020", semester: "2", systemDefault: "No", evaluationStatus: "Not Yet Started" },
    { id: 4, year: "2018-2019", semester: "1", systemDefault: "No", evaluationStatus: "Not Yet Started" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    const updatedYears = academicYears.filter(year => year.id !== id);
    setAcademicYears(updatedYears);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="academic-year-header">
        <input 
          type="text"
          placeholder="Search academic year..." 
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="add-btn">+ Add New</button>
      </div>

      <table className="academic-year-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Year</th>
            <th>Semester</th>
            <th>System Default</th>
            <th>Evaluation Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {academicYears.filter(year => 
            year.year.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((year, index) => (
            <tr key={year.id}>
              <td>{index + 1}</td>
              <td>{year.year}</td>
              <td>{year.semester}</td>
              <td>
                <button className={`default-btn ${year.systemDefault === 'Yes' ? 'yes' : 'no'}`}>
                  {year.systemDefault}
                </button>
              </td>
              <td>
                <span className={`status-badge ${year.evaluationStatus.toLowerCase().replace(/ /g, '-')}`}>
                  {year.evaluationStatus}
                </span>
              </td>
              <td>
                <button className="update-btn">Update</button>
                <button className="delete-btn" onClick={() => handleDelete(year.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AcademicYear;
