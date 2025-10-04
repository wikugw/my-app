import {
  CloseButton,
  Dialog,
  Portal,
  Icon,
  Flex,
} from '@chakra-ui/react';
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineWarning,
} from 'react-icons/ai';
import { useMemo, type ReactNode } from 'react';
import { Button, type ButtonProps } from '../button/Button';
import { Text } from '../Text';

export type DialogVariant = 'success' | 'failure' | 'warning';

interface GenericDialogProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
  body?: ReactNode;
  confirmText?: string;
  variant?: DialogVariant;
}

const variantConfig: Record<
  DialogVariant,
  { bg: string; border: string; color: ButtonProps["colorKey"]; icon: any; button: ButtonProps["colorKey"], iconColor: string }
> = {
  success: {
    bg: 'green.50',
    border: 'green.200',
    color: 'success',
    icon: AiOutlineCheckCircle,
    button: 'success',
    iconColor: "green.500",
  },
  failure: {
    bg: 'red.50',
    border: 'red.200',
    color: 'danger',
    icon: AiOutlineCloseCircle,
    button: 'danger',
    iconColor: "red.500",
  },
  warning: {
    bg: 'yellow.50',
    border: 'yellow.200',
    color: 'warning',
    icon: AiOutlineWarning,
    button: 'warning',
    iconColor: "yellow.500",
  },
};

export const GenericDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
  body = 'Action completed',
  confirmText = 'OK',
  variant = 'success',
}: GenericDialogProps) => {
  const config = useMemo(() => variantConfig[variant], [variant]);

  return (
    <Dialog.Root open={isOpen}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg={config.bg}
            border="1px solid"
            borderColor={config.border}
            borderRadius="xl"
            shadow="lg"
            p={6}
          >
            <Flex direction="column" align="center" textAlign="center" gap={3}>
              <Icon as={config.icon} boxSize={20} color={config.iconColor} />
              <Text variant="paragraphMedium" color={config.color}>
                {body}
              </Text>
            </Flex>

            <Dialog.Footer justifyContent="center" mt={2}>
              <Button
                colorKey={config.button}
                onClick={onConfirm}
                width="full"
              >
                {confirmText}
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton
                onClick={onOpenChange}
                position="absolute"
                top={2}
                right={2}
                size="sm"
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
