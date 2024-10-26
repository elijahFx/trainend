import { configureStore } from "@reduxjs/toolkit";
import { exerciseApi } from "./apis/exerciseApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [exerciseApi.reducerPath]: exerciseApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(exerciseApi.middleware),  
});

setupListeners(store.dispatch);
