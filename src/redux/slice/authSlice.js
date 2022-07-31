import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { getPostsById } from './postSlide';

const initialState = {
  currentUser: null,
  loaded: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userStateChange: (state, action) => {
      state.currentUser = action.payload.currentUser;
      state.loaded = action.payload.loaded;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(login.fulfilled, (state, action) => {})
      .addCase(register.fulfilled, (state, action) => {})
      .addCase(userAuthStateListener.fulfilled, (state, action) => {});
  },
});

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('sign in successful');
      // ...
    })
    .catch((error) => {
      console.log('sign in unsuccessful');
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

export const register = createAsyncThunk('auth/register', async ({ email, password }) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log('register successful');
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      console.log('register successful');
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
});

export const userAuthStateListener = createAsyncThunk(
  'auth/userAuthStateListener',
  async (_, { dispatch }) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getCurrentUserState());
        dispatch(getPostsById());
      } else {
        dispatch(userStateChange({ currentUser: null, loaded: true }));
      }
    });
  }
);

const getCurrentUserState = createAsyncThunk(
  'auth/getCurrentUserState',
  async (_, { dispatch }) => {
    const auth = getAuth();
    const db = getFirestore();
    onSnapshot(doc(db, 'user', auth.currentUser.uid), (doc) => {
      if (doc.exists()) {
        dispatch(userStateChange({ currentUser: doc.data(), loaded: true }));
      }
    });
  }
);

export const { userStateChange } = authSlice.actions;

export default authSlice.reducer;
