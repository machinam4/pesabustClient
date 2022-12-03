import socketIO from "socket.io-client";
const socket = socketIO.connect(process.env.REACT_APP_API_URL, {
  withCredentials: true,
  auth: {
    Authorization: `Bearer ${localStorage.getItem("Token")}`,
  },
});

export { socket };
