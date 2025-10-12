import { Box, Flex, HStack, VStack } from '@chakra-ui/react';
import React, { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { NAVITEMS } from '../../../constants/navItems';
import { AvatarButton } from '../../macro/sidebar/AvatarButton';
import { Text } from '../../micro/Text';
import { NavLink } from './NavLink'; // wrapper we made earlier
import type { NavItem } from '@/types/components/layouts/NavItem';

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box as="aside" bg="gray.800" color="white" p={4}>
        <Flex direction="column" h="100%">
          <VStack align="stretch" gap={2} flex="1" overflowY="auto">
            {NAVITEMS.map((item: NavItem) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  px={3}
                  py={2}
                  borderRadius="md"
                  fontWeight={isActive ? 'bold' : 'normal'}
                  bg={isActive ? 'gray.700' : 'transparent'}
                  _hover={{ bg: 'gray.600' }}
                >
                  <HStack gap={3}>
                    {/* <Box as={item.icon} boxSize={5} /> */}
                    <Text color="white">{item.label}</Text>
                  </HStack>
                </NavLink>
              );
            })}
          </VStack>

          {/* Bottom section */}
          <Box position="sticky" bottom="4" pt={4} zIndex="1">
            <AvatarButton />
          </Box>
        </Flex>
      </Box>

      {/* Content */}
      <Box flex="1" p={6} bg="gray.50">
        {children}
      </Box>
    </Flex>
  );
};

export default MainLayout;
