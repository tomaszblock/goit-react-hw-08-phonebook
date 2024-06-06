import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact } from '../Reducers/ContactsSlice';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const token = useSelector(state => state.auth.token);

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (token) {
      // Aktualizacja poniższej linii, aby przesyłała jedynie wymagane pola: name i phone
      dispatch(addContact({ name, phone: number }, token));
      setName('');
      setNumber('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label>
        Number:
        <input
          type="tel"
          value={number}
          onChange={handleNumberChange}
          required
        />
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
};
