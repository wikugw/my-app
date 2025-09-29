import { useAuthState } from 'react-firebase-hooks/auth';
import { AvatarPlacholder } from '../../micro/AvatarPlacholder';
import { auth } from '../../../firebase';
import { useMemo } from 'react';
import { Popover } from '@chakra-ui/react';
import { Button } from '../../micro/button/Button';
import { AvatarPopoverButtons } from './AvatarPopoverButtons';

export const AvatarButton = () => {
  const [user] = useAuthState(auth);

  const displayName = useMemo(
    () => user?.displayName ?? '',
    [user?.displayName]
  );

  const photo = useMemo(() => user?.photoURL ?? '', [user?.photoURL]);

  return (
    <Popover.Root
      positioning={{ placement: 'top-end', sameWidth: true }}
      size={'sm'}
    >
      <Popover.Trigger asChild>
        <Button colorKey="gray" py={6}>
          <AvatarPlacholder name={displayName} avatarUrl={photo} />
        </Button>
      </Popover.Trigger>
      <AvatarPopoverButtons />
    </Popover.Root>
  );
};
