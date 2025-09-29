import { Button as ChakraButton } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface ButtonProps {
  variant?: "solid" | "outline" | "ghost"; // Chakra's built-in variants
  colorScheme?: string; // e.g. "teal", "red", "blue"
  size?: "sm" | "md" | "lg"; // Chakra's sizes
  isDisabled?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function Button({
  variant = "solid",
  colorScheme = "teal",
  size = "md",
  isDisabled = false,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <ChakraButton
      variant={variant}
      colorScheme={colorScheme}
      size={size}
      disabled={isDisabled}
      className={className}
      {...props}
    >
      {children}
    </ChakraButton>
  );
}
