import { type ButtonProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { Button } from './Button';
import { useNav } from '@/hooks/useNav';
import type { NavigateOptions } from 'react-router-dom';

interface NavButtonProps extends ButtonProps {
  to: string;
  children: ReactNode;
  options?: NavigateOptions;
}

export const NavButton = ({
  to,
  children,
  options,
  ...props
}: NavButtonProps) => {
  const { go } = useNav();

  const handleClick = () => {
    go(to, options);
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};
