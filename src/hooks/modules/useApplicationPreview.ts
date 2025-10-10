import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { fetchRecruitmentById } from '@/api-client/firebase/recruitment';
import {
  applicationFormSchema,
  type ApplicationFormInputs,
} from '@/validations/modules/application-form';
import { pdfToApplicationData } from '@/helpers/pdfExtractor';
import { uploadFileToStorage } from '@/helpers/storageHelpers';
import { addDocument } from '@/helpers/firestoreHelpers';
import { showFeedback } from '@/store/feedbackSlice';
import { useNav } from '@/hooks/useNav';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { fetchApplicationByRecruitmentAndEmail } from '@/api-client/firebase/application';

export function useApplicationPreview() {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const { back } = useNav();
  const [user] = useAuthState(auth);

  // 🧭 Retrieve recruitment ID from router state
  const location = useLocation();
  const { id } = location.state || {};

  // 🧠 Fetch recruitment data
  const { data, isLoading, error } = useQuery({
    queryKey: ['application', id],
    queryFn: () => fetchRecruitmentById(id!),
    enabled: !!id,
  });

  const {
    data: applicationData,
    isLoading: isLoadingApplication,
    error: isApplicationError,
  } = useQuery({
    queryKey: ['applications', id, user?.email],
    queryFn: () => fetchApplicationByRecruitmentAndEmail(id, user?.email ?? ''),
    enabled: !!id && !!user?.email,
  });

  // 📝 Form setup
  const methods = useForm<ApplicationFormInputs>({
    resolver: yupResolver(applicationFormSchema),
    defaultValues: { skills: [''] },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  // ✅ Handle submission
  const handleSubmit = async (data: ApplicationFormInputs) => {
    let fileUrl: string | null = null;

    if (selectedFile) {
      fileUrl = await uploadFileToStorage(selectedFile, 'applications');
    }

    const applicationData = {
      ...data,
      recruitmentId: id,
      fileUrl,
      createdAt: new Date(),
    };

    await addDocument('applications', applicationData);

    methods.reset();
    setIsOpenForm(false);
    setSelectedFile(null);

    dispatch(
      showFeedback({
        type: 'success',
        message: 'Data updated successfully',
        onConfirm: back,
      })
    );
  };

  const onSubmit = async (data: ApplicationFormInputs) => {
    try {
      await handleSubmit(data);
    } catch (error) {
      console.error('Error adding document:', error);
      dispatch(
        showFeedback({ type: 'failure', message: 'Failed to save data' })
      );
    }
  };

  // 📄 Handle applying with CV file
  const handleApplyWithCV = async (file: File) => {
    const { name, email, skills } = await pdfToApplicationData(file);
    methods.setValue('email', email);
    methods.setValue('name', name);
    methods.setValue('skills', skills);
    setSelectedFile(file);
    setIsOpenForm(true);
  };

  const handleCancel = () => {
    setIsOpenForm(false);
    methods.reset();
  };

  const handleUploadCV = (file: File) => {
    setSelectedFile(file);
  };

  const isApplied = useMemo(() => {
    return !!applicationData?.id;
  }, [applicationData?.id]);

  return {
    id,
    data,
    isLoading,
    error,
    isOpenForm,
    setIsOpenForm,
    methods,
    selectedFile,
    handleCancel,
    handleApplyWithCV,
    handleUploadCV,
    onSubmit,
    isApplied,
    isApplicationError,
    isLoadingApplication,
  };
}
