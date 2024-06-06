import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.token);

  return isAuthenticated ? children : <Navigate to="/login" />;
};
