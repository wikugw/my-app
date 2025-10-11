import type { MatchedApplication } from '@/hooks/modules/useRecruitmentForm';
import { Box, Flex } from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { ApplicationForm } from '../../application/ApplicationForm';
import { useApplicationPreview } from '@/hooks/modules/useApplicationPreview';
import { useEffect, useState } from 'react';
import { downloadFile } from '@/helpers/storageHelpers';
import { PdfViewer } from '@/components/micro/PdfViewer';
import { Text } from '@/components/micro/Text';
import { ActionButtons } from './ActionButtons';
import { useRecruitmentFlow } from '@/hooks/modules/useRecruitmentFlow';
import {
  kApplicationStatus,
  type ApplicationStatus,
} from '@/constants/application-status';

type ApplicationInfoViewState = MatchedApplication & {
  positionName: string;
};

export function ApplicationInfoView() {
  const location = useLocation();
  const applicationData: ApplicationInfoViewState = location.state;
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  const { methods, updateData, setSelectedFile, selectedFile } =
    useApplicationPreview();

  const {
    setApplication,
    setPositionName,
    declineApplication,
    proceedToInterview,
  } = useRecruitmentFlow();

  useEffect(() => {
    if (applicationData) {
      updateData({
        email: applicationData.email || '',
        name: applicationData.name || '',
        skills: applicationData.skills || [],
      });
      setPositionName(applicationData.positionName || '');
      setApplication(applicationData);

      if (!applicationData.fileUrl) return;
      if (selectedFile || selectedUrl) return; // already have file
      downloadFile(applicationData.fileUrl!)
        .then(file => {
          setSelectedFile(file);
          setSelectedUrl(file ? URL.createObjectURL(file) : null);
        })
        .catch(err => {
          console.error('Error downloading file:', err);
        });
    }
  }, [
    applicationData,
    updateData,
    setSelectedFile,
    selectedFile,
    selectedUrl,
    setApplication,
    setPositionName,
  ]);

  const handleConfirmAction = (status: ApplicationStatus) => {
    if (status === kApplicationStatus.declined) {
      declineApplication();
    } else if (status === kApplicationStatus.approvedForInterview) {
      proceedToInterview();
    }
  };

  return (
    <Box position="relative" minHeight="100vh">
      <Flex w="100%" gap={4}>
        {/* left side application details */}
        <Box flex={1}>
          <FormProvider {...methods}>
            <ApplicationForm readOnly={true} file={null} />
          </FormProvider>
        </Box>

        {/* right side uploaded cv (if any) get from selectedFile */}
        <Box flex={1}>
          <Text variant="paragraphMedium">Uploaded CV</Text>
          {selectedFile ? (
            <PdfViewer fileUrl={selectedUrl!} />
          ) : (
            <Text>No CV uploaded</Text>
          )}
        </Box>
      </Flex>

      {/* Sticky footer with action buttons */}
      <Box
        position="sticky"
        bottom={4}
        width="100%"
        bg="white"
        boxShadow="0 -2px 8px rgba(0,0,0,0.04)"
        zIndex={10}
        py={4}
        px={4}
        mt={8}
      >
        <ActionButtons onConfirm={handleConfirmAction} />
      </Box>
    </Box>
  );
}
