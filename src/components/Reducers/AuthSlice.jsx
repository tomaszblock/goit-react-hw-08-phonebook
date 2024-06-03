import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://connections-api.herokuapp.com';

export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await axios.post(`${API_URL}/users/signup`, userData);
  return response.data;
});

export const login = createAsyncThunk('auth/login', async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  return response.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await axios.post(`${API_URL}/users/logout`);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, email: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.email = action.payload.user.email;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.email = action.payload.user.email;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.email = null;
      });
  },
});

export default authSlice.reducer;
