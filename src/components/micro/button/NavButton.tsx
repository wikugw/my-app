import { type ButtonProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { Button } from './Button';
import { useNav } from '@/hooks/useNav';

interface NavButtonProps extends ButtonProps {
  to: string;
  children: ReactNode;
  replace?: boolean; // optional, default false
}

export const NavButton = ({
  to,
  children,
  replace = false,
  ...props
}: NavButtonProps) => {
  const { go } = useNav();

  const handleClick = () => {
    go(to);
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};
