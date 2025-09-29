import { Flex, Box, Avatar } from '@chakra-ui/react';
import { Text } from './Text';

interface AccountButtonProps {
  name: string;
  avatarUrl?: string;
  onClick?: () => void;
}

export const AvatarPlacholder = ({
  name,
  avatarUrl,
  onClick,
}: AccountButtonProps) => {
  return (
    <Box>
      <Flex align="center" gap={3} onClick={onClick}>
        <Avatar.Root size={'sm'}>
          <Avatar.Fallback name={name} />
          <Avatar.Image src={avatarUrl} />
        </Avatar.Root>
        <Text color='white' variant="labelMedium">{name}</Text>
      </Flex>
    </Box>
  );
};
