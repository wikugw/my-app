import { Box, Flex, ProgressCircle, VStack } from '@chakra-ui/react';
import { Text } from '@/components/micro/Text';
import type { MatchedApplication } from '@/hooks/modules/useRecruitmentForm';
interface ApplicationMatchListProps {
  applications: MatchedApplication[];
}

export function Applicants({ applications }: ApplicationMatchListProps) {
  if (!applications?.length) {
    return <Text color="gray">No applications yet</Text>;
  }

  return (
    <Box mt={6}>
      <Text fontWeight="bold" mb={3}>
        Applicants (by match %)
      </Text>

      <VStack align="stretch" gap={3}>
        {applications.map((app) => (
          <Flex
            key={app.id}
            borderWidth="1px"
            borderRadius="lg"
            p={3}
            align="center"
            justify="space-between"
            bg="gray.50"
            _hover={{ bg: 'gray.100' }}
          >
            {/* 🧍 Applicant Info */}
            <Box flex="1">
              <Text fontWeight="medium">{app.name ?? 'Unnamed Applicant'}</Text>
              <Text fontSize="sm" color="gray">
                {app.email}
              </Text>
            </Box>

            {/* 🎯 Match Circle */}
            <Flex align="center" gap={2}>
              <Box w="50px" h="50px">
                <ProgressCircle.Root value={app.match}>
                  <ProgressCircle.Circle>
                    <ProgressCircle.Track />
                    <ProgressCircle.Range />
                  </ProgressCircle.Circle>
                </ProgressCircle.Root>
              </Box>
              <Text fontSize="sm" fontWeight="medium">
                {app.match}%
              </Text>
            </Flex>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
}
