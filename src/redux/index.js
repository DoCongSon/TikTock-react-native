import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import postSlide from './slice/postSlide';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlide,
  },
});
