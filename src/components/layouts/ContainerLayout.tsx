import { Container, VStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type ContainerLayoutProps = {
  children: ReactNode;
};

export function ContainerLayout({ children }: ContainerLayoutProps) {
  return (
    <Container maxW="6xl" py={8}>
      <VStack gap={6} align="stretch">
        {children}
      </VStack>
    </Container>
  );
}
