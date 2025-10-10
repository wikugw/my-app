import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from '@tanstack/react-query';
import { auth } from '@/firebase';
import { addDocument, updateDocument } from '@/helpers/firestoreHelpers';
import { fetchRecruitmentById } from '@/api-client/firebase/recruitment';
import {
  recruitmentFormSchema,
  type RecrutmentFormInputs,
} from '@/validations/modules/recruitment-form';
import type { RecruitmentFormType } from '@/types/modules/Recruitment';
import { useDispatch } from 'react-redux';
import { showFeedback } from '@/store/feedbackSlice';
import { useNav } from '../useNav';

export function useRecruitmentForm(id?: string) {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const { back } = useNav();

  // Query Firestore when `id` is available
  const { data, isLoading, error } = useQuery({
    queryKey: ['recruitment', id],
    queryFn: () => fetchRecruitmentById(id!),
    enabled: !!id,
  });

  const methods = useForm<RecrutmentFormInputs>({
    resolver: yupResolver(recruitmentFormSchema),
    defaultValues: { requirements: [''] },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const watchedValues = useWatch({ control: methods.control });

  useEffect(() => {
    if (data) {
      methods.reset({
        ...data,
      });
    }
  }, [data, methods]);

  const onSuccessConfirm = () => {
    back();
  };

  const onSubmit = async (formData: RecrutmentFormInputs) => {
    try {
      const payload: RecruitmentFormType = {
        ...formData,
        applicationDates: formData.applicationDates?.map(d =>
          d ? new Date(d) : null
        ),
        createdBy: {
          email: user?.email ?? '',
          name: user?.displayName ?? '',
        },
      };

      if (id) {
        // 🔹 UPDATE EXISTING DOCUMENT
        updateDocument('recruitments', id, payload);
        dispatch(
          showFeedback({
            type: 'success',
            message: 'Data updated successfully',
            onConfirm: onSuccessConfirm,
          })
        );
      } else {
        // 🔹 ADD NEW DOCUMENT
        await addDocument('recruitments', payload);
        dispatch(
          showFeedback({
            type: 'success',
            message: 'Data saved successfully',
            onConfirm: onSuccessConfirm,
          })
        );
      }
    } catch (e) {
      console.error('Error adding document:', e);
      dispatch(
        showFeedback({ type: 'failure', message: 'Failed to save data' })
      );
    }
  };

  return {
    methods,
    watchedValues,
    isLoading,
    error,
    onSubmit,
  };
}
