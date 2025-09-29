import { Box } from '@chakra-ui/react';
import { NavButton } from '../../micro/button/NavButton';

const RecruitmentView = () => {
  return (
    <Box>
      <NavButton to="/recruitment/create">Create</NavButton>
    </Box>
  );
};

export default RecruitmentView;
