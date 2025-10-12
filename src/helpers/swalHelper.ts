// src/utils/swalHelpers.ts
import Swal, { type SweetAlertResult } from 'sweetalert2';

/**
 * Show a confirmation alert with Yes/Cancel buttons.
 * Returns true if user confirmed.
 */
export async function showConfirm(
  title: string,
  text?: string
): Promise<boolean> {
  const result: SweetAlertResult = await Swal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#2563eb', // blue
    cancelButtonColor: '#d1d5db', // gray
  });

  return result.isConfirmed;
}

/**
 * Show a success message.
 */
export async function showSuccess(title: string, text?: string): Promise<void> {
  await Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonColor: '#16a34a', // green
  });
}

/**
 * Show an error message.
 */
export async function showError(title: string, text?: string): Promise<void> {
  await Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonColor: '#dc2626', // red
  });
}
