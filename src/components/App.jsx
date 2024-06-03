import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { store, persistor } from './Store/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Register } from './Auth/Register';
import { Login } from './Auth/Login';
import { Navigation } from './Navigation/Navigation';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { UserMenu } from './UserMenu/UserMenu';

const AppContent = () => {
  return (
    <div>
      <Navigation />
      <UserMenu />
      <Routes>
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <PrivateRoute path="/contacts" element={<ContactsPage />} />
  <Route path="/" element={<Navigate to="/login" />} />
</Routes>
    </div>
  );
};

const ContactsPage = () => (
  <div>
    <h1>Contact List</h1>
    <ContactForm />
    <ContactList />
  </div>
);

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <AppContent />
      </Router>
    </PersistGate>
  </Provider>
);
