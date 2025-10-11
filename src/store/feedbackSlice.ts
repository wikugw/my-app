import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type feedbackType = 'success' | 'failure' | 'warning';

type FeedbackState = {
  isOpen: boolean;
  type: feedbackType;
  message: string;
  onConfirm?: (() => void) | null;
};

const initialState: FeedbackState = {
  isOpen: false,
  type: 'success',
  message: '',
  onConfirm: null,
};

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    showFeedback: (
      state,
      action: PayloadAction<{
        type: feedbackType;
        message: string;
        onConfirm?: () => void;
      }>
    ) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.onConfirm = action.payload.onConfirm || null;
    },
    closeFeedback: state => {
      state.isOpen = false;
      state.onConfirm = null;
    },
  },
});

export const { showFeedback, closeFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
