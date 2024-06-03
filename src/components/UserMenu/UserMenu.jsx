import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Reducers/AuthSlice';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.email);

  return (
    <div>
      <p>{email}</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};
