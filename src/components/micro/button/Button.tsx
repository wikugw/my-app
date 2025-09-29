import {
  Button as ChakraButton,
  type ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface ButtonProps extends Omit<ChakraButtonProps, 'children'> {
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = 'solid',
  colorScheme = 'teal',
  size = 'md',
  disabled = false,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <ChakraButton
      variant={variant}
      colorScheme={colorScheme}
      size={size}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </ChakraButton>
  );
}
