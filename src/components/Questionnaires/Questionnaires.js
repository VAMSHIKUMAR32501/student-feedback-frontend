import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Questionnaires.css';
import { AcademicYearContext } from '../../context/AcademicYearContext';

const Questionnaires = () => {
  const { academicYears, loading } = useContext(AcademicYearContext); // Access academic years from context
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleManage = (id) => {
    navigate(`/admin/manage-questionnaire/${id}`);
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
      </div>

      {loading && <p>Loading academic years...</p>}

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
          {academicYears
            .filter((year) =>
              year.year.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((year, index) => (
              <tr key={year.id}>
                <td>{index + 1}</td>
                <td>{year.year}</td>
                <td>{year.semester}</td>
                <td>0</td>
                <td>0</td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => handleManage(year.id)}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Questionnaires;
