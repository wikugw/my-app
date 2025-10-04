import { Popover, Portal } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { useState } from 'react';

import { auth } from '../../../firebase';
import { Button } from '../../micro/button/Button';
import { ConfirmDialog } from '../../micro/modal/Confirmation';

export const AvatarPopoverButtons = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Portal>
        <Popover.Positioner>
          <Popover.Content width="auto">
            <Popover.Arrow />
            <Popover.Body>
              <Button
                colorKey="gray"
                w="full"
                onClick={() => setIsDialogOpen(true)}
              >
                Logout
              </Button>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>

      <ConfirmDialog
        isOpen={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        body="Are you sure you want to logout?"
      />
    </>
  );
};
