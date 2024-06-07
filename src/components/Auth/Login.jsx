import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Reducers/AuthSlice';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(state => state.auth.error);
  const isLoggedIn = useSelector(state => state.auth.token);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  // Sprawdzamy, czy użytkownik jest już zalogowany
  if (isLoggedIn) {
    return <Navigate to="/contacts" />;
  }

  // Jeśli użytkownik nie jest zalogowany, wyświetlamy formularz logowania
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        </label>
        <button type="submit">Login</button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};
