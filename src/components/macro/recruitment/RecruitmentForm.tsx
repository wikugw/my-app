import { Box, Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';

import { addDocument } from '../../../helpers/firestoreHelpers';
import RecruitmentFormFields from './recruitment-form/RecruitmentFormFields';
import RecruitmentPreview from './RecruitmentPreview';
import type { RecruitmentPreviewType } from '@/types/modules/Recruitment';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';

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

export type RecrutmentFormInputs = yup.InferType<typeof schema>;

const RecruitmentForm = () => {
  const [user] = useAuthState(auth);

  const methods = useForm<RecrutmentFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      requirements: [""],
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: RecrutmentFormInputs) => {
    try {
      const payload: RecruitmentPreviewType = {
        ...data,
        applicationDates: data.applicationDates?.map(d =>
          d ? new Date(d) : null
        ),
        createdAt: new Date().toISOString(),
        createdBy: {
          email: user?.email ?? "",
          name: user?.displayName ?? ""
        }
      };

      const docRef = await addDocument('recruitments', payload);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <Flex w="100%" gap={4}>
      <Box flex="1">
        {/* i want to move this elements to other components */}
        <FormProvider {...methods}>
          <RecruitmentFormFields onSubmit={onSubmit} />
        </FormProvider>
      </Box>
      <Box flex="1">
        {/* i need inputted data from form to be displayed here */}
        <RecruitmentPreview values={useWatch({ control: methods.control })} />
      </Box>
    </Flex>
  );
};

export default RecruitmentForm;
