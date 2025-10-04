import {
  Box,
  Input as ChakraInput,
  type InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import {
  Controller,
  type RegisterOptions,
  useFormContext,
} from 'react-hook-form';

import { Text } from '../Text';

type Size = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<ChakraInputProps, 'size'> {
  name: string;
  label?: string;
  inputSize?: Size;
  rules?: RegisterOptions; // ✅ validation rules
}

export const Input = ({
  name,
  label,
  inputSize = 'md',
  rules,
  ...props
}: InputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];
  const hasError = !!fieldError;

  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      rules={rules}
      render={({ field }) => (
        <Box w="100%">
          {label && (
            <Text
              as="label"
              mb={1}
              variant="paragraphSmall"
              fontWeight="medium"
              display="block"
            >
              {label}
            </Text>
          )}

          <ChakraInput
            {...field}
            id={name}
            size={inputSize}
            aria-invalid={hasError || undefined}
            _invalid={{ borderColor: 'red.500', boxShadow: '0 0 0 1px red' }}
            {...props}
          />

          {hasError && (
            <Text mt={1} variant="paragraphSmall" color="danger">
              {String(fieldError.message ?? 'This field is required')}
            </Text>
          )}
        </Box>
      )}
    />
  );
};
