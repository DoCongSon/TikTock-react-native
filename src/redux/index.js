import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import modalSlide from './slice/modalSlide';
import postSlide from './slice/postSlide';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlide,
    modal: modalSlide,
  },
});
