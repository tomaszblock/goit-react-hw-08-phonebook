import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://connections-api.herokuapp.com';

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, userData);
    return response.data;
  } catch (error) {
    if (error.response.status === 400 && error.response.data.code === 11000) {
      return rejectWithValue({ message: 'This email is already registered.' });
    } else {
      console.error('Error during registration:', error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
});

export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      return rejectWithValue({ message: 'Invalid email or password.' });
    } else {
      console.error('Error during login:', error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await axios.post(`${API_URL}/users/logout`);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, email: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.email = action.payload.user.email;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.email = action.payload.user.email;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.email = null;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
