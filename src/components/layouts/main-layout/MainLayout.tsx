import React, { type ReactNode } from "react";
import { Box, Flex, VStack, HStack, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { NavLink } from "./NavLink"; // wrapper we made earlier

interface LayoutProps {
  children: ReactNode;
}

interface NavItem {
  id: string;
  label: string;
  path: string;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", path: "/" },
    { id: "users", label: "Users", path: "/users" },
    { id: "settings", label: "Settings", path: "/settings" },
    { id: "profile", label: "Profile", path: "/profile" },
  ];

  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box as="aside" w="240px" bg="gray.800" color="white" p={4}>
        <VStack align="stretch" gap={2}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                px={3}
                py={2}
                borderRadius="md"
                fontWeight={isActive ? "bold" : "normal"}
                bg={isActive ? "gray.700" : "transparent"}
                _hover={{ bg: "gray.600" }}
              >
                <HStack gap={3}>
                  {/* <Box as={item.icon} boxSize={5} /> */}
                  <Text color="white">{item.label}</Text>
                </HStack>
              </NavLink>
            );
          })}
        </VStack>
      </Box>

      {/* Content */}
      <Box flex="1" p={6} bg="gray.50">
        {children}
      </Box>
    </Flex>
  );
};

export default MainLayout;
