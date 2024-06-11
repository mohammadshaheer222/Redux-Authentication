import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Components/Features/Auth/AuthSlice";
import { apiSlice } from "./Components/Features/Auth/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
