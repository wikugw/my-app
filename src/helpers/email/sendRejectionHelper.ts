import { kCompanyName, kDepartment } from '@/constants/recruitment-email';
import emailjs from 'emailjs-com';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID!;
const EMAILJS_REJECTION_TEMPLATE_ID = import.meta.env
  .VITE_EMAILJS_REJECTION_TEMPLATE_ID!; // ⚠️ Make sure you add this to your .env
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY!;

export interface RejectionEmailParams {
  name: string;
  email: string;
  position: string;
}

export interface ExtendedRejectionEmailParams extends RejectionEmailParams {
  sender_name: string; // e.g., "Human Resources"
  company_name: string; // e.g., "PT. Green Bay Pluit"
}

export async function sendRejectionEmail(data: ExtendedRejectionEmailParams) {
  try {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_REJECTION_TEMPLATE_ID,
      data as unknown as Record<string, unknown>,
      EMAILJS_PUBLIC_KEY
    );

    console.log('✅ Rejection email sent:', result.text);
    return true;
  } catch (error) {
    console.error('❌ Failed to send rejection email:', error);
    return false;
  }
}

export async function handleSendRejection(arg: RejectionEmailParams) {
  await sendRejectionEmail({
    ...arg,
    sender_name: kDepartment.humanResources,
    company_name: kCompanyName,
  });
}
