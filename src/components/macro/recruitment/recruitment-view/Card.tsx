import { Box } from '@chakra-ui/react';
import { Text } from '@/components/micro/Text';
import { formatIDR } from '@/helpers/textFormat';
import { SimpleDate } from '@/helpers/dateFormat';
import { NavButton } from '@/components/micro/button/NavButton';
import type { RecruitmentPreviewType } from '@/types/modules/Recruitment';

type RequirementViewCardProps = {
  r: RecruitmentPreviewType;
  detailPath: string;
};

export function RequirementViewCard({
  r,
  detailPath,
}: RequirementViewCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} shadow="sm">
      <Text fontWeight="bold">{r.position}</Text>
      <Text>Salary: {formatIDR(r.salary)}</Text>
      <Text>Type: {r.employmentType}</Text>
      <Text fontSize="sm" color="gray">
        Created by {r.createdBy ?? 'Unknown'} on{' '}
        {r.createdAt && SimpleDate(r.createdAt)}
      </Text>
      <NavButton
        to={detailPath}
        options={{ state: { id: r.id } }}
        size="sm"
        mt={2}
      >
        View Details
      </NavButton>
    </Box>
  );
}
