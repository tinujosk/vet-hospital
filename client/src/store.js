import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import snackbarReducer from './slices/snackbar';
import userReducer from './slices/user';

const store = configureStore({
  reducer: {
    auth: authReducer, // Add your reducers here
    snackbar: snackbarReducer,
    user: userReducer
  },
});

export default store;
