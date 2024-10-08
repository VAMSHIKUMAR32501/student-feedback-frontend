import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Updated path

const PrivateRoute = ({ element }) => {
  const { auth } = useContext(AuthContext);

  return auth ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
