// src/redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/slides/productSlide";
import userReducer from "../redux/slides/userSlide";
import orderSlide from "./slides/orderSlide";
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['product', 'user'], // blacklist specific slices of state from being persisted
}
const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  order: orderSlide
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store)