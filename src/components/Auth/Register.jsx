import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register, login } from '../Reducers/AuthSlice';
import { Navigate } from 'react-router-dom';

export const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(register({ name, email, password }));
      await dispatch(login({ email, password }));
      setIsRegistered(true);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  if (isRegistered) {
    return <Navigate to="/contacts" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </label>
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
      <button type="submit">Register</button>
    </form>
  );
};
