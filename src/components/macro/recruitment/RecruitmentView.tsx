import { Box, SimpleGrid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { NavButton } from '../../micro/button/NavButton';
import { fetchRecruitments } from '@/api-client/firebase/recruitment';
import { Text } from '@/components/micro/Text';
import { formatIDR } from '@/helpers/textFormat';
import { SimpleDate } from '@/helpers/dateFormat';
import { FullScreenSpinner } from '@/components/micro/FullScreenSpinner';
import { NoDataContainer } from '@/components/micro/NoDataContainer';

const RecruitmentView = () => {
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
      <NavButton to="/recruitment/create" mb={4}>
        Create
      </NavButton>

      {!recruitments || recruitments.length === 0 ? (
        <Text>No recruitments found</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          {recruitments.map((r, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              shadow="sm"
            >
              <Text fontWeight="bold">{r.position}</Text>
              <Text>Salary: {formatIDR(r.salary)}</Text>
              <Text>Type: {r.employementType}</Text>
              <Text fontSize="sm" color="gray">
                Created by {r.createdBy?.name ?? 'Unknown'} on{' '}
                {r.createdAt && SimpleDate(r.createdAt.toDate())}
              </Text>
              <NavButton
                to="/recruitment/detail"
                options={{ state: { id: r.id } }}
                size="sm"
                mt={2}
              >
                View Details
              </NavButton>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default RecruitmentView;
