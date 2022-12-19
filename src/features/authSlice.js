import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: {},
    bets: [],
    isBet: false,
    counter: 0,
    bustRate: [],
    bustStatus: "loading",
    onlineUsers: 0,
  },
  reducers: {
    authenticate: (state, action) => {
      state.isAuth = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateBets: (state, action) => {
      state.bets = action.payload;
      if ((action.payload = [])) {
        state.isBet = false;
      }
    },

    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setisBet: (state, action) => {
      state.isBet = action.payload;
    },
    setCounter: (state, action) => {
      state.counter = action.payload;
    },
    setBustStatus: (state, action) => {
      state.bustStatus = action.payload;
    },
    setBustRate: (state, action) => {
      state.bustRate = action.payload;
    },
    pushBustRate: (state, action) => {
      state.bustRate.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  authenticate,
  updateUser,
  updateBets,
  setisBet,
  setCounter,
  setOnlineUsers,
  setBustStatus,
  setBustRate,
  pushBustRate,
} = authSlice.actions;

export default authSlice.reducer;
