import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: {},
    isBet: false,
  },
  reducers: {
    authenticate: (state, action) => {
      state.isAuth = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    setisBet: (state, action) => {
      state.isBet = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authenticate, updateUser, setisBet } = authSlice.actions;

export default authSlice.reducer;
