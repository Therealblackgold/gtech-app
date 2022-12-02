import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  // naming slice
  name: "auth",
  // token is null
  initialState: { token: null },
  reducers: {
    // getting the payload from the backend and setting accessToken
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    // setting token to null at logout
    logOut: (state, action) => {
      state.token = null;
    },
  },
});

// exporting action creators
export const { setCredentials, logOut } = authSlice.actions;

// exporting the slice reducer to add it to the apps store
export default authSlice.reducer;

// creating a selector to get current token
export const selectCurrentToken = (state) => state.auth.token;
