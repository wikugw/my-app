import { kCompanyName, kDepartment } from '@/constants/recruitment-email';
import emailjs from 'emailjs-com';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY!;

export interface InterviewEmailParams {
  name: string;
  email: string;
  position: string;
  date: string;
  time: string;
  meet_url: string;
}

export interface ExtendedInterviewEmailParams extends InterviewEmailParams {
  sender_name: string; // e.g., "Human Resources"
  company_name: string; // e.g., "PT. Green Bay Pluit"
}

export async function sendInterviewEmail(data: ExtendedInterviewEmailParams) {
  try {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      data as unknown as Record<string, unknown>,
      EMAILJS_PUBLIC_KEY
    );

    console.log('✅ Interview email sent:', result.text);
    return true;
  } catch (error) {
    console.error('❌ Failed to send interview email:', error);
    return false;
  }
}

export async function handleSendInvitation(arg: InterviewEmailParams) {
  await sendInterviewEmail({
    ...arg,
    sender_name: kDepartment.humanResources,
    company_name: kCompanyName,
  });
}
