import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    loginUser(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      const userData = { ...action.payload, timestamp: Date.now() };
      localStorage.setItem("user", JSON.stringify(userData));
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("user");
    },
    signupUser(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      const userData = { ...action.payload, timestamp: Date.now() };
      localStorage.setItem("user", JSON.stringify(userData));
    },
  },
});

export const { loginUser, logoutUser, signupUser } = authSlice.actions;

export default authSlice.reducer;
