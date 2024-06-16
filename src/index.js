// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "~/components/GlobalStyle";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle>
        <App />
      </GlobalStyle>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
