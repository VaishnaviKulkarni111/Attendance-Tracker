import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  checkInStatus: 'idle', // idle, pending, completed
  checkOutStatus: 'idle',
  checkInTime: null,
  checkOutTime: null,
  error: null,
};

// Async action for check-in
export const checkIn = createAsyncThunk('attendance/checkIn', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');  
    console.log("token",token)
    const response = await fetch('http://localhost:5000/attendance/checkin', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log("res", data)
      return data;
    } else {
      return rejectWithValue(data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async action for check-out
export const checkOut = createAsyncThunk('attendance/checkOut', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');  

    const response = await fetch('http://localhost:5000/attendance/checkout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return rejectWithValue(data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

//for manager
export const fetchAttendance = createAsyncThunk(
  'attendance/fetchAttendance',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/attendance/manager/${employeeId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) return data;
      return rejectWithValue(data.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchUserAttendance = createAsyncThunk(
  'attendance/fetchUserAttendance',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/attendance/employee/${employeeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token for auth
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch attendance');
      }

      const data = await response.json();
      return data.attendance;
    } catch (error) {
      console.error('Error fetching attendance:', error);
      return rejectWithValue(error.message || 'Failed to fetch attendance');
    }
  }
);



// Attendance slice
const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkIn.pending, (state) => {
        state.checkInStatus = 'pending';
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.checkInStatus = 'completed';
        state.checkInTime = action.payload.checkInTime;
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.checkInStatus = 'idle';
        state.error = action.payload;
      })
      .addCase(checkOut.pending, (state) => {
        state.checkOutStatus = 'pending';
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.checkOutStatus = 'completed';
        state.checkOutTime = action.payload.checkOutTime;
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.checkOutStatus = 'idle';
        state.error = action.payload;
      })
      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceHistory = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload; // Populate attendance data
      })
      .addCase(fetchUserAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
      
  },
});

export default attendanceSlice.reducer;