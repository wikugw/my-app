import { Button } from '@/components/micro/button/Button';
import { PdfUploader } from '@/components/micro/PdfUploader';
import { Text } from '@/components/micro/Text';
import { Flex } from '@chakra-ui/react';
import type { Dispatch, SetStateAction } from 'react';

interface ApplicationPreviewHeaderButtonsProps {
  isOpenForm: boolean;
  setIsOpenForm: Dispatch<SetStateAction<boolean>>;
  handleCancel: () => void;
  handleUploadCV: (file: File) => Promise<void> | void;
}

export function ApplicationPreviewHeaderButtons({
  setIsOpenForm,
  handleCancel,
  isOpenForm,
  handleUploadCV,
}: ApplicationPreviewHeaderButtonsProps) {
  return (
    <Flex gap={2} align="center">
      <Button size="sm" onClick={() => setIsOpenForm(true)}>
        Daftar
      </Button>

      {isOpenForm ? (
        <Button size="sm" variantKey="outline" onClick={handleCancel}>
          Batal
        </Button>
      ) : (
        <PdfUploader onSelect={handleUploadCV}>
          <Button size="sm" colorKey="secondary">
            Daftar dengan CV
          </Button>
        </PdfUploader>
      )}
    </Flex>
  );
}
