import { configureStore } from "@reduxjs/toolkit";
import { exerciseApi } from "./apis/exerciseApi";
import { addictionApi } from "./apis/addictionApi";
import { userApi } from "./apis/userApi";
import authReducer from "./slices/authSlice"
import { setupListeners } from "@reduxjs/toolkit/query";
import { eventApi } from "./apis/eventApi";


export const store = configureStore({
  reducer: {
    [exerciseApi.reducerPath]: exerciseApi.reducer,
    [addictionApi.reducerPath]: addictionApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(exerciseApi.middleware)
      .concat(addictionApi.middleware)
      .concat(userApi.middleware)
      .concat(eventApi.middleware),
});

setupListeners(store.dispatch);
