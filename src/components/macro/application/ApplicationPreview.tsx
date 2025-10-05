import { useQuery } from '@tanstack/react-query';
import RecruitmentPreview from '../recruitment/RecruitmentPreview';
import { fetchRecruitmentById } from '@/api-client/firebase/recruitment';
import { useLocation } from 'react-router-dom';
import { FullScreenSpinner } from '@/components/micro/FullScreenSpinner';
import { NoDataContainer } from '@/components/micro/NoDataContainer';
import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { ApplicationForm } from './ApplicationForm';
import { FormProvider, useForm } from 'react-hook-form';
import {
  applicationFormSchema,
  type ApplicationFormInputs,
} from '@/validations/modules/application-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { pdfToApplicationData } from '@/helpers/pdfExtractor';
import { ApplicationPreviewHeaderButtons } from './application-preview/HeaderButtons';

export function ApplicationPreview() {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const location = useLocation();
  const { id } = location.state || {};

  const { data, isLoading, error } = useQuery({
    queryKey: ['application', id],
    queryFn: () => fetchRecruitmentById(id!),
    enabled: !!id,
  });

  const methods = useForm<ApplicationFormInputs>({
    resolver: yupResolver(applicationFormSchema),
    defaultValues: { skills: [''] },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: ApplicationFormInputs) => {
    console.log(data);
  };

  const handleApplyWithCV = async (file: File) => {
    const { name, email, skills } = await pdfToApplicationData(file);
    // 🧾 Update form values
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

  const handleUploadCV = async (file: File) => {
    setSelectedFile(file);
  };

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  if (error) {
    return <NoDataContainer text="Failed to load recruitment" />;
  }

  return (
    <Flex w="100%" gap={4}>
      <Box flex="1">{data && <RecruitmentPreview values={data} />}</Box>
      <Box flex="1">
        <ApplicationPreviewHeaderButtons
          isOpenForm={isOpenForm}
          setIsOpenForm={setIsOpenForm}
          handleCancel={handleCancel}
          handleUploadCV={handleApplyWithCV}
        />
        {isOpenForm && (
          <FormProvider {...methods}>
            <ApplicationForm
              onSubmit={onSubmit}
              handleUploadCV={handleUploadCV}
              file={selectedFile}
            />
          </FormProvider>
        )}
      </Box>
    </Flex>
  );
}
