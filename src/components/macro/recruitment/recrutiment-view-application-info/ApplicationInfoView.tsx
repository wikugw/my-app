import type { MatchedApplication } from '@/hooks/modules/useRecruitmentForm';
import { Box, Flex } from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { ApplicationForm } from '../../application/ApplicationForm';
import { useApplicationPreview } from '@/hooks/modules/useApplicationPreview';
import { useEffect } from 'react';
import { downloadFile } from '@/helpers/storageHelpers';

export function ApplicationInfoView() {
  const location = useLocation();
  const applicationData: MatchedApplication = location.state;

  const { methods, updateData, setSelectedFile, selectedFile } =
    useApplicationPreview();

  useEffect(() => {
    if (applicationData) {
      updateData({
        email: applicationData.email || '',
        name: applicationData.name || '',
        skills: applicationData.skills || [],
      });

      if (!applicationData.fileUrl) return;
      if (selectedFile) return; // already have file
      downloadFile(applicationData.fileUrl!)
        .then(file => {
          setSelectedFile(file);
        })
        .catch(err => {
          console.error('Error downloading file:', err);
        });
    }
  }, [applicationData, updateData, setSelectedFile, selectedFile]);

  return (
    <Flex w="100%" gap={4}>
      {/* left side application details */}
      <Box flex={1}>
        <FormProvider {...methods}>
          <ApplicationForm readOnly={true} file={null} />
        </FormProvider>
      </Box>

      {/* right side uploaded cv (if any) get from selectedFile */}
      <Box flex={1}>
        <h2>Uploaded CV</h2>
        {selectedFile ? (
          <a
            href={URL.createObjectURL(selectedFile)}
            target="_blank"
            rel="noopener noreferrer"
          >
            View CV
          </a>
        ) : (
          <p>No CV uploaded</p>
        )}
      </Box>
    </Flex>
  );
}
