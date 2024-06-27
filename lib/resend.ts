import { Resend } from 'resend';

const resend = new Resend(process.env.KEY_MAIL);

export async function sendEmail(email, code) {
  const envioEmail = await resend.emails.send({
    from: 'onboarding@pedromolina.online',
    to: email,
    subject: "codigo de acceso",
    html: code
  });
  return envioEmail;
}


export async function sendEmailMP(email) {
  const envioEmail = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: "estado de pago",
    html: "tu pago fue aceptado"
  });
  return envioEmail;
}
//qwe