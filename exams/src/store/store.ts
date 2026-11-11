import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Redux";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
