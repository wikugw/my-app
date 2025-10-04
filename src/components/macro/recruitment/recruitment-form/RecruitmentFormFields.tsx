import { Box, Stack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { DateRangeInput } from '@/components/micro/DateRangePicker';

import { EmployementTypeRadioButton } from '../../../form-radio-button/EmployementTypeRadioButton';
import { Button } from '../../../micro/button/Button';
import { Input } from '../../../micro/input/Input';
import { JobPositionSelect } from '../../form-select/JobPositionSelect';
import type { RecrutmentFormInputs } from '../RecruitmentForm';

import { Text } from '@/components/micro/Text';

type Props = {
  onSubmit: (data: RecrutmentFormInputs) => void;
};

const RecruitmentFormFields = ({ onSubmit }: Props) => {
  const { handleSubmit, getValues, setValue, formState } =
    useFormContext<RecrutmentFormInputs>();

  const addRequirement = () => {
    const current = getValues('requirements');
    setValue('requirements', [...current, ''], { shouldValidate: true });
  };

  const removeRequirement = (index: number) => {
    const current = getValues('requirements') || [];
    setValue(
      'requirements',
      current.filter((_, i: number) => i !== index),
      {
        shouldValidate: true,
      }
    );
  };

  return (
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
          {getValues('requirements').map((_, index: number) => (
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
          onClick={addRequirement}
        >
          Add Requirement
        </Button>

        <Button type="submit" size="sm">
          {formState.isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Stack>
    </form>
  );
};

export default RecruitmentFormFields;
