import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload; // Store user details if needed
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    signup(state, action) {
        state.isLoggedIn = true
        state.user = action.payload
    }
  },
});
 
export const { login, logout, signup } = authSlice.actions;

export default authSlice.reducer;
