import {
  Box,
  Flex,
  HStack,
  VStack,
  IconButton,
  Drawer,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaBars, FaTimes } from 'react-icons/fa';
import React, { useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AvatarButton } from '../../macro/sidebar/AvatarButton';
import { Text } from '../../micro/Text';
import { NavLink } from './NavLink';
import type { NavItem } from '@/types/components/layouts/NavItem';

interface LayoutProps {
  children: ReactNode;
}

export const kNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/' },
  { id: 'recruitment', label: 'Recruitment', path: '/recruitment' },
];

const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
  const location = useLocation();

  return (
    <Box
      bg="gray.800"
      color="white"
      w={{ base: '95%', md: 60 }}
      maxW={{ base: '95%', md: 60 }}
      pos="fixed"
      h="full"
      p={{ base: 0, md: 4 }}
    >
  <Flex direction="column" h="100%" p={{ base: 4, md: 0 }}>
        <VStack align="stretch" w={{ base: '90%', md: 'full' }} gap={2} flex="1" overflowY="auto">
          {kNavItems.map((item: NavItem) => {
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
                onClick={onClose}
                w={{ base: '90%', md: 'full' }}
                display="block"
                _focus={{ outline: 'none', boxShadow: 'none' }} // 👈 add this line
                _focusVisible={{ outline: 'none', boxShadow: 'none' }} // 👈 add this too
              >
                <HStack gap={3} w="100%">
                  <Text color="white">{item.label}</Text>
                </HStack>
              </NavLink>
            );
          })}
        </VStack>

        <Box pt={4} w={{ base: '90%', md: 'full' }}>
          <AvatarButton />
        </Box>
      </Flex>
    </Box>
  );
};

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Flex minH="100vh" bg="gray.50">
      {/* Sidebar for desktop */}
      {isDesktop ? (
        <SidebarContent />
      ) : (
        <Drawer.Root open={open} onOpenChange={(details) => setOpen(details.open)}>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content p="0" m="0" w="100%">
              <SidebarContent onClose={() => setOpen(false)} />
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      )}

      {/* Main Content */}
      <Box flex="1" ml={{ base: 0, md: 60 }} p={4}>
        {/* Mobile top bar */}
        {!isDesktop && (
          <Flex
            as="header"
            align="center"
            justify="space-between"
            bg="white"
            borderBottomWidth="1px"
            p={2}
            mb={4}
            boxShadow="sm"
          >
            <IconButton
              aria-label="Toggle menu"
              variant="ghost"
              onClick={() => setOpen(!open)}
            >
              {open ? <FaTimes /> : <FaBars />}
            </IconButton>
            <Text fontWeight="bold" color="gray">
              My App
            </Text>
            <Box>

            </Box>
            {/* <AvatarButton /> */}
          </Flex>
        )}

        {children}
      </Box>
    </Flex>
  );
};

export default MainLayout;
