import { Resend } from 'resend';

const resend = new Resend(process.env.KEY_MAIL);

export async function sendEmail(email, code) {
  const envioEmail = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: "codigo de acceso",
    html: code
  });
  return envioEmail;
}
