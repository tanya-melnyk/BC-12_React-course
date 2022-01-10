import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// const SIGN_UP_URL =
//   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]';

// const SIGN_IN_URL =
//   'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]';
// const GET_USER_URL =
//   'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]';

// const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';
// const API_KEY = '';

const BASE_URL = process.env.REACT_APP_FIREBASE_URL;
const API_KEY = process.env.REACT_APP_FIREBASE_KEY;

const signUp = createAsyncThunk('auth/signUp', async credentials => {
  const body = { ...credentials, returnSecureToken: true };
  try {
    const { data } = await axios.post(
      `${BASE_URL}:signUp?key=${API_KEY}`,
      body,
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const signIn = createAsyncThunk('auth/signIn', async credentials => {});

const signOut = createAsyncThunk('auth/signOut', async () => {});

const getUser = createAsyncThunk('auth/getUser', async () => {});

const refreshToken = createAsyncThunk('auth/refreshToken', async () => {});

export { signUp, signIn, signOut, getUser, refreshToken };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// // const SIGN_UP_URL =
// //   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]';
// // const SIGN_IN_URL =
// //   'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]';
// // const GET_USER_URL =
// //   'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]';

// const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';
// const API_KEY = 'AIzaSyBEbt956qmNCIVg8VCs4vT3Il-ST3oX1zc';

// // const token = {
// //   set(token) {
// //     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// //   },
// //   unset() {
// //     axios.defaults.headers.common.Authorization = '';
// //   },
// // };

// // example SIGN_UP

// // url: :signUp
// // method: POST
// // headers: 'Content-Type: application/json';
// // body: '{"displayName":"[username]","email":"[user@example.com]","password":"[PASSWORD]","returnSecureToken":true}';

// const signUp = createAsyncThunk(
//   'auth/signUp',
//   async (credentials, thunkApi) => {
//     try {
//       const body = { ...credentials, returnSecureToken: true };
//       const { data } = await axios.post(
//         `${BASE_URL}:signUp?key=${API_KEY}`,
//         body,
//       );
//       // token.set(data.idToken);
//       return data;
//     } catch (error) {
//       console.dir(error.response.data.error.message);
//       return thunkApi.rejectWithValue(error.response.data.error.message);
//     }
//   },
// );

// // example SIGN_IN

// // url: :signInWithPassword
// // method: POST
// // headers: 'Content-Type: application/json';
// // body: '{"email":"[user@example.com]","password":"[PASSWORD]","returnSecureToken":true}';

// const signIn = createAsyncThunk(
//   'auth/signIn',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const body = { ...credentials, returnSecureToken: true };
//       const { data } = await axios.post(
//         `${BASE_URL}:signInWithPassword?key=${API_KEY}`,
//         body,
//       );
//       // token.set(data.idToken);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.error.message);
//     }
//   },
// );

// const signOut = createAsyncThunk('auth/signOut', async () => {
//   try {
//     // await axios.post('/signout');
//     // token.unset();
//   } catch (error) {
//     // return error;
//   }
// });

// const getUser = createAsyncThunk(
//   'auth/getUser',
//   async (token, { rejectWithValue, getState, dispatch }) => {
//     const persistedToken = token ?? getState().auth.token;

//     if (!persistedToken) {
//       return rejectWithValue();
//     }
//     // token.set(persistedToken);
//     try {
//       const body = { idToken: persistedToken };
//       const { data } = await axios.post(
//         `${BASE_URL}:lookup?key=${API_KEY}`,
//         body,
//       );
//       return data.users[0];
//     } catch (error) {
//       const errMsg = error.response.data.error.message;
//       if (errMsg === 'INVALID_ID_TOKEN') {
//         dispatch(refreshToken());
//       }
//       return rejectWithValue(errMsg);
//     }
//   },
// );

// const refreshToken = createAsyncThunk(
//   'auth/refreshToken',
//   async (_, { rejectWithValue, getState, dispatch }) => {
//     const persistedRefreshToken = getState().auth.refreshToken;

//     if (!persistedRefreshToken) {
//       return rejectWithValue();
//     }

//     try {
//       const body = {
//         grant_type: 'refresh_token',
//         refresh_token: persistedRefreshToken,
//       };
//       const { data } = await axios.post(
//         `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
//         body,
//       );
//       dispatch(getUser(data.id_token));
//       return data;
//     } catch (error) {
//       const errMsg = error.response.data.error.message;
//       return rejectWithValue(errMsg);
//     }
//   },
// );

// export { signUp, signIn, signOut, getUser, refreshToken };
