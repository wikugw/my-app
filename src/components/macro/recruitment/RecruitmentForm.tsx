import { Box, Flex } from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useNav } from '@/hooks/useNav';
import { GenericDialog } from '@/components/micro/modal/GenericDialog';
import RecruitmentFormFields from './recruitment-form/RecruitmentFormFields';
import RecruitmentPreview from './RecruitmentPreview';
import { useRecruitmentForm } from '@/hooks/modules/useRecruitmentForm';
import { FullScreenSpinner } from '@/components/micro/FullScreenSpinner';
import { NoDataContainer } from '@/components/micro/NoDataContainer';

const RecruitmentForm = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const { back } = useNav();

  const {
    methods,
    watchedValues,
    isLoading,
    error,
    onSubmit,
    isDialogOpen,
    setDialogOpen,
    feedbackType,
    feedbackMsg,
  } = useRecruitmentForm(id);

  const confirmSuccess = () => {
    setDialogOpen(false);
    back();
  };

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
      </Box>

      <GenericDialog
        isOpen={isDialogOpen}
        onOpenChange={() => setDialogOpen(false)}
        onConfirm={confirmSuccess}
        variant={feedbackType}
        body={feedbackMsg}
      />
    </Flex>
  );
};

export default RecruitmentForm;
