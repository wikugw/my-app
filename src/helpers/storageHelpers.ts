import { supabase } from '@/lib/supabase';

/**
 * Uploads a file to a (possibly private) Supabase bucket and returns a signed URL.
 */
export const uploadFileToStorage = async (file: File, folder: string) => {
  try {
    const filePath = `${folder}/${Date.now()}_${file.name}`;

    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from('my-app') // your bucket name
      .upload(filePath, file, {
        contentType: file.type || 'application/octet-stream',
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // Generate a signed URL (valid for 1 hour)
    const { data: signedData, error: signedError } = await supabase.storage
      .from('my-app')
      .createSignedUrl(filePath, 60 * 60);

    if (signedError) throw signedError;

    return signedData.signedUrl; // ✅ Use this in your app or Firestore record
  } catch (err) {
    console.error('❌ Upload failed:', err);
    throw err;
  }
};
