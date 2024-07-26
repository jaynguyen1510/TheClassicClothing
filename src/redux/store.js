// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "~/redux/slides/productSlide";
import userReducer from "~/redux/slides/userSlide";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer
  },
});
