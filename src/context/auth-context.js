import React from "react";
// const userId = localStorage.getItem("userId");
export default React.createContext({
  token: null,
  userId: "machina",
  loggedInUser: null,
});
