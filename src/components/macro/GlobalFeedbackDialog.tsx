import { useSelector, useDispatch } from 'react-redux';
import { closeFeedback } from '@/store/feedbackSlice';
import type { RootState } from '@/store';
import { GenericDialog } from '../micro/modal/GenericDialog';

export function GlobalFeedbackDialog() {
  const dispatch = useDispatch();
  const { isOpen, type, message, onConfirm } = useSelector(
    (state: RootState) => state.feedback
  );

  const handleConfirm = () => {
    if (onConfirm) onConfirm(); // call the callback if exists
    dispatch(closeFeedback());
  };

  return (
    <GenericDialog
      isOpen={isOpen}
      onOpenChange={() => dispatch(closeFeedback())}
      onConfirm={handleConfirm}
      variant={type}
      body={message}
    />
  );
}
