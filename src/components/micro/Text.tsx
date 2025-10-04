// components/micro/Text.tsx
import { Text as ChakraText, type TextProps } from '@chakra-ui/react';
import React from 'react';

import { COLORS } from '../../constants/colors';

type TextVariant =
  | 'paragraphXSmall'
  | 'paragraphSmall'
  | 'paragraphMedium'
  | 'paragraphLarge'
  | 'labelSmall'
  | 'labelMedium'
  | 'labelLarge';

type ColorKey = keyof typeof COLORS; // "primary" | "secondary" | "danger" | "gray"

type MicroTextProps = Omit<TextProps, 'color'> & {
  // remove original color
  variant?: TextVariant;
  bold?: boolean;
  color?: ColorKey;
};

const variantMap: Record<TextVariant, TextProps> = {
  paragraphXSmall: { fontSize: 'xs', lineHeight: 'short' },
  paragraphSmall: { fontSize: 'sm', lineHeight: 'short' },
  paragraphMedium: { fontSize: 'md', lineHeight: 'base' },
  paragraphLarge: { fontSize: 'lg', lineHeight: 'base' },
  labelSmall: { fontSize: 'xs', lineHeight: 'short', letterSpacing: '0.5px' },
  labelMedium: { fontSize: 'sm', lineHeight: 'short', letterSpacing: '0.5px' },
  labelLarge: { fontSize: 'md', lineHeight: 'base', letterSpacing: '1px' },
};

export const Text: React.FC<MicroTextProps> = ({
  children,
  variant = 'paragraphSmall',
  bold = false,
  color = 'black', // default key from COLORS
  ...props
}) => {
  return (
    <ChakraText
      fontWeight={bold ? 'bold' : 'normal'}
      color={COLORS[color]} // map key to actual Chakra color
      {...variantMap[variant]}
      {...props}
    >
      {children}
    </ChakraText>
  );
};
