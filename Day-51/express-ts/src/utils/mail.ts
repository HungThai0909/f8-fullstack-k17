import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
let mailTransporter = null;
if (!mailTransporter) {
  mailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT!,
    secure: +process.env.SMTP_PORT! === 465,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}
export const sendMail = async (
  to: string,
  subject: string,
  message: string,
) => {
  try {
    const info = await mailTransporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      html: message,
    });
    return info;
  } catch {
    return false;
  }
};

export const sendMailTemplate = async (
  to: string,
  subject: string,
  template: string,
  context = {},
) => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "mail",
    `${template}.ejs`,
  );
  const html = await ejs.renderFile(templatePath, context);
  return sendMail(to, subject, html);
};