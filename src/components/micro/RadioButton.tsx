import {
  Controller,
  useFormContext,
  type RegisterOptions,
} from 'react-hook-form';
import {
  RadioGroup,
  type RadioGroupRootProps,
  Box,
  HStack,
} from '@chakra-ui/react';
import { Text } from './Text';

type Size = 'sm' | 'md' | 'lg';

interface Option {
  label: string;
  value: string | number;
}

export interface RadioButtonProps
  extends Omit<RadioGroupRootProps, 'children'> {
  name: string;
  label?: string;
  rules?: RegisterOptions;
  options: Option[];
  radioSize?: Size;
}

export const RadioButton = ({
  name,
  label,
  rules,
  options,
  radioSize = 'md',
  ...props
}: RadioButtonProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];
  const hasError = !!fieldError;

  return (
    <Controller
      name={name}
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

          <RadioGroup.Root
            {...field}
            value={field.value ?? ''}
            onValueChange={field.onChange}
            size={radioSize}
            {...props}
          >
            <HStack align="start" gap={2}>
              {options.map(opt => (
                <RadioGroup.Item key={opt.value} value={String(opt.value)}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>{opt.label}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </HStack>
          </RadioGroup.Root>

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
