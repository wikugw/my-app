import React, { type ReactNode } from "react";
import { Box, Flex, VStack, HStack, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { NavLink } from "./NavLink"; // wrapper we made earlier
import { navItems } from "../../../constants/NavItems";
import { AvatarButton } from "../../macro/sidebar/AvatarButton";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box as="aside"  bg="gray.800" color="white" p={4}>
        <Flex direction="column" h="100%">
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

          {/* Bottom section */}
          <Box mt="auto" pt={4}>
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
