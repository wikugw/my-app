import { Popover } from '@chakra-ui/react';
import { useMemo } from 'react';
import { AvatarPlacholder } from '../../micro/AvatarPlacholder';
import { Button } from '../../micro/button/Button';
import { AvatarPopoverButtons } from './AvatarPopoverButtons';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const AvatarButton = () => {
  const { user } = useCurrentUser();

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
