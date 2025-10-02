import { FormSelect, type FormSelectProps } from '../../micro/Select';

const jobPositions = [
  { label: 'Frontend Developer', value: 'frontendDeveloper' },
  { label: 'Backend Developer', value: 'backendDeveloper' },
  { label: 'Full Stack Developer', value: 'fullstackDeveloper' },
  { label: 'Mobile Developer', value: 'mobileDeveloper' },
  { label: 'DevOps Engineer', value: 'devopsEngineer' },
  { label: 'Data Scientist', value: 'dataScientist' },
  { label: 'Machine Learning Engineer', value: 'machineLearningEngineer' },
  { label: 'UI/UX Designer', value: 'uiUxDesigner' },
  { label: 'QA Engineer', value: 'qaEngineer' },
  { label: 'Product Manager', value: 'productManager' },
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
