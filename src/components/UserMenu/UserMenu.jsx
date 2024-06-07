import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, clearAuthState } from '../Reducers/AuthSlice';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const [loggedOff, setLoggedOff] = useState(false);
  const userEmail = useSelector(state => state.auth.email);
  const isAuthenticated = useSelector(state => state.auth.token);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      dispatch(clearAuthState());
      setLoggedOff(true);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setLoggedOff(false);
    }
  }, [isAuthenticated]);

  if (loggedOff) {
    return <p>You are logged off.</p>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>You are logged in as {userEmail}.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};
