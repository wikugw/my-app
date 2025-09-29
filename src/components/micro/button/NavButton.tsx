import { type ButtonProps } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Button } from './Button';

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
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to, { replace });
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};
