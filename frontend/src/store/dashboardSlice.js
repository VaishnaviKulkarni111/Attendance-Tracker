import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch dashboard data
export const fetchDashboardData = createAsyncThunk('dashboard/fetchData', async () => {
  const response = await axios.get('http://localhost:5000/api/dashboard'); 
  console.log(response)
  return response.data;
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    activeUsers: 0,
    present:0,
    abscent:0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.present = action.payload.present;
        state.abscent = action.payload.abscent;
        state.activeUsers = action.payload.activeUsers;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;