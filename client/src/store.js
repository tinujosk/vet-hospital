import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';

const store = configureStore({
  reducer: {
    auth: authReducer, // Add your reducers here
  },
});

export default store;
