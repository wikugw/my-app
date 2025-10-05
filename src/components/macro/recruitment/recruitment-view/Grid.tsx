import { Text, SimpleGrid } from '@chakra-ui/react';
import type { RecruitmentPreviewType } from '@/types/modules/Recruitment';
import { RequirementViewCard } from './Card';

type RecruitmentViewGridProps = {
  recruitments: RecruitmentPreviewType[];
  detailPath: string;
};

export function RecruitmentViewGrid({
  recruitments,
  detailPath,
}: RecruitmentViewGridProps) {
  return (
    <>
      {!recruitments || recruitments.length === 0 ? (
        <Text>No recruitments found</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          {recruitments.map((r, index) => (
            <RequirementViewCard
              key={r.id ?? index}
              r={r}
              detailPath={`${detailPath}`}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
}
