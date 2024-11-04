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
      state.user = action.payload; // Store user details if needed
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    signupUser(state, action) {
        state.isLoggedIn = true
        state.user = action.payload
    }
  },
});
 
export const { loginUser, logoutUser, signupUser } = authSlice.actions;

export default authSlice.reducer;
