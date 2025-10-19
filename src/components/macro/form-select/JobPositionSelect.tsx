import { useDepartments } from '@/hooks/modules/useDepartment';
import { FormSelect, type FormSelectProps } from '../../micro/Select';
import { useMemo } from 'react';

type JobPositionSelectProps = Omit<FormSelectProps, 'options'>;

export const JobPositionSelect = ({
  name,
  label,
  selectSize = 'md',
  rules,
  placeholder = 'Select option',
  ...props
}: JobPositionSelectProps) => {

  const { data, isFetching } = useDepartments();

  const options = useMemo(() => {
    if (!data) return []
    if (isFetching) return []
    return data.map((d) => {
      return {
        value: d.Name,
        label: d.Name
      }
    })
  }, [data])
  return (
    <FormSelect
      name={name}
      label={label}
      rules={rules}
      options={options}
      placeholder={isFetching ? "getting data" : placeholder}
      selectSize={selectSize}
      {...props}
    />
  );
};
