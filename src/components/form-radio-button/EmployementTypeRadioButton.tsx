import { useEmploymentTypes } from '@/hooks/modules/useEmploymentType';
import { RadioButton, type RadioButtonProps } from '../micro/RadioButton';
import { useMemo } from 'react';

type JobPositionSelectProps = Omit<RadioButtonProps, 'options'>;

export const EmploymentTypeRadioButton = ({
  name,
  label,
  radioSize = 'md',
  rules,
  ...props
}: JobPositionSelectProps) => {
  const { data, isFetching } = useEmploymentTypes();

  const options = useMemo(() => {
    if (!data) return [];
    if (isFetching) return [];
    return data.map(d => {
      return {
        value: d.ID,
        label: d.Name,
      };
    });
  }, [data, isFetching]);

  return (
    <RadioButton
      name={name}
      label={label}
      rules={rules}
      options={options}
      radioSize={radioSize}
      {...props}
    />
  );
};
