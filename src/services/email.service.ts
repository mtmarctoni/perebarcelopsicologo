import { Resend } from 'resend';

import { envConfig } from '@/config/env.config';
import { emailConfig } from '@/config/email.config';

const resend = new Resend(envConfig.email.resendApiKey);
//const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  html: string;
}

export interface ResendErrorResponse {
  message: string;
  name: string;
  statusCode?: number;
}

export const sendEmail = async ({ html }: SendEmailParams) => {
  return await resend.emails.send({
    from: emailConfig.fromEmail,
    to: emailConfig.adminEmail,
    subject: emailConfig.subjects.contactForm,
    html,
  });
};