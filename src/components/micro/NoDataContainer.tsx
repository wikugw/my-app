import { Flex } from '@chakra-ui/react';
import { Text } from './Text';

type NoDataContainerProps = {
  text: string;
};

export function NoDataContainer({ text }: NoDataContainerProps) {
  return (
    <Flex justify="center" align="center" h="100%">
      <Text color="danger">{text}</Text>
    </Flex>
  );
}
