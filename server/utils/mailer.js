import nodemailer from "nodemailer";

export const sendMail = async (
  to,
  subject,
  text,
  { html, attachments } = {}
) => {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure =
    typeof process.env.SMTP_SECURE !== "undefined"
      ? String(process.env.SMTP_SECURE).toLowerCase() === "true"
      : port === 465;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS; // For Gmail, use an App Password (2FA required)

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  // Optionally verify connection on startup of each send (useful during dev)
  try {
    await transporter.verify();
  } catch (e) {
    console.error("Email transport verify failed:", e?.message || e);
  }

  await transporter.sendMail({
    from: `"Notes Manager" <${user}>`,
    to,
    subject,
    text,
    html,
    attachments,
  });
};
