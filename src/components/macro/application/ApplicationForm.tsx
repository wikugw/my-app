import { Button } from '@/components/micro/button/Button';
import { Input } from '@/components/micro/input/Input';
import { Box, Stack, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Text } from '@/components/micro/Text';
import type { ApplicationFormInputs } from '@/validations/modules/application-form';
import { PdfUploader } from '@/components/micro/PdfUploader';

type ApplicationFormProps = {
  onSubmit: (data: ApplicationFormInputs) => void;
  handleUploadCV: (file: File) => void;
  file: File | null;
};

export function ApplicationForm({
  onSubmit,
  handleUploadCV,
  file,
}: ApplicationFormProps) {
  const { handleSubmit, getValues, setValue, formState } =
    useFormContext<ApplicationFormInputs>();

  const addSkill = () => {
    const current = getValues('skills');
    setValue('skills', [...current, ''], { shouldValidate: true });
  };

  const removeSkill = (index: number) => {
    const current = getValues('skills') || [];
    setValue(
      'skills',
      current.filter((_, i: number) => i !== index),
      {
        shouldValidate: true,
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4} align="stretch" mt={2}>
        {/* email */}
        <Input name="email" type="email" label="email" />
        {/* nama lengkap */}
        <Input name="name" label="nama" />
        {/* keahlian */}
        <Text variant="paragraphSmall" fontWeight="medium" display="block">
          Keahlian
        </Text>
        <Stack gap={2}>
          {getValues('skills').map((_, index: number) => (
            <Box key={index} display="flex" gap={2}>
              <Input name={`skills.${index}`} />
              <Button
                colorKey="danger"
                size="sm"
                onClick={() => removeSkill(index)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Stack>

        <Button mt={2} size="sm" variantKey={'outline'} onClick={addSkill}>
          Add Keahlian
        </Button>
        {/* upload cv */}
        <PdfUploader onSelect={handleUploadCV}>
          <Button size={'sm'} colorKey="secondary">
            {file ? 'Ganti CV' : 'Daftar dengan CV'}
          </Button>
        </PdfUploader>
        <Text>{file?.name}</Text>
        <Button type="submit" size={'sm'}>
          {formState.isSubmitting ? 'Sending...' : 'Daftar'}
        </Button>
      </VStack>
    </form>
  );
}
