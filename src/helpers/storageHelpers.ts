import { supabase } from '@/lib/supabase';

const bucketName = 'my-app';

/**
 * Uploads a file to a (possibly private) Supabase bucket and returns a signed URL.
 */
export const uploadFileToStorage = async (file: File, folder: string) => {
  try {
    const filePath = `${folder}/${Date.now()}_${file.name}`;

    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        contentType: file.type || 'application/octet-stream',
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // ✅ Return file metadata instead of signed URL
    return filePath;
  } catch (err) {
    console.error('❌ Upload failed:', err);
    throw err;
  }
};

export async function downloadFile(filePath: string): Promise<File> {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .download(filePath);

  if (error) {
    console.error('❌ Failed to download file:', error.message);
    throw error;
  }

  // Convert Blob to File for compatibility with file inputs or uploads
  const fileName = filePath.split('/').pop() || 'downloaded-file';
  const file = new File([data], fileName, { type: data.type });

  return file;
}
