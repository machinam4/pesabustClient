import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// apollo graphql
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// react context
import store from "./store";
import { Provider } from "react-redux";

// apollo initialization
const token = localStorage.getItem("Token");
const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL + "graphql",
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  },
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
