import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../Reducers/ContactsSlice';
import filterReducer from '../Reducers/FilterSlice';
import authReducer from '../Reducers/AuthSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
    auth: persistedReducer,
  },
});

export const persistor = persistStore(store);
