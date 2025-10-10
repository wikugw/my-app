import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from './feedbackSlice';

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
