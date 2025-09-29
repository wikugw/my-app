import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

interface AccountButtonProps {
  name: string;
  avatarUrl?: string;
  onClick?: () => void;
}

export const AvatarPlacholder = ({ name, avatarUrl, onClick }: AccountButtonProps) => {
  return (
    <Box>
      <Flex
        align="center"
        gap={3}
        onClick={onClick}
      >
        <Avatar.Root size={"sm"}>
          <Avatar.Fallback name={name} />
          <Avatar.Image src={avatarUrl} />
        </Avatar.Root>
        <Text fontSize="sm">{name}</Text>
      </Flex>
    </Box>
  );
};
