import { PDFJSViewer } from 'pdfjs-react-viewer';
import { Box, Text } from '@chakra-ui/react';

type PdfViewerProps = {
  fileUrl: string; // Supabase signed URL or Blob URL
  height?: string | number;
  width?: string | number;
};

export function PdfViewer({
  fileUrl,
  height = '100%',
  width = '100%',
}: PdfViewerProps) {
  if (!fileUrl) {
    return (
      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="lg"
        p={4}
        textAlign="center"
        bg="gray.50"
      >
        <Text color="gray.500">No PDF file available</Text>
      </Box>
    );
  }

  return (
    <Box height={height} width={width} overflow="auto">
      <PDFJSViewer pdfUrl={fileUrl} scale={1.0} />
    </Box>
  );
}
