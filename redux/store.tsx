import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import postIDReducer from './slices/postID'

export const store = configureStore({
    reducer: {
        user: userReducer,
        postID: postIDReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Custom hook for useDispatch with proper types
import { useDispatch } from "react-redux";
export const useAppDispatch = () => useDispatch<AppDispatch>();
