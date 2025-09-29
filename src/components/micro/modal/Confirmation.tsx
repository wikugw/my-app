import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
  title?: string;
  body?: ReactNode;
}

export const ConfirmDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
  title = 'Confirm Action',
  body = 'Are you sure?',
}: ConfirmDialogProps) => {
  return (
    <Dialog.Root open={isOpen}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{body}</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button onClick={onOpenChange} variant="outline">
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button onClick={onConfirm}>Confirm</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton onClick={onOpenChange} size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
