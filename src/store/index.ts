import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
