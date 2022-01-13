import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

////////// SIGN_UP_URL ///////////
// 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]';
////////// SIGN_IN_URL ///////////
// 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]';
///////// GET_USER_URL ///////////
// 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]';

const BASE_URL = process.env.REACT_APP_FIREBASE_URL;
const API_KEY = process.env.REACT_APP_FIREBASE_KEY;

// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials, { rejectWithValue }) => {
    const body = { ...credentials, returnSecureToken: true };
    try {
      const { data } = await axios.post(
        `${BASE_URL}:signUp?key=${API_KEY}`,
        body,
      );

      // token.set(data.token);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  },
);

const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, { rejectWithValue }) => {
    const body = { ...credentials, returnSecureToken: true };
    try {
      const { data } = await axios.post(
        `${BASE_URL}:signInWithPassword?key=${API_KEY}`,
        body,
      );

      // token.set(data.token);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  },
);

// const signOut = createAsyncThunk('auth/signOut', async () => {
//   try {
//     // await axios.post('/signout');
//     // token.unset();
//   } catch (error) {
//     // return error;
//   }
// });

const getUser = createAsyncThunk('auth/getUser', async (token, thunkApi) => {
  const persistedToken = token ?? thunkApi.getState().auth.token;

  if (!persistedToken) {
    return thunkApi.rejectWithValue();
  }

  // token.set(persistedToken);

  try {
    const body = { idToken: persistedToken };
    const { data } = await axios.post(
      `${BASE_URL}:lookup?key=${API_KEY}`,
      body,
    );
    return data.users[0];
  } catch (error) {
    // token.unset();
    const errMsg = error.response.data.error.message;
    if (errMsg === 'INVALID_ID_TOKEN') {
      thunkApi.dispatch(refreshToken());
    }
    return thunkApi.rejectWithValue(errMsg);
  }
});

const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkApi) => {
    try {
      const persistedRefreshToken = thunkApi.getState().auth.refreshToken;

      if (!persistedRefreshToken) {
        return thunkApi.rejectWithValue();
      }

      const body = {
        grant_type: 'refresh_token',
        refresh_token: persistedRefreshToken,
      };
      const { data } = await axios.post(
        `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
        body,
      );
      thunkApi.dispatch(getUser(data.id_token));
      return data;
    } catch (error) {
      const errMsg = error.response.data.error.message;
      return thunkApi.rejectWithValue(errMsg);
    }
  },
);

export { signUp, signIn, getUser, refreshToken };
