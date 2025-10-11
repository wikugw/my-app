import { Button } from "@/components/micro/button/Button";
import { kApplicationStatus, type ApplicationStatus } from "@/constants/application-status";
import { Flex } from "@chakra-ui/react";

type ActionButtonsProps = {
  onConfirm: (status: ApplicationStatus) => void;
}

export function ActionButtons({ onConfirm }: ActionButtonsProps) {
  return (
    <Flex justify="flex-end" gap={3}>
      <Button colorKey="danger" onClick={() => { onConfirm(kApplicationStatus.declined); }}>
        Decline
      </Button>
      <Button colorKey="success" onClick={() => { onConfirm(kApplicationStatus.approvedForInterview); }}>
        Proceed to Interview
      </Button>
    </Flex>
  )
}