import * as yup from 'yup';

export const recruitmentFormSchema = yup.object({
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

export type RecrutmentFormInputs = yup.InferType<typeof recruitmentFormSchema>;
