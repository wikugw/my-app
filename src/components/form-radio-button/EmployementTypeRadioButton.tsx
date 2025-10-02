import { RadioButton, type RadioButtonProps } from '../micro/RadioButton';

const jobPositions = [
  { label: 'Full Time', value: 'fulltime' },
  { label: 'Part Time', value: 'parttime' },
  { label: 'Contract', value: 'contract' },
];

type JobPositionSelectProps = Omit<RadioButtonProps, 'options'>;

export const EmployementTypeRadioButton = ({
  name,
  label,
  radioSize = 'md',
  rules,
  ...props
}: JobPositionSelectProps) => {
  return (
    <RadioButton
      name={name}
      label={label}
      rules={rules}
      options={jobPositions}
      radioSize={radioSize}
      {...props}
    />
  );
};
