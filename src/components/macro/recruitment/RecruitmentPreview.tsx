// RecruitmentPreview.tsx
import { Box, Stack } from '@chakra-ui/react';
import { Text } from '@/components/micro/Text';

import { SimpleDate } from '@/helpers/dateFormat';
import { formatIDR } from '@/helpers/textFormat';
import type { RecrutmentFormInputs } from '@/validations/modules/recruitment-form';

const RecruitmentPreview = ({
  values,
}: {
  values: Partial<RecrutmentFormInputs>;
}) => {
  if (!values) return null;

  return (
    <Box border="1px solid #ccc" p={4} rounded="md">
      <Text fontWeight="bold" mb={2}>
        Preview Data
      </Text>
      <Stack gap={2}>
        <Text>Posisi: {values.position}</Text>
        <Text>Gaji: {formatIDR(values.salary ?? 0)}</Text>
        <Text>Jenis: {values.employementType}</Text>
        <Text>
          Jangka waktu:{' '}
          {values.applicationDates?.map(d => SimpleDate(d ?? '')).join(' → ')}
        </Text>
        <Box>
          <Text>Requirements:</Text>
          <ul>
            {values.requirements?.map((req, i) => (
              <Text key={i}>{req}</Text>
            ))}
          </ul>
        </Box>
      </Stack>
    </Box>
  );
};

export default RecruitmentPreview;
