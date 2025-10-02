import {
  Controller,
  useFormContext,
  type RegisterOptions,
} from 'react-hook-form';
import { Input as ChakraInput, Box, Stack } from '@chakra-ui/react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Text } from './Text';
import '../../styles.css';

type Size = 'sm' | 'md' | 'lg';

interface DateRangeInputProps {
  name: string;
  label?: string;
  inputSize?: Size;
  rules?: RegisterOptions;
  placeholderStart?: string;
  placeholderEnd?: string;
}

export const DateRangeInput = ({
  name,
  label,
  inputSize = 'md',
  rules,
  placeholderStart = 'Start Date',
  placeholderEnd = 'End Date',
}: DateRangeInputProps) => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const fieldError = errors[name];
  const hasError = !!fieldError;

  // initialize start/end from form values if available
  const [startDate, endDate] = watch(name) || [null, null];

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={[null, null]}
      render={() => (
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

          <Stack direction={{ base: 'column', md: 'row' }} gap={2} w="100%">
            <Box flex="1">
              <ReactDatePicker
                selected={startDate}
                onChange={date => {
                  setValue(name, [date, endDate], { shouldValidate: true });
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText={placeholderStart}
                customInput={<ChakraInput size={inputSize} w="100%" />}
                wrapperClassName="datepicker-wrapper"
              />
            </Box>
            <Box flex="1">
              <ReactDatePicker
                selected={endDate}
                onChange={date => {
                  setValue(name, [startDate, date], { shouldValidate: true });
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || undefined}
                placeholderText={placeholderEnd}
                customInput={<ChakraInput size={inputSize} w="100%" />}
                wrapperClassName="datepicker-wrapper"
              />
            </Box>
          </Stack>

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
