import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Reducers/AuthSlice';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.auth.email);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
