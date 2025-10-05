import { Flex, Spinner } from '@chakra-ui/react';

export function FullScreenSpinner() {
  return (
    <Flex justify="center" align="center" h="100%">
      <Spinner />
    </Flex>
  );
}
