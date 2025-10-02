import { Box, Flex, Stack } from '@chakra-ui/react';
import { DateRangeInput } from '../../micro/DateRangePicker';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { JobPositionSelect } from '../form-select/JobPositionSelect';
import { Input } from '../../micro/input/Input';
import { EmployementTypeRadioButton } from '../../form-radio-button/EmployementTypeRadioButton';
import { Button } from '../../micro/button/Button';

const schema = yup.object({
  applicationDates: yup
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
  position: yup.string().required(),
  salary: yup.number().required().min(0),
  employementType: yup.string().required(),
  requirements: yup
    .array()
    .of(yup.string().required('Skills are required'))
    .min(1, 'Skills are required')
    .required('Skills are required'),
});

type RecrutmentFormInputs = yup.InferType<typeof schema>;

const RecruitmentForm = () => {
  const methods = useForm<RecrutmentFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      applicationDates: [],
      requirements: [''],
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = () => {
    console.log();
  };

  const addRequirement = () => {
    const current = getValues('requirements');
    const updated = [...current, ''];
    setValue('requirements', updated, { shouldValidate: true });
  };

  const removeRequirement = (index: number) => {
    const current = getValues('requirements') || [];
    const updated = current.filter((_, i) => i !== index);
    setValue('requirements', updated, { shouldValidate: true });
  };

  return (
    <Flex w="100%" gap={4}>
      <Box flex="1">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4}>
              <DateRangeInput
                name="applicationDates"
                label="Jangka Waktu Rekrutmen"
                inputSize="md"
              />

              <JobPositionSelect name="position" label="Posisi" />

              <Input name="salary" type="number" label="Gaji" />

              <EmployementTypeRadioButton
                name="employementType"
                label="Tipe Rekrutmen"
              />

              <Stack gap={2}>
                {getValues('requirements').map((_, index) => (
                  <Box key={index} display="flex" gap={2}>
                    <Input name={`requirements.${index}`} />
                    <Button
                      colorKey="danger"
                      size="sm"
                      onClick={() => removeRequirement(index)}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
              </Stack>

              <Button
                mt={2}
                size="sm"
                variantKey={'outline'}
                onClick={() => addRequirement()}
              >
                Add Requirement
              </Button>

              <Button type="submit" size={'sm'}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Box>
      <Box flex="1">box 2</Box>
    </Flex>
  );
};

export default RecruitmentForm;
