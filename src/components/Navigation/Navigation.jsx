import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/contacts">Contacts</Link>
      </li>
    </ul>
  </nav>
);
