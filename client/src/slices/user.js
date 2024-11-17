import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLoggedInUserDetails } from '../services/user';

// Fetch user details
export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetchLoggedInUserDetails(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  staffDetails: JSON.parse(localStorage.getItem('staffDetails')) || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserDetails: (state) => {
      state.user = null;
      state.staffDetails = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('staffDetails');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.staffDetails = action.payload.staffDetails;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem(
          'staffDetails',
          JSON.stringify(action.payload.staffDetails)
        );
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user details';
      });
  },
});

export const { clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
