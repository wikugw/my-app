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
  variantKey?: 'solid' | 'outline' | 'ghost' | 'subtle' | 'surface' | 'plain';
}

export function Button({
  variantKey = 'solid',
  colorKey = 'primary', // default design system color
  size = 'md',
  disabled = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const bgColor = variantKey === 'solid' ? COLORS[colorKey] : undefined;
  const borderColor = variantKey === 'outline' ? COLORS[colorKey] : undefined;
  const colorText = variantKey === 'solid' ? 'white' : COLORS[colorKey];

  return (
    <ChakraButton
      variant={variantKey}
      size={size}
      disabled={disabled}
      bg={bgColor}
      borderColor={borderColor}
      color={colorText}
      _hover={
        variantKey === 'solid'
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
