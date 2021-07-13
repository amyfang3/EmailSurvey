import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk)); // Redux store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, // Hooks Redux to React. Provider is a React component that will update its children components (App) when new states occur
  document.querySelector("#root")
);
