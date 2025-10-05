import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchRecruitments } from '@/api-client/firebase/recruitment';
import { FullScreenSpinner } from '@/components/micro/FullScreenSpinner';
import { NoDataContainer } from '@/components/micro/NoDataContainer';
import { RecruitmentViewGrid } from '../recruitment/recruitment-view/Grid';
import { Text } from '@/components/micro/Text';

const ApplicationView = () => {
  const {
    data: recruitments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['recruitments'],
    queryFn: fetchRecruitments,
  });

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  if (error) {
    return <NoDataContainer text="Failed to load recruitments" />;
  }

  return (
    <Box>
      <Text mb={4}>Lowongan yang tersedia</Text>
      <RecruitmentViewGrid
        recruitments={recruitments ?? []}
        detailPath="/application/detail/"
      />
    </Box>
  );
};

export default ApplicationView;
