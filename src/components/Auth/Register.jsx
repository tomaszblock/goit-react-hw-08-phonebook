import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../Reducers/AuthSlice';
import { login } from '../Reducers/AuthSlice';

export const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState(''); // Dodajemy pole 'name'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(register({ name, email, password })); // Dodajemy name do obiektu przesyłanego do funkcji register
      await dispatch(login({ email, password }));
      setIsRegistered(true);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  if (isRegistered) {
    return (
      <div>
        <p>You are registered and logged in.</p>
      </div>
    );
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
