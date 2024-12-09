import React, { useState, useEffect ,useContext} from 'react';
import {
  fetchAcademicYears,
  deleteAcademicYear,
  addAcademicYear,
  updateAcademicYear
} from '../../services/academicyear';
import { toast } from 'react-toastify';
import './AcademicYear.css';
import { AcademicYearContext } from '../../context/AcademicYearContext';

const AcademicYear = () => {
  
  const [academicYears, setAcademicYears] = useState([]);
  const [newYear, setNewYear] = useState({ year: '', semester: '', systemDefault: '', evaluationStatus: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingYearId, setEditingYearId] = useState(null); // Track which year is being edited
  const [searchTerm, setSearchTerm] = useState(""); // Track search input
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    loadAcademicYears();
  }, []);

  const loadAcademicYears = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAcademicYears();
      setAcademicYears(data);
    } catch (error) {
      console.error('Error fetching academic years:', error);
      setError('Failed to fetch academic years. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this academic year?')) {
      setLoading(true);
      setError('Deleting...');
      try {
        await deleteAcademicYear(id);
        await loadAcademicYears();
        toast.success('Academic year deleted successfully!');
      } catch (error) {
        console.error('Error deleting academic year:', error);
        setError('Failed to delete academic year. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddOrUpdate = async () => {
    if (Object.values(newYear).some(field => !field)) {
      toast.error('Please fill all fields.');
      return;
    }

    const booleanNewYear = {
      ...newYear,
      systemDefault: newYear.systemDefault.toLowerCase() === 'yes',
    };

    setLoading(true);
    setError('');
    try {
      if (editingYearId) {
        await updateAcademicYear(editingYearId, booleanNewYear);
        setAcademicYears(prevYears =>
          prevYears.map(year => (year.id === editingYearId ? { ...year, ...booleanNewYear } : year))
        );
        toast.success('Academic year updated successfully!');
      } else {
        const addedYear = await addAcademicYear(booleanNewYear);
        setAcademicYears(prevYears => [...prevYears, addedYear]);
        toast.success('New academic year added successfully!');
      }
      setNewYear({ year: '', semester: '', systemDefault: '', evaluationStatus: '' });
      setEditingYearId(null);
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error adding/updating academic year:', error);
      setError('Failed to add/update academic year. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (yearData) => {
    setNewYear(yearData);
    setEditingYearId(yearData.id);
    setIsModalOpen(true); // Open modal for editing
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="academic-year-header">
        <input
          type="text"
          placeholder="Search academic years..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="add-btn" onClick={() => {
          setNewYear({ year: '', semester: '', systemDefault: '', evaluationStatus: '' });
          setEditingYearId(null); // Reset editing ID
          setIsModalOpen(true); // Open modal for adding
        }}>
          + Add New
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

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
          {academicYears.filter(year => year.year.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((yearData, index) => (
              <tr key={yearData.id}>
                <td>{index + 1}</td>
                <td>{yearData.year}</td>
                <td>{yearData.semester}</td>
                <td>
                  <span className={`status-badge ${yearData.systemDefault ? 'system-default-yes' : 'system-default-no'}`}>
                    {yearData.systemDefault ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>
                  <span className={`status-badge evaluation-status-${yearData.evaluationStatus.toLowerCase().replace(/ /g, '-')}`}>
                    {yearData.evaluationStatus}
                  </span>
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(yearData)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(yearData.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal for adding/updating academic year */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>{editingYearId ? 'Edit Academic Year' : 'Add New Academic Year'}</h2>
            {Object.entries(newYear).map(([key, value]) => (
              <input
                key={key}
                type="text"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value}
                onChange={(e) => setNewYear({ ...newYear, [key]: e.target.value })}
              />
            ))}
            <div className="modal-buttons">
              <button onClick={handleAddOrUpdate} className="save-btn">
                {editingYearId ? 'Update' : 'Save'}
              </button>
              <button onClick={() => setIsModalOpen(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicYear;
