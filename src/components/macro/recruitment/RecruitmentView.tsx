import { Box } from '@chakra-ui/react';
import { NavButton } from '../../micro/button/NavButton';
import { FullScreenSpinner } from '@/components/micro/FullScreenSpinner';
import { NoDataContainer } from '@/components/micro/NoDataContainer';
import { RecruitmentViewGrid } from './recruitment-view/Grid';
import { useActiveRecruitments } from '@/hooks/modules/recruitment/useActiveRecruitment';
import { getCurrentDate } from '@/helpers/dateFormat';

const dateTime = getCurrentDate()

const RecruitmentView = () => {
  const {
      data: recruitments,
      isLoading,
      isError,
    } = useActiveRecruitments(dateTime);

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  if (isError) {
    return <NoDataContainer text="Failed to load recruitments" />;
  }

  return (
    <Box>
      <NavButton to="/recruitment/create" mb={4}>
        Create
      </NavButton>

      <RecruitmentViewGrid
        recruitments={recruitments ?? []}
        detailPath="/recruitment/detail/"
      />
    </Box>
  );
};

export default RecruitmentView;
