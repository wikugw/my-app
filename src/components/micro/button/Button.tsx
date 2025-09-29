// components/micro/Button.tsx
import {
  Button as ChakraButton,
  type ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { COLORS } from '../../../constants/colors';

type ColorKey = keyof typeof COLORS;

interface ButtonProps
  extends Omit<ChakraButtonProps, 'children' | 'colorScheme'> {
  children: ReactNode;
  className?: string;
  colorKey?: ColorKey; // renamed prop
  variant?: 'solid' | 'outline' | 'ghost';
}

export function Button({
  variant = 'solid',
  colorKey = 'primary', // default design system color
  size = 'md',
  disabled = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const bgColor = variant === 'solid' ? COLORS[colorKey] : undefined;
  const borderColor = variant === 'outline' ? COLORS[colorKey] : undefined;
  const colorText = variant === 'solid' ? 'white' : COLORS[colorKey];

  return (
    <ChakraButton
      variant={variant}
      size={size}
      disabled={disabled}
      bg={bgColor}
      borderColor={borderColor}
      color={colorText}
      _hover={
        variant === 'solid'
          ? { bg: COLORS[colorKey] }
          : { bg: `${COLORS[colorKey]}20` } // slightly transparent hover
      }
      className={className}
      {...props}
    >
      {children}
    </ChakraButton>
  );
}
