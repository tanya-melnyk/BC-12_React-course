import { createSlice } from '@reduxjs/toolkit';
import { signUp, signIn, getUser, refreshToken } from './authOperations';

const initialState = {
  user: { name: null, email: null },

  token: null,
  localId: null,
  refreshToken: null,

  loading: false,
  loadingUser: false,

  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user.email = payload.email;
        state.user.name = payload.displayName;
        state.token = payload.idToken;
        state.refreshToken = payload.refreshToken;
        state.localId = payload.localId;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(signIn.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user.email = payload.email;
        state.user.name = payload.displayName;
        state.token = payload.idToken;
        state.refreshToken = payload.refreshToken;
        state.localId = payload.localId;
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(getUser.pending, state => {
        state.error = null;
        state.loadingUser = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loadingUser = false;
        state.user.email = payload.email;
        state.user.name = payload.displayName;
        state.localId = payload.localId;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.loadingUser = false;
        state.token = null;
      })

      .addCase(refreshToken.pending, state => {
        state.error = null;
        state.loadingUser = true;
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.loadingUser = false;
        state.token = payload.id_token;
        state.refreshToken = payload.refresh_token;
      })
      .addCase(refreshToken.rejected, (state, { payload }) => {
        state.error = payload;
        state.loadingUser = false;
        state.token = null;
        state.refreshToken = null;
      });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;

// idToken - string	A Firebase Auth ID token for the newly created user.
// email - string	The email for the newly created user.
// refreshToken -	string	A Firebase Auth refresh token for the newly created user.
// expiresIn - string	The number of seconds in which the ID token expires.
// localId - string	The uid of the newly created user.
