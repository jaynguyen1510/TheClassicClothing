// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "~/redux/slides/productSlide";
import userReducer from "~/redux/slides/userSlide";
import orderSlide from "./slides/orderSlide";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    order: orderSlide
  },
});
