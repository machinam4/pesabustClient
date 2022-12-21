import socketIO from "socket.io-client";
import {
  pushBustRate,
  setBustRate,
  setBustStatus,
  setCounter,
  setinBet,
  setisBet,
  setOnlineUsers,
  updateBets,
} from "../features/authSlice";
import store from "../store";

const socket = socketIO.connect(process.env.REACT_APP_API_URL, {
  withCredentials: true,
  auth: {
    Authorization: `Bearer ${localStorage.getItem("Token")}`,
  },
});

socket.on("users_online", (data) => {
  store.dispatch(setOnlineUsers(data));
});

socket.on("game_wait", (data) => {
  store.dispatch(setinBet(false));
  store.dispatch(setBustStatus("wait"));
  store.dispatch(setCounter(data));
});
socket.on("game_start", async (data) => {
  await store.dispatch(updateBets(data));
});

socket.on("game_play", (data) => {
  store.dispatch(setBustStatus("play"));
  // store.dispatch(setCounter(data));

  store.dispatch(pushBustRate(data));
});

socket.on("game_end", (data) => {
  store.dispatch(setBustStatus("end"));
  store.dispatch(setBustRate([]));
  store.dispatch(setCounter(data));
  store.dispatch(setisBet(false));
});

export { socket };
