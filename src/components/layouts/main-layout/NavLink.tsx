import {
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from 'react-router-dom';

/**
 * Combines Chakra's styling with React Router's `to` prop
 */
export type NavLinkProps = Omit<ChakraLinkProps, 'href'> & RouterLinkProps;

export function NavLink(props: NavLinkProps) {
  return <ChakraLink as={RouterLink} {...props} />;
}
