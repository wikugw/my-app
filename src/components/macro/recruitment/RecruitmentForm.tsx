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
import { GenericDialog, type DialogVariant } from '@/components/micro/modal/GenericDialog';
import { useState } from 'react';
import { useNav } from '@/hooks/useNav';

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
  const { back } = useNav();

  const [isFeebackDialogOpen, setIsFeebackDialogOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("success");
  const [feedbackMsg, setFeedbackMsg] = useState("Data Saved");

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
      setFeedbackType("success")
      setFeedbackMsg("Data Saved")
      setIsFeebackDialogOpen(true)
    } catch (e) {
      setFeedbackType("failure")
      setFeedbackMsg(JSON.stringify(e))
      setIsFeebackDialogOpen(true)
      console.error('Error adding document: ', e);
    }
  };

  const confirmSuccess = () => {
    setIsFeebackDialogOpen(false)
    back()
  }

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

      <GenericDialog
        isOpen={isFeebackDialogOpen}
        onOpenChange={() => setIsFeebackDialogOpen(false)}
        onConfirm={confirmSuccess}
        variant={feedbackType as DialogVariant}
        body={feedbackMsg}
      />
    </Flex>
  );
};

export default RecruitmentForm;
