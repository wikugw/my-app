import { Box } from '@chakra-ui/react';
import { DateRangeInput } from '../../micro/DateRangePicker';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Text } from '../../micro/Text';

const schema = yup.object({
  bookingDates: yup
    .array()
    .of(yup.date().nullable())
    .required('Please select a date range') // ensures the array exists
    .test(
      'both-dates-selected',
      'Please select both start and end dates',
      value => {
        if (!value) return false;
        const [start, end] = value;
        return !!start && !!end;
      }
    )
    .test('end-after-start', 'End date cannot be before start date', value => {
      if (!value) return false;
      const [start, end] = value;
      if (!start || !end) return false;
      return end >= start;
    }),
});

type RecrutmentFormInputs = yup.InferType<typeof schema>;

const RecruitmentForm = () => {
  const methods = useForm<RecrutmentFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: { bookingDates: [] },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = () => {};

  return (
    <Box>
      <Text>{isSubmitting}</Text>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DateRangeInput
            name="bookingDates"
            label="Booking Period"
            rules={{ required: 'Please select a date range' }}
            inputSize="md"
          />
        </form>
      </FormProvider>
    </Box>
  );
};

export default RecruitmentForm;
