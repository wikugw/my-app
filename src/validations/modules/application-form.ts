import * as yup from 'yup';

export const applicationFormSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  name: yup.string().required(),
  skills: yup
    .array()
    .of(yup.string().required('Skills are required'))
    .min(1, 'Skills are required')
    .required('Skills are required'),
});

export type ApplicationFormInputs = yup.InferType<typeof applicationFormSchema>;
