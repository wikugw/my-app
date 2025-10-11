import { Box, Flex } from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import RecruitmentFormFields from './recruitment-form/RecruitmentFormFields';
import RecruitmentPreview from './RecruitmentPreview';
import { useRecruitmentForm } from '@/hooks/modules/useRecruitmentForm';
import { FullScreenSpinner } from '@/components/micro/FullScreenSpinner';
import { NoDataContainer } from '@/components/micro/NoDataContainer';
import { Applicants } from './recruitment-form/Applicants';
const RecruitmentForm = () => {
  const location = useLocation();
  const { id } = location.state || {};

  const {
    methods,
    watchedValues,
    isLoading,
    error,
    sortedApplications,
    onSubmit,
  } = useRecruitmentForm(id);

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  if (error) {
    return <NoDataContainer text="Failed to load recruitment" />;
  }

  return (
    <Flex w="100%" gap={4}>
      <Box flex="1">
        <FormProvider {...methods}>
          <RecruitmentFormFields onSubmit={onSubmit} />
        </FormProvider>
      </Box>

      <Box flex="1">
        <RecruitmentPreview values={watchedValues} />
        <Applicants 
          applications={sortedApplications} 
          recruitmentPositionName={watchedValues.position || ''} 
          />
      </Box>
    </Flex>
  );
};

export default RecruitmentForm;
