import { Popover, Portal } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { Button } from '../../micro/button/Button';
import { showConfirm, showSuccess } from '@/helpers/swalHelper';

export const AvatarPopoverButtons = () => {
  const handleLogout = async () => {
    const confirmed = await showConfirm(
      'Confirm Logout',
      'Are you sure you want to logout?'
    );

    if (!confirmed) return;

    try {
      await signOut(auth);
      showSuccess('Logged out', 'You have been signed out successfully.');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <Portal>
      <Popover.Positioner>
        <Popover.Content width="auto">
          <Popover.Arrow />
          <Popover.Body>
            <Button colorKey="gray" w="full" onClick={handleLogout}>
              Logout
            </Button>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  );
};
