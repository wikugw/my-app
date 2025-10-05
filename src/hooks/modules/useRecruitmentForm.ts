import { useState, useEffect } from 'react';
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

export function useRecruitmentForm(id?: string) {
  const [user] = useAuthState(auth);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'success' | 'failure'>(
    'success'
  );
  const [feedbackMsg, setFeedbackMsg] = useState('Data Saved');

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
        applicationDates: data.applicationDates?.map(d => d.toDate?.() ?? d),
      });
    }
  }, [data, methods]);

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
        setFeedbackMsg('Data updated successfully');
      } else {
        // 🔹 ADD NEW DOCUMENT
        await addDocument('recruitments', payload);
        setFeedbackMsg('Data saved successfully');
      }

      setFeedbackType('success');
      setDialogOpen(true);
    } catch (e) {
      console.error('Error adding document:', e);
      setFeedbackType('failure');
      setFeedbackMsg(JSON.stringify(e));
      setDialogOpen(true);
    }
  };

  return {
    methods,
    watchedValues,
    isLoading,
    error,
    onSubmit,
    isDialogOpen,
    setDialogOpen,
    feedbackType,
    feedbackMsg,
  };
}

