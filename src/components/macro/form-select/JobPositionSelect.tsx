import { FormSelect, type FormSelectProps } from '../../micro/Select';

const jobPositions = [
  { label: 'Frontend Developer', value: 'Frontend Developer' },
  { label: 'Backend Developer', value: 'Backend Developer' },
  { label: 'Full Stack Developer', value: 'Full Stack Developer' },
  { label: 'Mobile Developer', value: 'Mobile Developer' },
  { label: 'DevOps Engineer', value: 'DevOps Engineer' },
  { label: 'Data Scientist', value: 'Data Scientist' },
  { label: 'Machine Learning Engineer', value: 'Machine Learning Engineer' },
  { label: 'UI/UX Designer', value: 'UI/UX Designer' },
  { label: 'QA Engineer', value: 'QA Engineer' },
  { label: 'Product Manager', value: 'Product Manager' },
];

type JobPositionSelectProps = Omit<FormSelectProps, 'options'>;

export const JobPositionSelect = ({
  name,
  label,
  selectSize = 'md',
  rules,
  placeholder = 'Select option',
  ...props
}: JobPositionSelectProps) => {
  return (
    <FormSelect
      name={name}
      label={label}
      rules={rules}
      options={jobPositions}
      placeholder={placeholder}
      selectSize={selectSize}
      {...props}
    />
  );
};
