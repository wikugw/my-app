import { Button } from '@/components/micro/button/Button';
import { Input } from '@/components/micro/input/Input';
import { Box, Stack, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Text } from '@/components/micro/Text';
import type { ApplicationFormInputs } from '@/validations/modules/application-form';
import { PdfUploader } from '@/components/micro/PdfUploader';

type ApplicationFormBaseProps = {
  file?: File | null;
};

type ApplicationFormEditProps = ApplicationFormBaseProps & {
  readOnly?: false;
  onSubmit: (data: ApplicationFormInputs) => void;
  handleUploadCV: (file: File) => void;
};

type ApplicationFormViewProps = ApplicationFormBaseProps & {
  readOnly: true;
  onSubmit?: never;
  handleUploadCV?: never;
};

export type ApplicationFormProps =
  | ApplicationFormEditProps
  | ApplicationFormViewProps;

export function ApplicationForm({
  onSubmit,
  handleUploadCV,
  readOnly = false,
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
    <form onSubmit={handleSubmit(onSubmit ? onSubmit : () => {})}>
      <VStack gap={4} align="stretch" mt={2}>
        {/* email */}
        <Input name="email" type="email" label="email" disabled={readOnly} />
        {/* nama lengkap */}
        <Input name="name" label="nama" disabled={readOnly} />
        {/* keahlian */}
        <Text variant="paragraphSmall" fontWeight="medium" display="block">
          Keahlian
        </Text>
        <Stack gap={2}>
          {getValues('skills').map((_, index: number) => (
            <Box key={index} display="flex" gap={2}>
              <Input name={`skills.${index}`} disabled={readOnly} />
              {!readOnly && (
                <Button
                  colorKey="danger"
                  size="sm"
                  onClick={() => removeSkill(index)}
                >
                  Remove
                </Button>
              )}
            </Box>
          ))}
        </Stack>

        {!readOnly && (
          <>
            <Button mt={2} size="sm" variantKey={'outline'} onClick={addSkill}>
              Add Keahlian
            </Button>

            <PdfUploader onSelect={handleUploadCV}>
              <Button size={'sm'} colorKey="secondary">
                {file ? 'Ganti CV' : 'Daftar dengan CV'}
              </Button>
            </PdfUploader>

            <Text>{file?.name}</Text>
            <Button type="submit" size={'sm'}>
              {formState.isSubmitting ? 'Sending...' : 'Daftar'}
            </Button>
          </>
        )}
      </VStack>
    </form>
  );
}
