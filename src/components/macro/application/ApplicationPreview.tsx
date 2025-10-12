import { Box, Flex } from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { FullScreenSpinner } from '@/components/micro/FullScreenSpinner';
import { NoDataContainer } from '@/components/micro/NoDataContainer';
import RecruitmentPreview from '../recruitment/RecruitmentPreview';
import { ApplicationForm } from './ApplicationForm';
import { ApplicationPreviewHeaderButtons } from './application-preview/HeaderButtons';
import { useApplicationPreview } from '@/hooks/modules/useApplicationPreview';

export function ApplicationPreview() {
  const {
    data,
    isLoading,
    error,
    isOpenForm,
    setIsOpenForm,
    methods,
    handleCancel,
    handleApplyWithCV,
    handleUploadCV,
    onSubmit,
    selectedFile,
  } = useApplicationPreview();

  if (isLoading) return <FullScreenSpinner />;
  if (error) return <NoDataContainer text="Failed to load recruitment" />;

  return (
    <Flex w="100%" gap={4} direction={{ base: 'column', md: 'row' }}>
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
