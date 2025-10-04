import {
  createListCollection,
  Portal,
  Select,
  type SelectRootProps,
} from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import {
  Controller,
  type RegisterOptions,
  useFormContext,
} from 'react-hook-form';

import { Text } from './Text';

type Size = 'sm' | 'md' | 'lg';

interface Option {
  label: string;
  value: string | number;
}

export interface FormSelectProps
  extends Omit<SelectRootProps, 'children' | 'collection'> {
  name: string;
  label?: string;
  selectSize?: Size;
  rules?: RegisterOptions;
  options: Option[]; // ✅ macro still sends options
  placeholder?: string;
}

export const FormSelect = ({
  name,
  label,
  selectSize = 'md',
  rules,
  options,
  placeholder = 'Select option',
  ...props
}: FormSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];
  const hasError = !!fieldError;

  // ✅ convert options -> collection for Chakra v3
  const collection = createListCollection({
    items: options.map(opt => ({
      label: opt.label,
      value: String(opt.value),
    })),
  });

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

          <Select.Root
            {...field}
            collection={collection} // ✅ pass collection to Root
            size={selectSize}
            {...props}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder={placeholder} />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>

            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {collection.items.map(item => (
                    <Select.Item key={item.value} item={item}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>

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
