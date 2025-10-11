import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from './feedbackSlice';

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.onConfirm'],
        ignoredPaths: ['feedback.onConfirm'],
      },
    }),
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
