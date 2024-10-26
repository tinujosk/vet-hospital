import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import snackbarReducer from './slices/snackbar';

const store = configureStore({
  reducer: {
    auth: authReducer, // Add your reducers here
    snackbar: snackbarReducer,
  },
});

export default store;
