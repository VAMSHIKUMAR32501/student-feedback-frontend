import React, { createContext, useState, useContext } from 'react';

const CriteriaContext = createContext();

export const useCriteria = () => useContext(CriteriaContext);

export const CriteriaProvider = ({ children }) => {
  const [criteriaList, setCriteriaList] = useState([]);

  const addCriteria = (criteria) => {
    setCriteriaList((prevCriteria) => [...prevCriteria, criteria]);
  };

  return (
    <CriteriaContext.Provider value={{ criteriaList, addCriteria }}>
      {children}
    </CriteriaContext.Provider>
  );
};
