import { useAuthState } from 'react-firebase-hooks/auth';
import { AvatarPlacholder } from '../../micro/AvatarPlacholder';
import { auth } from '../../../firebase';
import { useMemo } from 'react';
import { Popover, Portal } from '@chakra-ui/react';
import { Button } from '../../micro/button/Button';
import { signOut } from 'firebase/auth';

export const AvatarButton = () => {
  const [user] = useAuthState(auth);

  const displayName = useMemo(
    () => user?.displayName ?? '',
    [user?.displayName]
  );

  const photo = useMemo(() => user?.photoURL ?? '', [user?.photoURL]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Popover.Root
      positioning={{ placement: 'top-end', sameWidth: true }}
      size={'sm'}
    >
      <Popover.Trigger asChild>
        <Button py={6}>
          <AvatarPlacholder name={displayName} avatarUrl={photo} />
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content width="auto">
            <Popover.Arrow />
            <Popover.Body>
              <Button w="full" onClick={handleLogout}>
                Logout
              </Button>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
