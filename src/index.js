// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "~/components/GlobalStyle";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient()

root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <GlobalStyle>
        <App />
      </GlobalStyle>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  // </React.StrictMode>
);

reportWebVitals();
