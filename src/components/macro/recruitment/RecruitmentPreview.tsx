// RecruitmentPreview.tsx
import { Box, Stack, Text } from '@chakra-ui/react';

import type { RecrutmentFormInputs } from './RecruitmentForm';

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
        <Text>Position: {values.position}</Text>
        <Text>Salary: {values.salary}</Text>
        <Text>Type: {values.employementType}</Text>
        <Text>Dates: {values.applicationDates?.join(' → ')}</Text>
        <Box>
          <Text>Requirements:</Text>
          <ul>
            {values.requirements?.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </Box>
      </Stack>
    </Box>
  );
};

export default RecruitmentPreview;
