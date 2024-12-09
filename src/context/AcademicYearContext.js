import React, { createContext, useState, useEffect } from 'react';
import { fetchAcademicYears } from '../services/academicyear';

export const AcademicYearContext = createContext();

export const AcademicYearProvider = ({ children }) => {
  const [academicYears, setAcademicYears] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAcademicYears = async () => {
      try {
        const data = await fetchAcademicYears();
        setAcademicYears(data);
      } catch (error) {
        console.error('Failed to fetch academic years:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAcademicYears();
  }, []);

  return (
    <AcademicYearContext.Provider value={{ academicYears, setAcademicYears, loading }}>
      {children}
    </AcademicYearContext.Provider>
  );
};
