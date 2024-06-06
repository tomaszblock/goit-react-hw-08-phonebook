import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Reducers/AuthSlice';

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(state => state.auth.error);
  const isLoggedIn = useSelector(state => state.auth.token);
  const userEmail = useSelector(state => state.auth.email);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  // Sprawdzamy, czy użytkownik jest już zalogowany
  if (isLoggedIn) {
    return (
      <div>
        <p>{userEmail} You are logged in.</p>
      </div>
    );
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
