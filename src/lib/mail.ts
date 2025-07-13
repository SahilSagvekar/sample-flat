import nodemailer from "nodemailer";

type MailOptions = {
  to: string;
  subject: string;
  text: string;
};

export async function sendMail({ to, subject, text }: MailOptions) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can change this to your preferred SMTP provider
    auth: {
      user: process.env.SMTP_EMAIL!,
      pass: process.env.SMTP_PASSWORD!,
    },
  });

  const mailOptions = {
    from: `"SampleFlat" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    return false;
  }
}
