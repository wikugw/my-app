import { Box, Text, Spinner } from '@chakra-ui/react';
import { Suspense, lazy } from 'react';

type PdfViewerProps = {
  fileUrl: string; // Supabase signed URL or Blob URL
  height?: string | number;
  width?: string | number;
};

// Lazy load PDFJSViewer
const PDFJSViewer = lazy(() =>
  import('pdfjs-react-viewer').then(module => ({ default: module.PDFJSViewer }))
);

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
      <Suspense
        fallback={
          <Box textAlign="center" py={10}>
            <Spinner size="xl" />
            <Text mt={2}>Loading PDF...</Text>
          </Box>
        }
      >
        <PDFJSViewer pdfUrl={fileUrl} scale={1.0} />
      </Suspense>
    </Box>
  );
}
