// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "~/redux/slides/counterSlice";
import userReducer from "~/redux/slides/userSlide";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
});
