import { Box, Input as ChakraInput, Stack } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState } from "react";
import { Text } from "./Text";
import { customDateFormat } from "@/helpers/dateFormat";

type Size = "sm" | "md" | "lg";

interface DateRangeInputProps {
  name: string;
  label?: string;
  inputSize?: Size;
  placeholderStart?: string;
  placeholderEnd?: string;
}

export const DateRangeInput = ({
  name,
  label,
  inputSize = "md",
  placeholderStart = "Start Date",
  placeholderEnd = "End Date",
}: DateRangeInputProps) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];
  const [showCalendar, setShowCalendar] = useState(false);
  const value = watch(name) || [null, null];
  const [startDate, endDate] = value;

  const formatDate = (date?: Date | null) =>
    date ? customDateFormat(date, "YYYY-MM-DD") : "";

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[null, null]}
      render={() => (
        <Box w="100%" position="relative">
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

          <Stack direction={{ base: "column", md: "row" }} gap={2}>
            <ChakraInput
              readOnly
              size={inputSize}
              value={formatDate(startDate)}
              placeholder={placeholderStart}
              onClick={() => setShowCalendar(!showCalendar)}
            />
            <ChakraInput
              readOnly
              size={inputSize}
              value={formatDate(endDate)}
              placeholder={placeholderEnd}
              onClick={() => setShowCalendar(!showCalendar)}
            />
          </Stack>

          {showCalendar && (
            <Box
              position="absolute"
              zIndex={10}
              bg="white"
              mt={2}
              boxShadow="md"
              borderRadius="md"
            >
              <DayPicker
                mode="range"
                selected={{
                  from: startDate || undefined,
                  to: endDate || undefined,
                }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setValue(name, [range.from, range.to], {
                      shouldValidate: true,
                    });
                    setShowCalendar(false); // auto-close when done
                  } else {
                    setValue(name, [range?.from ?? null, range?.to ?? null], {
                      shouldValidate: true,
                    });
                  }
                }}
              />
            </Box>
          )}

          {fieldError && (
            <Text mt={1} variant="paragraphSmall" color="danger">
              {String(fieldError.message ?? "This field is required")}
            </Text>
          )}
        </Box>
      )}
    />
  );
};
